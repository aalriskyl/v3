import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import MaterialSectionLayout from './MaterialSectionLayout';

interface FormData {
    plan_production: string;
    supplier: string;
}
interface FormProps {
    mode: 'create' | 'edit';
    defaultValues?: FormData;
    successMessage?: string;
    formTitle?: string;
    headTitle: string;
    buttonTitle: string;
    submitButtonLabel?: string;
    message: string;
}

const validationSchema = Yup.object().shape({
    plan_production: Yup.string().required('Plan production wajib dipilih'),
    supplier: Yup.string().required('Supplier wajib dipilih'),
});

const Form: FC<FormProps> = ({
    mode,
    defaultValues,
    successMessage,
    formTitle,
    headTitle,
    submitButtonLabel,
    buttonTitle,
    message,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues || {
            plan_production: '',
            supplier: '',
        },
    });

    const onSubmit = (data: FormData) => {
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            console.log('Form data submitted:', defaultValues);
            setIsModalVisible(false); // Tutup modal konfirmasi
    
            setIsSuccessModalVisible(true); // Tampilkan modal sukses
    
            setTimeout(() => {
                setIsSuccessModalVisible(false); // Tutup modal sukses setelah beberapa detik
                navigate('../'); // Navigasi setelah modal sukses ditutup
            }, 2000); // Modal sukses muncul selama 2 detik
        } catch (error) {
            console.error('Failed to submit form:', error);
            alert('Gagal mengirim form. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100">
                    <div className="row g-2">
                        <h3 className="mb-6">Material Request</h3>
                        <div className="col-md-6">
                            <SelectField
                                placeholder="Tipe rencana produksi"
                                name="plan_production"
                                label="Plan Production"
                                control={control}
                                options={[
                                    { value: 'Tidak Ada', label: 'Tidak Ada' },
                                    { value: 'Lorem1', label: 'Lorem1' },
                                    { value: 'Lorem2', label: 'Lorem2' },
                                ]}
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                placeholder="Pilih Supplier"
                                name="supplier"
                                label="Supplier"
                                control={control}
                                options={[
                                    { value: 'Supplier A', label: 'Supplier A' },
                                    { value: 'Supplier B', label: 'Supplier B' },
                                ]}
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>
                <div className="card p-5 w-100 mt-8">
                    <h4 className="mb-8">Material</h4>
                    <MaterialSectionLayout />
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
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn px-12 py-3 border border-gray-500 me-2"
                        >
                            Simpan Draft
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
                        cancelButtonLabel="Kembali"
                        message={message}
                    />
                )}
                {isSuccessModalVisible && (
                    <SuccessModal
                        closeModal={() => setIsSuccessModalVisible(false)}
                        successMessage={successMessage || 'Form submitted successfully!'}
                    />
                )}
            </form>
        </div>
    );
};

export default Form;