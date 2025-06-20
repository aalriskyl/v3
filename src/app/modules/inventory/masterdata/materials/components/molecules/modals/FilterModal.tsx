import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputField from "../field/InputField";
import DropdownField from "../field/DropdownField";
import { useMaterials } from "../../template/ParentMaterialsTableLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";

interface FilterModalProps {
    closeModal: () => void;
}

interface FormValues {
    search: string;
    category: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
    const { setCategory, category } = useMaterials();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            search: "",
            category: category || "",
        },
    });

    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get("/inventory/master-data/category/select?product_type_id=1&purchasable=&status=true&sellable=true");
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
        });
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setCategory(data.category);
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