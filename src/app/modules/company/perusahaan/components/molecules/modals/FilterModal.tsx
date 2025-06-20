import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SelectCityField from "@metronic/layout/components/form/molecules/SelectCityField";
import axiosInstance from "../../../../../../../service/axiosInstance";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import { useNavigate, useLocation } from "react-router-dom";

interface Customer {
    city: string;
    industry: string;
    status: string;
    name: string;
}

interface SelectOption {
    value: string;
    label: string;
}

interface FilterValues {
    search: string;
    city: string;
    industry: string;
    status: string;
    category: string;
}

interface FilterModalProps {
    closeModal: () => void;
    onFilter: (filter: Partial<FilterValues>) => void;
    currentFilters: FilterValues;
}

const FilterModal: React.FC<FilterModalProps> = ({ closeModal, onFilter, currentFilters }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const emptyFilters: FilterValues = {
        search: '',
        city: '',
        industry: '',
        status: '',
        category: ''
    };

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<FilterValues>({
        defaultValues: currentFilters,
    });

    const formValues = watch();
    const navigate = useNavigate();
    const location = useLocation();

    // Track form changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            const hasChanges = Object.entries(value).some(
                ([key, val]) => val !== currentFilters[key as keyof FilterValues]
            );
            setIsDirty(hasChanges);
        });
        return () => subscription.unsubscribe();
    }, [watch, currentFilters]);

    // Generate options for select fields
    const { cities, industries, statuses } = useMemo(() => {
        const getUniqueOptions = (key: keyof Customer): SelectOption[] => {
            return Array.from(new Set(customers.map(customer => customer[key] || '')))
                .sort()
                .map(value => ({
                    value: value,
                    label: value,
                }));
        };

        return {
            cities: getUniqueOptions('city'),
            industries: getUniqueOptions('industry'),
            statuses: getUniqueOptions('status'),
        };
    }, [customers]);

    // Fetch customer data
    const fetchCustomers = useCallback(async (filters: Partial<FilterValues>) => {
        setIsLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value.trim() !== '') {
                    queryParams.set(key, value);
                }
            });

            const response = await axiosInstance.get(`/sales/master-data/customer?${queryParams.toString()}`);
            setCustomers(response.data.data.customers);
        } catch (error) {
            setError('Failed to fetch customer data');
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     fetchCustomers();
    // }, [fetchCustomers]);

    // Sync form with URL parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterData: FilterValues = {
            search: params.get('search') || '',
            city: params.get('city') || '',
            industry: params.get('industry') || '',
            status: params.get('status') || '',
            category: params.get('category') || ''
        };
        reset(filterData);
    }, [location.search, reset]);

    // Handle browser navigation
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const filterData: FilterValues = {
                search: params.get('search') || '',
                city: params.get('city') || '',
                industry: params.get('industry') || '',
                status: params.get('status') || '',
                category: params.get('category') || ''
            };
            reset(filterData);
            onFilter(filterData);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [reset, onFilter]);

    const onSubmit: SubmitHandler<FilterValues> = async (data) => {
        const queryParams = new URLSearchParams();

        // Only add non-empty values to query params
        Object.entries(data).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                queryParams.set(key, value);
            }
        });

        // Update URL
        const newUrl = queryParams.toString()
            ? `?${queryParams.toString()}`
            : '';

        navigate(newUrl);

        onFilter(data);

        await fetchCustomers(data);

        closeModal();
    };

    const clearAllFilters = () => {
        reset(emptyFilters);
        navigate('');
        onFilter(emptyFilters);
        fetchCustomers(emptyFilters); // Fetch data with no filters
        setIsDirty(false);
    };

    const clearFilter = (filterName: keyof FilterValues) => {
        const newValues = { ...formValues, [filterName]: '' };
        reset(newValues);

        const queryParams = new URLSearchParams();
        Object.entries(newValues).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                queryParams.set(key, value);
            }
        });

        const newUrl = queryParams.toString()
            ? `?${queryParams.toString()}`
            : '';

        navigate(newUrl);
        onFilter(newValues);
        fetchCustomers(newValues); // Fetch data with updated filters
    };

    const handleClose = () => {
        if (isDirty) {
            if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                closeModal();
            }
        } else {
            closeModal();
        }
    };

    const renderSelectField = useCallback((
        name: keyof FilterValues,
        label: string,
        options: SelectOption[],
        placeholder: string
    ) => (
        <div className="position-relative mb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <SelectCityField
                        {...field}
                        name={name}
                        label={label}
                        control={control}
                        errors={errors}
                        placeholder={placeholder}
                        options={options}
                        value={field.value}
                    />
                )}
            />
            {formValues[name] && (
                <button
                    type="button"
                    className="btn btn-sm btn-light position-absolute"
                    style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => clearFilter(name)}
                >
                    ×
                </button>
            )}
        </div>
    ), [control, errors, formValues, clearFilter]);

    if (error) {
        return (
            <div className="modal fade show d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-6">
                        <div className="text-center">
                            <p className="text-danger">{error}</p>
                            <button
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex={9}
            role="dialog"
            aria-hidden="true"
            style={{ position: 'absolute', zIndex: '9999' }}
        >
            <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ maxWidth: '360px' }}
            >
                <div className="modal-content px-6 py-6">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="modal-title fw-bold font-secondary">Filter</h1>
                        <div>
                            {isDirty && (
                                <button
                                    type="button"
                                    className="btn btn-light btn-sm me-2"
                                    onClick={clearAllFilters}
                                >
                                    Clear All
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                            <div className="position-relative mb-4">
                                <Controller
                                    name="search"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            name="search"
                                            control={control}
                                            label="Nama Organisasi"
                                            placeholder="Masukkan nama organisasi"
                                            errors={errors}
                                        />
                                    )}
                                />
                                {formValues.search && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light position-absolute"
                                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                        onClick={() => clearFilter('search')}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {renderSelectField('city', 'Kota', cities, 'Pilih kota')}
                            {renderSelectField('industry', 'Industri', industries, 'Pilih industri')}
                            {renderSelectField('status', 'Status', statuses, 'Pilih status')}
                        </div>

                        <div className="text-center row mx-4">
                            <div className="d-flex justify-content-between">
                                <button
                                    type="button"
                                    className="btn px-12 text-primary py-3 border w-100 border-primary me-2"
                                    onClick={handleClose}
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-12 py-3 fw-bold px-6 w-100 border border-primary"
                                    disabled={isLoading || !isDirty}
                                >
                                    {isLoading ? 'Loading...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;