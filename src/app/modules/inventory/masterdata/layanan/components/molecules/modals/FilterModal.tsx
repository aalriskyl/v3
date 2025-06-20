import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DropdownField from "../../../../materials/components/molecules/field/DropdownField";
import { useService } from "../../template/ServiceTableLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";

interface FilterModalProps {
    closeModal: () => void;
}

interface FormValues {
    search: string;
    category: string;
    dateCreated: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
    const { setCategory, setDate, category, dateCreated } = useService();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            search: "",
            category: category || "",
            dateCreated: dateCreated || "",
        },
    });

    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get("/inventory/master-data/category/select?product_type_id=2&purchasable=&status=true&sellable=true");
                const formattedCategories = response.data.data.categories.map((cat: any) => ({
                    value: cat.id,
                    label: cat.name,
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleReset = () => {
        reset({
            search: "",
            category: "",
            dateCreated: "",
        });
    };

    const formatDateForPayload = (dateString: string) => {
        const date = new Date(dateString); // Parse the ISO string
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate() + 1).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format to 'yyyy-MM-dd'
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formattedDate = formatDateForPayload(data.dateCreated); // Format the date
        setCategory(data.category);
        // setDate(formattedDate); // Pass the formatted date to the context
        closeModal();
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
                <h2 className="fw-bold fs-4">Filter</h2>
                <button className="btn btn-sm btn-icon" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <DropdownField
                            label="Kategori"
                            value={field.value}
                            onChange={field.onChange}
                            options={categories}
                        />
                    )}
                />
                {/* <Controller
                    name="dateCreated"
                    control={control}
                    render={({ field }) => (
                        <DateInputField
                            label="Tanggal Pembuatan"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                /> */}
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