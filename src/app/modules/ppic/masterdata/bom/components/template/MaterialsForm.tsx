import { FC, useState, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { MaterialsSection } from './section/MaterialsSection';
// import { RecipeSection } from './section/RecipeSection';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
// import { ServiceSection } from './section/ServiceSection';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

// Dummy schema (replace with actual Yup schema)
const schema = {
    // Add your validation schema here
};

type FormData = {
    picture: null | File;
    name: string;
    errorMessage?: string; // Tambah prop untuk pesan error
    category: string;
    desc: string;
    product: string;
    material: string;
    material_id: string;
    brand_id: string;
    variant_material_suppliers: Array<{ id: number; name: string }>; // More specific type
    variant_materials_uoms: Array<{ id: number; name: string }>; // More specific type
};

const Form: FC<{ successMessage?: string; headTitle: string; buttonTitle: string; message: string, confirmButtonLabel: string, cancelButtonLabel: string }> = ({
    successMessage,
    headTitle,
    buttonTitle,
    message,
    confirmButtonLabel,
    // cancelButtonLabel
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }, // Add formState to get errors
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

    const handleCloseFailedModal = () => {
        setIsFailedModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true); // Set modal visibility to true
    };

    const handleConfirm = async () => {
        try {
            // // Simulasi error
            // throw new Error('Simulated API error');

            // Jika sukses
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            setIsModalVisible(false);
            // setIsFailedModalVisible(true);
        }
    };

    const handleCloseSuccessModal = () => {
        navigate('../');
        setIsSuccessModalVisible(false);
    };

    const goingBack = () => {
        navigate('../');
    };

    const saveData = (option: string) => {
        console.log(option)
    }

    return (
        <div className="font-secondary">
            <div className="">
                <MaterialsSection
                    saveData={saveData}
                    // showModal={showModal}
                    control={control}
                    errors={errors} // Pass errors prop
                />
            </div>
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
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


export default Form;