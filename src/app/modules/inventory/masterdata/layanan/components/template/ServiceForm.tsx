import { FC, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceSection } from './section/ServiceSection';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { createService, getServiceById, updateService } from '../core/_request'; // Add updateService for editing
import OverlayLoader from '@metronic/layout/components/OverlayLoader';
import { getErrorMessage } from '../../../../../../helper/getErrorMessage';

// In the ServiceForm component, update the Yup schema:
const schema = Yup.object().shape({
    name: Yup.string().required('Nama Layanan Wajib diisi'),
    category: Yup.string().required('Kategori wajib diisi'),
    brand_id: Yup.string().required('Brand wajib diisi'),
    default_purchase: Yup.boolean(), // Removed .required()
    default_sale: Yup.boolean(),     // Removed .required()
    description: Yup.string().optional(),
    sell_price: Yup.number().required('Harga jual wajib diisi')
});

type FormData = {
    name: string;
    category: string;
    brand_id: string;
    default_purchase?: boolean;
    default_sale?: boolean;
    description?: string;
    sell_price: number;
};

type ServiceFormProps = {
    mode: 'create' | 'edit'; // Add mode prop
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
};

const ServiceForm: FC<ServiceFormProps> = ({
    mode,
    successMessage,
    headTitle,
    buttonTitle,
    message,
    confirmButtonLabel,
    cancelButtonLabel,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    

    const { control, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            category: '',
            brand_id: '',
            default_purchase: false,
            default_sale: false,
            description: '',
            sell_price: 0,
        },
    });

    // Fetch service data when in edit mode
    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchServiceData = async () => {
                try {
                    const service = await getServiceById(id);
                    if (service) {
                        reset({
                            name: service.name,
                            category: service.category_id,
                            brand_id: service.brand_id,
                            default_purchase: service.default_purchase,
                            default_sale: service.default_sale,
                            sell_price: service.sell_price,
                            description: service.description,
                        });
                    }
                } catch (error: any) {
                    setErrorMessage(getErrorMessage(error));
                }
            };

            fetchServiceData();
        }
        setLoading(false)
    }, [mode, id, reset]);

    const handleCloseFailedModal = () => {
        setIsFailedModalVisible(false);
    };

    const onSubmit = (data: FormData) => {
        handleConfirmData.current = data;
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        setLoading(true)
        if (handleConfirmData.current) {
            try {
                const serviceData = {
                    name: handleConfirmData.current.name,
                    category_id: handleConfirmData.current.category,
                    brand_id: handleConfirmData.current.brand_id,
                    default_purchase: handleConfirmData.current.default_purchase,
                    default_sale: handleConfirmData.current.default_sale,
                    description: handleConfirmData.current.description,
                    sell_price: handleConfirmData.current.sell_price
                };

                let serviceId: string | undefined;

                if (mode === 'create') {
                    // Create a new service
                    serviceId = await createService(serviceData);
                } else if (mode === 'edit' && id) {
                    serviceId = await updateService(id, serviceData);
                }

                if (serviceId) {
                    setIsModalVisible(false);
                    setIsSuccessModalVisible(true);
                    reset();
                    // Navigate to the detail page using the serviceId
                    navigate(`/inventory/masterdata/layanan/detail/${serviceId}`);
                } else {
                    console.error('Service ID is not available for navigation.');
                }
            } catch (error: any) {
                setErrorMessage(getErrorMessage(error));
            } finally {
                setLoading(false);
                setIsModalVisible(false);
            }
        }
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    const goingBack = () => {
        navigate('../');
    };

    return (
        <div className="font-secondary">
            {/* {
                loading && <OverlayLoader/>
            } */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <ServiceSection control={control} errors={errors} />
                </div>
                <div className="d-flex justify-content-end mb-8 mt-4">
                    <button onClick={goingBack} type="button" className="btn border border-gray-500 px-12 py-2 me-4">
                        {cancelButtonLabel}
                    </button>
                    <button type="submit" className="btn btn-primary px-12 py-4" disabled={!isValid}>
                        {confirmButtonLabel}
                    </button>
                </div>
            </form>

            {errorMessage && (
                <FailedModal
                closeModal={() => setErrorMessage(null)}
                message={errorMessage}
                        />
            )}

            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    message={mode === 'create' ? 'Layanan gagal ditambahkan' : 'Layanan gagal diperbarui'}
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
                    successMessage={successMessage}
                />
            )}
        </div>
    );
};

export default ServiceForm;