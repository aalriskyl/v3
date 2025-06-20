import { FC, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ServiceSectionEdit } from './section/ServiceSectionEdit';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

// Dummy schema (replace with actual Yup schema)
const schema = Yup.object().shape({
    name: Yup.string().required('Format nama tidak valid'),
    category_id: Yup.string().required('Field ini wajib diisi'),
    brand_id: Yup.string().required('Brand wajib dipilih'),
});

type FormData = {
    name: string;
    category_id: string;
    brand_id: string;
};

const ServiceFormEdit: FC<{ 
    successMessage?: string; 
    headTitle: string; 
    buttonTitle: string; 
    message: string; 
    confirmButtonLabel: string; 
    cancelButtonLabel: string 
}> = ({
    successMessage,
    headTitle,
    buttonTitle,
    message,
    confirmButtonLabel,
    cancelButtonLabel
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            category_id: '',
            brand_id: '',
        },
    });

    const handleCloseFailedModal = () => {
        setIsFailedModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        try {
            // Jika sukses
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            setIsModalVisible(false);
            setIsFailedModalVisible(true);
        }
    };

    const handleCloseSuccessModal = () => {
        navigate('../');
        setIsSuccessModalVisible(false);
    };

    const goingBack = () => {
        navigate('../');
    };

    return (
        <div className="font-secondary">
            <form>
                <div className="">
                    <ServiceSectionEdit
                        control={control}
                        errors={errors}
                    />
                </div>
                <div className="d-flex justify-content-end mb-8 mt-4">
                    <button onClick={goingBack} type="reset" className="btn border border-gray-500 px-12 py-2 me-4">
                        {cancelButtonLabel}
                    </button>
                    <button onClick={showModal} type="button" className="btn btn-primary px-12 py-4">
                        {confirmButtonLabel}
                    </button>
                </div>
            </form>
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    message="Layanan gagal ditambahkan"
                    confirmLabel={buttonTitle}
                />
            )}
            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle={headTitle}
                    confirmButtonLabel={buttonTitle}
                    buttonTitle={confirmButtonLabel}
                    cancelButtonLabel='Batalkan'
                    message={message}
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    message={successMessage}
                />
            )}
        </div>
    );
};

export default ServiceFormEdit;