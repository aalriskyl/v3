import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { createUom, updateUom, getUomById } from '../core/_request'; // Assuming you have these functions
import { getErrorMessage } from '../../../../../../helper/getErrorMessage';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

interface FormData {
    id?: string; // Ensure id is included for edit mode
    name: string;
}

interface FormProps {
    mode: 'create' | 'edit'
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    cancelButtonLabel?: string;
}

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Nama uom wajib diisi')
        .max(50, 'Nama uom maksimal 50 karakter')
        .matches(/^[A-Za-z0-9\s]+$/, 'Nama uom hanya boleh mengandung huruf, angka dan spasi'),
});

const UomForm: FC<FormProps> = ({
    mode,
    successMessage,
    headTitle,
    buttonTitle,
    message,
    cancelButtonLabel,
}) => {
    const { id: id } = useParams<{ id: string }>(); // Retrieve uomId from URL for edit mode
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema as any),
        mode: 'onTouched',
        defaultValues: {
            name: '',
        },
    });

    useEffect(() => {
        if (id) {
            const fetchUomData = async () => {
                try {
                    const uomData = await getUomById(id);
                    reset(uomData); // Reset form with fetched data
                } catch (error) {
                    console.error('Failed to fetch UOM data:', error);
                }
            };

            fetchUomData();
        }
    }, [id, reset]);

    const onSubmit = (data: FormData) => {
        setFormData(data);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (formData) {
            setIsSubmitting(true);
            try {
                if (id) {
                    // Edit mode: Update existing UOM
                    await updateUom(id, formData);
                } else {
                    // Create mode: Create new UOM
                    await createUom(formData);
                }
                setIsSuccessModalVisible(true);
                setIsModalVisible(false);
                setFormData(null);
            }  catch (error: any) {
                setErrorMessage(getErrorMessage(error));
                setIsModalVisible(false);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-4">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="row g-6">
                        <div className="col-md-12">
                            <InputField
                                name="name"
                                label="Nama Satuan/UOM"
                                control={control}
                                placeholder="Masukkan nama satuan/uom"
                                errors={errors}
                                type="text"
                            />
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
                        {isSubmitting ? 'Mengirim...' : buttonTitle}
                    </button>
                </div>
            </form>

            {errorMessage && (
                <FailedModal
                    closeModal={() => setErrorMessage(null)}
                    message={errorMessage}
                />
            )}

            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle={headTitle}
                    confirmButtonLabel={buttonTitle}
                    cancelButtonLabel='Kembali'
                    buttonTitle={buttonTitle}
                    message={message}
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={() => {
                        navigate('../');
                        setIsSuccessModalVisible(false);
                    }}
                    successMessage={successMessage}
                />

            )}
        </div>
    );
};

export default UomForm;