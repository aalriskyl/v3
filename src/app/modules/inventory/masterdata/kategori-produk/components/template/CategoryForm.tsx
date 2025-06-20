import { FC, useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { getProductType, createCategoryProduct, getCategoryById, updateCategory } from '../core/_request';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { getErrorMessage } from '../../../../../../helper/getErrorMessage';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';

interface FormData {
    id?: string;
    name: string;
    product_type_id: number;
    description?: string;
    purchasable: boolean;
    sellable: boolean;
}

interface FormProps {
    mode: 'create' | 'edit';
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Format nama tidak valid'),
    product_type_id: Yup.number().required('Format tipe produk tidak valid'),
    description: Yup.string().optional(),
    purchasable: Yup.boolean().default(false),
    sellable: Yup.boolean().default(false),
});

const CategoryForm: FC<FormProps> = ({
    mode,
    successMessage,
    headTitle,
    buttonTitle,
    message,
    cancelButtonLabel,
}) => {
    const { id = '' } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const [productTypes, setProductTypes] = useState<{ value: number; label: string }[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            product_type_id: 0,
            description: '',
            purchasable: false,
            sellable: false,
        },
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch product types
                const types = await getProductType();
                const formattedTypes = types.map((type: { id: number; name: string }) => ({
                    value: String(type.id), // Konversi number ke string
                    label: type.name,
                }));
                
                setProductTypes(formattedTypes);

                // Fetch category data if in edit mode
                if (mode === 'edit' && id) {
                    const categoryData = await getCategoryById(id);
                    reset({
                        ...categoryData,
                        product_type_id: categoryData.product_type_id
                    });
                }
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        };
        fetchInitialData();
    }, [mode, id, reset]);

    const onSubmit = (data: FormData) => {
        // console.log('Form data:', data);
        setIsModalVisible(true);
        handleConfirmData.current = data;
    };

    const handleConfirm = async () => {
        if (handleConfirmData.current) {
            setIsSubmitting(true);
            try {
                const { name, product_type_id, description, purchasable, sellable } = handleConfirmData.current;
                const payload = {
                    name,
                    description,
                    product_type_id,
                    purchasable,
                    sellable,
                };

                if (mode === 'create') {
                    await createCategoryProduct(payload);
                } else if (mode === 'edit' && id) {
                    await updateCategory(id, payload);
                }

                setIsModalVisible(false);
                setIsSuccessModalVisible(true);
            } catch (error: any) {
                setErrorMessage(getErrorMessage(error));
                setIsModalVisible(false);
            } finally {
                setIsSubmitting(false);
                setIsModalVisible(false);
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-4">
                    <div className="row g-6">
                        <div className="col-md-6">
                            <InputField
                                name="name"
                                label="Nama"
                                control={control}
                                placeholder="Masukkan nama"
                                errors={errors}
                                type="text"
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                placeholder="Pilih Tipe Produk"
                                name="product_type_id"
                                label="Tipe Produk"
                                control={control}
                                options={productTypes}
                                errors={errors}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex">
                        <div className="flex-grow-1">
                            <TextareaField
                                name="description"
                                label="Deskripsi"
                                control={control}
                                required={false}
                                placeholder="Masukkan deskripsi"
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column ms-3">
                            <div>
                                <label className="form-label fw-normal ms-4">Akses</label>
                            </div>
                            <div className="d-flex ms-4">
                                <label className="d-flex align-items-center me-4">
                                    <Controller
                                        name="purchasable"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="form-check-input"
                                            />
                                        )}
                                    />
                                    <span className="ms-2">Bisa Dibeli</span>
                                </label>
                                <label className="d-flex align-items-center">
                                    <Controller
                                        name="sellable"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="form-check-input"
                                            />
                                        )}
                                    />
                                    <span className="ms-2">Bisa Dijual</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary px-12 py-3 border border-primary"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Menyimpan...' : buttonTitle}
                    </button>
                </div>

                {isModalVisible && (
                    <ConfirmModal
                        buttonTitle={buttonTitle}
                        handleSubmit={handleConfirm}
                        closeModal={() => setIsModalVisible(false)}
                        headTitle={headTitle}
                        confirmButtonLabel={buttonTitle}
                        cancelButtonLabel='Kembali'
                        message={message}
                    />
                )}

                {isSuccessModalVisible && (
                    <SuccessModal
                        successMessage={successMessage}
                        closeModal={() => {
                            setIsSuccessModalVisible(false);
                            navigate(-1);
                        }}
                    />
                )}

                {errorMessage && (
                    <FailedModal
                        closeModal={() => setErrorMessage(null)}
                        message={errorMessage}
                    />
                )}
            </form>
        </div>
    );
};

export default CategoryForm;