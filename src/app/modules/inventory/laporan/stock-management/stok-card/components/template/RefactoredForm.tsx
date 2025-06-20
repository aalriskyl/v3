import { FC, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { createEntryStock } from '../../core/_request'; // Import the createEntryStock function
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

interface FormData {
    doc_type: string;
    remarks?: string;
}

interface FormProps {
    mode: 'create' | 'edit';
    defaultValues?: FormData;
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    submitButtonLabel?: string;
    failedMessage?: string;
}

const validationSchema = Yup.object().shape({
    doc_type: Yup.string().required('Tipe entri stok wajib diisi'),
    remarks: Yup.string().optional(),
});

const Form: FC<FormProps> = ({
    mode,
    defaultValues,
    successMessage,
    headTitle,
    buttonTitle,
    message,
    submitButtonLabel,
    failedMessage,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [confirmData, setConfirmData] = useState<FormData | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues || {
            doc_type: '',
            remarks: '',
        },
    });

    useEffect(() => {
        // Reset form with defaultValues if provided
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const onSubmit = (data: FormData) => {
        setConfirmData(data);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (confirmData) {
            setIsSubmitting(true);
            try {
                if (mode === 'create') {
                    const entryStockId = await createEntryStock(confirmData); // Pass form data
                    console.log('Entry stock created successfully with ID:', entryStockId);

                    navigate(`../detail/${entryStockId}`);
                } else if (mode === 'edit') {
                    console.error('Edit mode is not supported for entry stock.');
                }
                setIsSuccessModalVisible(true);
                reset();
                setConfirmData(null);
            } catch (error) {
                setIsModalVisible(false);
                console.error('Failed to perform entry stock action:', error);
                setIsFailed(true); // Show failed modal
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100">
                    <div className="row g-2">
                        <h3 className="mb-6">Entry Stock</h3>
                        <div className="col-md-6">
                            <SelectField
                                placeholder="Pilih Tipe Entry Stock"
                                name="doc_type"
                                label="Tipe Entry Stock"
                                control={control}
                                options={[
                                    { value: 'Debit', label: 'Debit' },
                                    { value: 'Kredit', label: 'Kredit' },
                                ]}
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6">
                            <TextareaField
                                name="remarks"
                                label="Catatan"
                                control={control}
                                placeholder="Masukkan catatan"
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end row">
                    <div className="col-12 text-end my-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn px-12 py-3 border border-gray-500 me-2"
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
                        closeModal={() => setIsSuccessModalVisible(false)}
                        message={successMessage}
                    />
                )}
                {isFailed && (
                    <FailedModal
                        closeModal={() => setIsFailed(false)}
                        message={failedMessage}
                    />
                )}
            </form>
        </div>
    );
};

export default Form;