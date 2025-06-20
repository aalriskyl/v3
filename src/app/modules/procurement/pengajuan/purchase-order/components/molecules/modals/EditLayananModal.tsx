import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { ID } from '@metronic/helpers';
import { getAllServiceSupplierBySupplierID, getSingleServicePo, getSelectAllService, updateServicePo } from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

interface ServiceSupplier {
    id: string;
    supplier: {
        id: any;
        name: string;
    };
}


interface LayananOption {
    value: string;
    label: string;
    service_suppliers: ServiceSupplier[];
}


interface LayananFormData {
    service_id: string;
    service_supplier_id: string;
    // conversion_service_id: string;
    price: number;
    amount: number;
}

interface EditLayananModalProps {
    show: boolean;
    handleClose: () => void;
    layananId?: ID;
    type: string; // "Warehouse" or other types
    supplierId: string;
}

export const EditLayananModal = ({ show, handleClose, layananId, type, supplierId }: EditLayananModalProps) => {
    const [layananOptions, setLayananOptions] = useState<LayananOption[]>([]);
    const [konversiOptions, setKonversiOptions] = useState<{ value: string; label: string; price?: number }[]>([]);
    const { control, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<LayananFormData>({
        defaultValues: {
            service_id: '',
            service_supplier_id: '',
            // conversion_service_id: '',
            price: 0,
        },
    });
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const selectedServiceId = watch('service_id');
    // const selectedConversionServiceId = watch('conversion_service_id');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    // Fetch services for the dropdown

    useEffect(() => {
        const fetchServices = async () => {
            if (!supplierId) return;
            try {
                const response = await getAllServiceSupplierBySupplierID(supplierId);
                setLayananOptions(
                    response.data.map((s: any) => ({
                        value: s.id,
                        label: s.name,
                        service_suppliers: s.service_suppliers
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, [supplierId]);

    // Fetch conversion services for the dropdown
    // useEffect(() => {
    //     const fetchAllServices = async () => {
    //         try {
    //             const response = await getSelectAllService();
    //             const servicesData = response.data.services || [];
    //             setKonversiOptions(
    //                 servicesData.map((s: any) => ({
    //                     value: s.id,
    //                     label: s.name,
    //                     price: s.price || 0
    //                 }))
    //             );
    //         } catch (error) {
    //             console.error("Failed to fetch conversion services:", error);
    //         }
    //     };
    //     fetchAllServices();
    // }, []);

    // Set default service supplier when a service is selected
    useEffect(() => {
        if (selectedServiceId) {
            const selectedService = layananOptions.find(option => option.value === selectedServiceId);
            if (selectedService && selectedService.service_suppliers?.length) {
                // Find the service supplier that matches the layananId
                const matchingServiceSupplier = selectedService.service_suppliers.find(
                    supplier => supplier.supplier.id === supplierId
                );
                if (matchingServiceSupplier) {
                    setValue('service_supplier_id', matchingServiceSupplier.id);
                } else {
                    // If no match is found, set the first service supplier as a fallback
                    // setValue('service_supplier_id', selectedService.service_suppliers[0].id);
                }
            }
        }
    }, [selectedServiceId, layananOptions, setValue, layananId]);

    // Fetch service supplier details when a conversion service is selected
    // useEffect(() => {
    //     const fetchServiceSupplierDetails = async () => {
    //         if (!selectedConversionServiceId) return;
    //         try {
    //             const response = await axiosInstance.get(`/inventory/master-data/service/service-supplier/service/${selectedConversionServiceId}`);
    //             const serviceSuppliers = response.data.data.service_suppliers;
    //             if (serviceSuppliers && serviceSuppliers.length > 0) {
    //                 const firstServiceSupplier = serviceSuppliers[0];
    //                 setValue('service_supplier_id', firstServiceSupplier.id);
    //                 setValue('price', firstServiceSupplier.buy_price);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch service supplier details:", error);
    //         }
    //     };
    //     fetchServiceSupplierDetails();
    // }, [selectedConversionServiceId, setValue]);

    // Fetch layanan data for editing
    useEffect(() => {
        const fetchLayananData = async () => {
            if (!layananId) return;
            try {
                const response = await getSingleServicePo(layananId);
                const data = response.data;
                reset({
                    service_id: data.service.id,
                    service_supplier_id: data.service_supplier.id,
                    // conversion_service_id: data.conversion_service?.id || '',
                    price: data.price,
                    amount: data.amount,
                });
            } catch (error) {
                 setFailedMessage(getErrorMessage(error));
            }
        };

        if (show) {
            fetchLayananData();
        }
    }, [layananId, show, reset]);

    // Handle form submission
    const handleFormSubmit = async (formData: LayananFormData) => {
            setIsLoading(true);
            try {
                // Ensure price is a number
                const dataToUpdate = {
                    service_id: formData.service_id,
                    service_supplier_id: formData.service_supplier_id,
                    price: Number(formData.price),
                    amount: Number(formData.amount),
                };
                
                await updateServicePo(layananId, dataToUpdate);
                handleClose(); // Close the modal after successful update
                navigate(0);
            } catch (error) {
                 setFailedMessage(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Ubah Layanan</h2>
            </Modal.Header>
            <Modal.Body>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {failedMessage && <div className="alert alert-danger">{failedMessage}</div>}
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Row>
                        <Col md={6}>
                            <Controller
                                name="service_id"
                                control={control}
                                rules={{ required: 'Layanan wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Layanan"
                                        options={layananOptions}
                                        placeholder="Pilih Layanan"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: 'Harga wajib diisi' }}
                                render={({ field }) => (
                                    <InputField
                                        label="Harga"
                                        type="number"
                                        placeholder="Masukkan Harga"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: 'Jumlah wajib diisi',
                                    pattern: { value: /^[0-9]*$/, message: 'Hanya angka diperbolehkan' }
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Jumlah"
                                        type="number"
                                        placeholder="Masukkan jumlah"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    {/* Conditionally render the conversion service field based on the type */}
                    {/* {type === "Warehouse" && (
                        <Row className="mt-4">
                            <Col md={6}>
                                <Controller
                                    name="conversion_service_id"
                                    control={control}
                                    rules={{ required: 'Layanan Konversi wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Layanan Konversi"
                                            options={konversiOptions}
                                            placeholder="Pilih Layanan Konversi"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    )} */}
                    <div className="d-flex mt-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};