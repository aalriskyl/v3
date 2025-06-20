/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../../../../../service/axiosInstance';

interface Service {
    service: { id: string; name: string };
    supplier: { id: string; name: string };
}

interface AddServiceModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: Service) => void;
}

export const AddServiceModal = ({ show, handleClose, onSubmit }: AddServiceModalProps) => {
    const [serviceOptions, setServiceOptions] = useState<{ value: string; label: string }[]>([]);
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<Service>({
        defaultValues: {
            service: { id: '', name: '' },
            supplier: { id: '', name: '' },
        }
    });

    const selectedServiceId = watch('service.id');

    // Fetch services data
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get('/inventory/master-data/service/select');
                if (response.data.status === 200) {
                    const formattedServices = response.data.data.services.map((service: any) => ({
                        value: service.id,
                        label: service.name,
                    }));
                    setServiceOptions(formattedServices);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Fetch suppliers when service changes
    useEffect(() => {
        const fetchSuppliers = async () => {
            if (selectedServiceId) {
                try {
                    const response = await axiosInstance.get(
                        `/inventory/master-data/service/service-supplier/select/${selectedServiceId}`
                    );
                    if (response.data.status === 200) {
                        const formattedSuppliers = response.data.data.supplier_services.map((supplier: any) => ({
                            value: supplier.id,
                            label: supplier.name,
                        }));
                        setSupplierOptions(formattedSuppliers);
                    }
                } catch (error) {
                    console.error('Error fetching suppliers:', error);
                    setSupplierOptions([]);
                }
            } else {
                setSupplierOptions([]);
            }
        };
        fetchSuppliers();
    }, [selectedServiceId]);

    const handleFormSubmit = (data: Service) => {
        // Temukan nama dari opsi yang dipilih
        const selectedService = serviceOptions.find(opt => opt.value === data.service.id) || { value: '', label: '' };
        const selectedSupplier = supplierOptions.find(opt => opt.value === data.supplier.id) || { value: '', label: '' };

        const processedData = {
            service: {
                id: selectedService.value,
                name: selectedService.label,
            },
            supplier: {
                id: selectedSupplier.value,
                name: selectedSupplier.label,
            },
        };
        onSubmit?.(processedData);
        reset();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Tambah Layanan</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Row>
                        {/* Select Layanan */}
                        <Col md={6}>
                            <Controller
                                name="service.id"
                                control={control}
                                rules={{ required: 'Layanan wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Layanan"
                                        options={serviceOptions}
                                        placeholder={loading ? "Memuat..." : "Pilih Layanan"}
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>

                        {/* Select Supplier */}
                        <Col md={6}>
                            <Controller
                                name="supplier.id"
                                control={control}
                                rules={{ required: 'Supplier wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Supplier"
                                        options={supplierOptions}
                                        placeholder={supplierOptions.length ? "Pilih supplier" : "Pilih layanan terlebih dahulu"}
                                        control={control}
                                        errors={errors}
                                        disabled={!selectedServiceId}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Batalkan
                        </Button>
                        <div className="d-flex jutify-end">
                            <Button 
                                variant="outline-primary" 
                                className="me-4"
                                onClick={handleSubmit(handleFormSubmit)}
                            >
                                Simpan & Tambah Baru
                            </Button>
                            <Button variant="primary" type="submit">
                                Simpan
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};