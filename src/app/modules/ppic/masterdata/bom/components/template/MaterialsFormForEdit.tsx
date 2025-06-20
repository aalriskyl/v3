import { FC, useState, useRef } from 'react';
import { useForm, Control, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { VariantSectionForEdit } from './section/VariantSectionForEdit';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';


export type FormData = {
    picture: null | File;
    name: string;
    errorMessage?: string;
    category: string;
    desc: string;
    product: string;
    material: string;
    material_id: string;
    brand_id: string;
    variant_material_suppliers: Array<{ id: number; name: string }>;
    variant_materials_uoms: Array<{ id: number; name: string }>;
};


const Form: FC<{ successMessage?: string; headTitle: string; buttonTitle: string; message: string, confirmButtonLabel: string, cancelButtonLabel: string }> = ({
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

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }, // Deklarasikan control dan errors
    } = useForm<FormData>({
        mode: 'onTouched',
        defaultValues: {
            picture: null,
            name: '',
            category: '',
            desc: '',
            product: '',
            material: '',
            material_id: '',
            brand_id: '',
            variant_material_suppliers: [],
            variant_materials_uoms: [],
        },
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        try {
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            setIsModalVisible(false);
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
                    <VariantSectionForEdit
                        control={control} // Pastikan control dilewatkan di sini
                        errors={errors} // Tambahkan errors juga
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
                    closeModal={() => setIsFailedModalVisible(false)}
                    message="Bill of Material gagal ditambahkan"
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
                    cancelButtonLabel="Batalkan"
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



export default Form;