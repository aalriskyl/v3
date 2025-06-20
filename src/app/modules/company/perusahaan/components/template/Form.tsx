import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { createCompany, getCompanyById, updateCompany } from '../core/_request';
import { getErrorMessage } from '../../../../../helper/getErrorMessage';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

interface FormData {
    id?: string;
    name: string;
    // owner: string;
    type: string;
    address: string;
    created_at?: string;
    updated_at?: string;
}

interface FormProps {
    mode: 'create' | 'edit';
    headTitle: string;
    submitButtonLabel: string;
    cancelButtonLabel: string;
    successMessage: string;
    buttonTitle: string;
    message: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nama perusahaan wajib diisi')
        .max(255, 'Nama perusahaan maksimal 255 karakter')
        .matches(/^[A-Za-z\s]+$/, 'Nama perusahaan hanya boleh mengandung huruf dan spasi'),
    // owner: Yup.string().required('Pemilik wajib diisi'),
    type: Yup.string().required('Tipe wajib dipilih'),
    address: Yup.string()
    .max(500, 'Alamat Perusahaan maksimal 500 karakter')
    .required('Alamat wajib diisi'),
});

const typeOptions = [
    { value: 'Office', label: 'Office' },
    { value: 'Warehouse', label: 'Warehouse' },
    { value: 'Outlet', label: 'Outlet' },
];

const Form: FC<FormProps> = ({ mode, headTitle, buttonTitle, message, submitButtonLabel, cancelButtonLabel, successMessage }) => {
    const { id } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmData, setConfirmData] = useState<FormData | null>(null);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            // owner: '',
            type: '',
            address: '',
        },
    });

    // Fetch data when in edit mode
    useEffect(() => {
        if (mode === 'edit' && id) {
            getCompanyById(id).then((companyData) => {
                if (companyData) {
                    reset(companyData);
                }
            });
        }
    }, [id, mode, reset]);

    const onSubmit = (data: FormData) => {
        setConfirmData(data);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (!confirmData) return;

        setIsSubmitting(true);
        try {
            if (mode === 'create') {
                await createCompany(confirmData);
            } else if (mode === 'edit' && id) {
                await updateCompany(id, confirmData);
            }
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            setFailedMessage(getErrorMessage(error))
        } finally {
            setIsSubmitting(false);
            setIsModalVisible(false);
        }
    };



    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <InputField name="name" label="Nama" control={control} placeholder="Masukkan nama" errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <SelectField name="type" 
                            label="Tipe" 
                            control={control} 
                            options={typeOptions} 
                            placeholder="Pilih tipe" 
                            errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <TextareaField 
                            name="address" 
                            label="Alamat Perusahaan" 
                            control={control} 
                            placeholder="Masukkan alamat lengkap" 
                            errors={errors} />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end row">
                    <div className="col-12 text-end my-4">
                        <button type="button" onClick={() => navigate(-1)} className="btn px-12 py-3 border border-gray-500 me-2">Batal</button>
                        <button type="submit" className="btn btn-primary px-12 py-3 border border-primary" disabled={!isValid || isSubmitting}>
                            {isSubmitting ? 'Mengirim...' : buttonTitle}
                        </button>
                    </div>
                </div>
                {failedMessage && (
                    <FailedModal
                    closeModal={() => setFailedMessage(null)}
                    message={failedMessage}
                    confirmLabel={"Tutup"}
                    />
                )}
                {isModalVisible && <ConfirmModal handleSubmit={handleConfirm} closeModal={() => setIsModalVisible(false)} headTitle={headTitle} confirmButtonLabel={buttonTitle} cancelButtonLabel="Kembali" message={message} />}
                {isSuccessModalVisible && <SuccessModal closeModal={() => { setIsSuccessModalVisible(false); navigate(-1); }} successMessage={successMessage} />}
            </form>
        </div>
    );
};

export default Form;
