import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import { createServicePurchaseOrder, getAllServiceSupplierBySupplierID } from '../../../core/_request';
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
}

export const AddLayananModalSupplier = ({ show, handleClose, purchaseOrderId, onSuccess, supplierId }: AddLayananModalProps) => {
    const [layananOptions, setLayananOptions] = useState<LayananOption[]>([]);
    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<LayananFormData>();
    const selectedServiceId = watch('service_id');
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceSupplierDetails, setServiceSupplierDetails] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

    useEffect(() => {
        const fetchServices = async () => {
            if (!supplierId) return;
            try {
                const response = await getAllServiceSupplierBySupplierID(supplierId);
                // console.log("Fetched services:", response.data);
                setLayananOptions(
                    response.data.map((s: any) => ({
                        value: s.id,
                        label: s.name,
                        service_suppliers: s.service_suppliers
                    }))
                );
            } catch (error) {
                console.error("Gagal mengambil layanan:", error);
            }
        };
        fetchServices();
    }, [supplierId, setValue]);

    useEffect(() => {
        const fetchServiceSupplierDetails = async () => {
            if (!selectedServiceId) return;
            // console.log("Fetching service supplier details for service ID:", selectedServiceId);
            try {
                const response = await axiosInstance.get(`/inventory/master-data/service/service-supplier/service/${selectedServiceId}`);
                // console.log("Fetched service supplier details:", response.data);
                const serviceSuppliers = response.data.data.service_suppliers;
                setServiceSupplierDetails(response.data);

                if (serviceSuppliers && serviceSuppliers.length > 0) {
                    const firstServiceSupplier = serviceSuppliers[0];
                    // console.log("Setting service supplier ID and price:", firstServiceSupplier.id, firstServiceSupplier.buy_price);
                    setValue('service_supplier_id', firstServiceSupplier.id);
                    setValue('price', firstServiceSupplier.buy_price);
                } else {
                    console.warn("No service suppliers found for selected service ID:", selectedServiceId);
                }
            } catch (error) {
                console.error("Failed to fetch service supplier details:", error);
            }
        };
        fetchServiceSupplierDetails();
    }, [selectedServiceId, setValue]);

    const handleFormSubmit = async (data: LayananFormData) => {
        // console.log("Form Data Before Submission:", data);
        setIsLoading(true);
        try {
            await createServicePurchaseOrder(purchaseOrderId, {
                ...data,
                price: Number(data.price),
                amount: Number(data.amount),
            });
            setSuccessMessage("Berhasil ditambahkan!"); // Set success message
            reset(); // Reset the form after submission
            if (onSuccess) onSuccess();

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

    const handleSaveAndAddNew = async (data: LayananFormData) => {
                // console.log("Form Data Before Save & Add New:", data);
                setIsLoading(true);
                try {
                    await createServicePurchaseOrder(purchaseOrderId, {
                        ...data,
                        price: Number(data.price),
                        amount: Number(data.amount),
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
                                            label="Harga"
                                            type="number"
                                            placeholder="Masukkan harga"
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
                            >
                                Simpan & Tambah Baru
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