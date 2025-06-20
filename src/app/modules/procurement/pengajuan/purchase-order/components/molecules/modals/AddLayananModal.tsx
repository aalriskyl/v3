import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import {
    createServicePurchaseOrder,
    getAllServiceSupplierBySupplierID,
    getSelectAllService,
    getSelectAllServiceNoCompany,
} from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

export interface LayananFormData {
    id?: string;
    service_id: string;
    service_supplier_id: string;
    conversion_service_id: string;
    price: number;
    amount: number;
}

interface LayananOption {
    value: string;
    label: string;
    service_suppliers: ServiceSupplier[];
}

interface ServiceSupplier {
    id: string;
    supplier: {
        id: any;
        name: string;
    };
}

interface AddLayananModalProps {
    show: boolean;
    handleClose: () => void;
    purchaseOrderId: string;
    onSuccess?: () => void;
    supplierId: string;
    isCompanyId: string
}

export const AddLayananModal = ({ show, handleClose, purchaseOrderId, onSuccess, supplierId, isCompanyId }: AddLayananModalProps) => {
    const [layananOptions, setLayananOptions] = useState<LayananOption[]>([]);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [konversiOptions, setKonversiOptions] = useState<{ value: string; label: string; price?: number }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<LayananFormData>({
        defaultValues: {
            service_id: '',
            service_supplier_id: '',
            conversion_service_id: '',
            price: 0,
        }
    });
    const selectedServiceId = watch('service_id');
    const selectedConversionServiceId = watch('conversion_service_id');

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
                    price: s.sell_price || 0,
                }));
                setKonversiOptions(options);
            } catch (error) {
                console.error('Failed to fetch conversion services:', error);
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
            }, [selectedServiceId, layananOptions, setValue]);
            useEffect(() => {
                if (selectedConversionServiceId) {
                    const selectedConversionService = konversiOptions.find(
                        option => option.value === selectedConversionServiceId
                    );
                    if (selectedConversionService && selectedConversionService.price) {
                        setValue('price', selectedConversionService.price);
                    }
                }
            }, [selectedConversionServiceId, konversiOptions, setValue]);

        useEffect(() => {
            if (show) {
                fetchServices();
                fetchConversionServices();
            }
        }, [show]);

    const handleFormSubmit = async (data: LayananFormData) => {
        setIsLoading(true);
        try {
            await createServicePurchaseOrder(purchaseOrderId, {
                ...data,
                price: Number(data.price),
                amount: Number(data.amount),
                service_supplier_id: data.service_supplier_id
            });
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            handleClose();
            reset(); // Reset the form after closing
            if (onSuccess) onSuccess();
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAndAddNew = async (data: LayananFormData) => {
            // console.log("Form Data Before Save & Add New:", data);
            setIsLoading(true);
            try {
                await createServicePurchaseOrder(purchaseOrderId, {
                    ...data,
                    price: Number(data.price),
                    amount: Number(data.amount),
                    service_supplier_id: data.service_supplier_id
                });
                setSuccessMessage("Berhasil ditambahkan!"); // Set success message
                reset(); // Reset the form for a new entry
                if (onSuccess) onSuccess(); // Call onSuccess to trigger refetch
    
                // Clear the success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } catch (error) {
                setFailedMessage(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Layanan</h2>
            </Modal.Header>
            <Modal.Body>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {failedMessage && <div className="alert alert-danger">{failedMessage}</div>} {/* Display success message */}
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="mb-6">
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="service_id"
                                    control={control}
                                    rules={{ required: 'Layanan wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            name="service_id"
                                            label="Layanan"
                                            options={layananOptions}
                                            placeholder="Pilih layanan"
                                            control={control}
                                            errors={errors}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    )}
                                />

                                <Controller
                                    name="conversion_service_id"
                                    control={control}
                                    rules={{ required: 'Layanan konversi wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            name="conversion_service_id"
                                            label="Layanan Konversi"
                                            options={konversiOptions}
                                            placeholder="Pilih layanan konversi"
                                            control={control}
                                            errors={errors}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    )}
                                />

                                <Controller
                                    name="service_supplier_id"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="hidden" {...field} />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{
                                        required: 'Harga wajib diisi',
                                        pattern: { value: /^[0-9]*$/, message: 'Hanya angka diperbolehkan' }
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            disabled={true}
                                            label="Harga"
                                            type="number"
                                            placeholder="Masukkan harga"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            
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
                    </div>
                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Batalkan
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                onClick={handleSubmit(handleSaveAndAddNew)}
                                disabled={isLoading}
                            >
                                {isLoading ? "Menyimpan..." : "Simpan & Tambah Baru"}
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};