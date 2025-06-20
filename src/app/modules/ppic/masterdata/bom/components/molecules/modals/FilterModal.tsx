import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputField from "../field/InputField";
import DropdownField from "../field/DropdownField";

interface FilterModalProps {
    closeModal: () => void;
    name?: string;
    category?: string;
}

interface FormValues {
    search: string;
    category: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            search: '',
            category: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        closeModal();
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '360px' }}>
                <div className="modal-content px-6 py-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="ms-7">
                            <h1 className="modal-title fw-bold font-secondary">Filter</h1>
                        </div>
                        <div className="modal-body">
                            <InputField
                                name="search"
                                label="Nama Barang"
                                control={control}
                                placeholder="Masukkan nama barang"
                                errors={errors}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <DropdownField
                                        label="Kategori"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            { value: "option1", label: "Option 1" },
                                            { value: "option2", label: "Option 2" },
                                            { value: "option3", label: "Option 3" },
                                        ]}
                                    />
                                )}
                            />
                            {errors.category && (
                                <div className="text-danger d-flex align-items-center">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {errors.category.message}
                                </div>
                            )}
                        </div>
                        <div className="text-center">

                            <button
                                type="button"
                                className="btn btn-secondary border border-gray-400 px-12"
                                onClick={closeModal}
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-12  ms-3"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
