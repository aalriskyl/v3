import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { ID } from '@metronic/helpers';
import {
    getAllServiceSupplierBySupplierID,
    getSingleServicePo,
    getSelectAllService,
    updateServicePo,
    getSelectAllServiceNoCompany,
} from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';
import { useServicesPurchaseOrders } from '../core/ServicePoContext';

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
    conversion_service_id: string;
    price: number;
    amount: number;
}

interface EditLayananModalProps {
    show: boolean;
    handleClose: () => void;
    layananId?: ID;
    type: string; // "Warehouse" or other types
    supplierId: string;
    isCompanyId: string;
    isQuotation: string;
}

export const EditLayananModalWarehouse = ({
    show,
    handleClose,
    layananId,
    type,
    supplierId,
    isCompanyId,
    isQuotation,
}: EditLayananModalProps) => {
    const [layananOptions, setLayananOptions] = useState<LayananOption[]>([]);
    const [konversiOptions, setKonversiOptions] = useState<{ value: string; label: string; price?: number }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { fetchData } = useServicesPurchaseOrders();

    const { control, handleSubmit, reset, setValue, watch } = useForm<LayananFormData>({
        defaultValues: {
            service_id: '',
            service_supplier_id: '',
            conversion_service_id: '',
            price: 0,
            amount: 0,
        },
    });

    const selectedServiceId = watch('service_id');
    const selectedConversionServiceId = watch('conversion_service_id');

    const navigate = useNavigate();

    // Fetch services for the dropdown
    const fetchServices = async () => {
        if (!supplierId) return;
        try {
            const response = await getAllServiceSupplierBySupplierID(supplierId);
            const options = response.data.map((s: any) => ({
                value: s.id,
                label: s.name,
                service_suppliers: s.service_suppliers,
            }));
            setLayananOptions(options);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        }
    };

    // Fetch conversion services for the dropdown
    const fetchConversionServices = async () => {
        try {
            const response = await getSelectAllServiceNoCompany(isCompanyId);
            const servicesData = response.data.services || [];
            const options = servicesData.map((s: any) => ({
                value: s.id,
                label: s.name,
                price: s.price || 0,
            }));
            setKonversiOptions(options);
        } catch (error) {
            console.error('Failed to fetch conversion services:', error);
        }
    };

    // Fetch layanan data for editing
    const fetchLayananData = async () => {
        if (!layananId) return;
        try {
            const response = await getSingleServicePo(layananId);
            const data = response.data;
            const conversionServiceId = data.conversion_service_id || data.conversion_service?.id || '';

            // Reset form with fetched data
            reset({
                service_id: data.service?.id || '',
                conversion_service_id: conversionServiceId,
                service_supplier_id: data.service_supplier?.id || '',
                price: data.price,
                amount: data.amount,
            });

            // Log the fetched data for debugging
            console.log('Fetched Layanan Data:', data);
            console.log('Conversion Service ID:', conversionServiceId);
            console.log('Konversi Options:', konversiOptions);

            // Compare and auto-fill conversion service if a match is found
            if (conversionServiceId && konversiOptions.length > 0) {
                const matchingOption = konversiOptions.find((option) => option.value === conversionServiceId);
                if (matchingOption) {
                    console.log('Matching Option Found:', matchingOption);
                    setValue('conversion_service_id', conversionServiceId);
                } else {
                    console.warn('No matching option found for conversion_service_id:', conversionServiceId);
                }
            }
        } catch (error) {
            console.error('Error fetching layanan data:', error);
        }
    };
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

    // Handle form submission
    const handleFormSubmit = async (formData: LayananFormData) => {
        setIsLoading(true);
        try {
            const dataToUpdate = {
                service_id: formData.service_id,
                service_supplier_id: formData.service_supplier_id,
                price: Number(formData.price),
                conversion_service_id: formData.conversion_service_id,
                amount: Number(formData.amount),
            };

            await updateServicePo(layananId, dataToUpdate);
            fetchData();
            handleClose();
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when the modal is shown
    useEffect(() => {
        if (show) {
            fetchServices();
            fetchConversionServices();
            fetchLayananData();
        }
    }, [show]);

    // Ensure conversion_service_id is set after konversiOptions are loaded
    useEffect(() => {
        if (konversiOptions.length > 0 && selectedConversionServiceId) {
            const matchingOption = konversiOptions.find((option) => option.value === selectedConversionServiceId);
            if (matchingOption) {
                console.log('Setting conversion_service_id:', selectedConversionServiceId);
                setValue('conversion_service_id', selectedConversionServiceId);
            } else {
                console.warn('No matching option found for conversion_service_id:', selectedConversionServiceId);
            }
        }
    }, [konversiOptions, selectedConversionServiceId, setValue]);

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
                                        errors={{}}
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
                                        errors={{}}
                                        {...field}
                                        disabled={!!isQuotation}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
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
                                        errors={{}}
                                        {...field}
                                        disabled={!!isQuotation}
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
                                    pattern: { value: /^[0-9]*$/, message: 'Hanya angka diperbolehkan' },
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Jumlah"
                                        type="number"
                                        placeholder="Masukkan jumlah"
                                        control={control}
                                        errors={{}}
                                        {...field}
                                        disabled={!!isQuotation}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex mt-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};