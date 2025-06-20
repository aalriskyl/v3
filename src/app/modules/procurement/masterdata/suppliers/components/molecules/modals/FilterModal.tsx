import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { idxIndustries } from '../../../../../../procurement/masterdata/suppliers/components/molecules/field/sectorData';

// Interface untuk kota
interface City {
    id: string;
    name: string;
}

type SelectOption = {
    value: string;
    label: string;
};

interface FilterModalProps {
    onApply: (filters: {
        name?: string;
        city?: string;
        industry?: string;
        status?: boolean;
    }) => void;
    closeModal: () => void;
    initialFilters?: {
        name?: string;
        city?: string;
        industry?: string;
        status?: boolean;
    };
}

const FilterModal: React.FC<FilterModalProps> = ({ onApply, closeModal, initialFilters = {} }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: initialFilters.name || '',
            city: initialFilters.city || '',
            industry: initialFilters.industry || '',
            status: initialFilters.status !== undefined ? initialFilters.status.toString() : '',
        }
    });

    const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(true);

    // Data industri dari file lokal
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axiosInstance.get<{ data: City[] }>('/core/city/select');
                const cities = response.data.data.map(city => ({
                    value: city.name, // Use city.name instead of city.id
                    label: city.name
                }));
                setCityOptions(cities);
            } catch (error) {
                console.error('Gagal memuat daftar kota:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    // Update industryOptions to use industry.name as value
    const industryOptions: SelectOption[] = idxIndustries.map(industry => ({
        value: industry.name, // Use industry.name instead of industry.id
        label: industry.name
    }));

    const statusOptions: SelectOption[] = [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' },
    ];

    const handleReset = () => {
        reset({
            name: '',
            city: '',
            industry: '',
            status: '',
        });
    };
    const onSubmit = (data: any) => {
        onApply({
            ...data,
            status: data.status === 'true' ? true :
                data.status === 'false' ? false : undefined,
        });
        closeModal();
        reset();
    };

    return (
        <div className="bg-white rounded shadow-lg p-6" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            width: '360px',
            marginTop: '8px',
        }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold fs-4">Filter Supplier</h2>
                <button className="btn btn-sm btn-icon" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <InputField
                    errors={errors}
                    name="name"
                    label="Cari Supplier"
                    control={control}
                    placeholder="Masukkan nama supplier"
                /> */}

                <SelectField
                    name="city"
                    label="Kota"
                    control={control}
                    placeholder={loading ? 'Memuat...' : 'Pilih Kota'}
                    options={cityOptions}
                    disabled={loading}
                />

                <SelectField
                    name="industry"
                    label="Industri"
                    control={control}
                    placeholder="Pilih Industri"
                    options={industryOptions}
                />
                <div className="d-flex gap-2 mt-8">
                    <button
                        type="button"
                        className="btn border border-primary text-primary btn-light w-50"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary border border-primary w-50"
                        disabled={loading}
                    >
                        {loading ? 'Memuat...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;