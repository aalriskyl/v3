import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState } from 'react';

interface Service {
    service: string;
    supplier: string;
}

interface EditServiceModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: Service) => void;
}

export const EditServiceModal = ({ show, handleClose, onSubmit }: EditServiceModalProps) => {
    const [serviceTypeOptions] = useState([
        { value: '1', label: 'Layanan Konsultasi' },
        { value: '2', label: 'Layanan Teknis' },
        { value: '3', label: 'Layanan Darurat' },
    ]);

    const [serviceCategoryOptions] = useState([
        { value: 'A', label: 'Kategori Standar' },
        { value: 'B', label: 'Kategori Premium' },
        { value: 'C', label: 'Kategori Enterprise' },
    ]);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<Service>({
        defaultValues: {
            service: '',
            supplier: '',
        }
    });

    const handleFormSubmit = (data: Service) => {
        onSubmit?.(data);
        reset();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Ubah Layanan</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Row>
                        {/* Select Kiri - Jenis Layanan */}
                        <Col md={6}>
                            <Controller
                                name="service"
                                control={control}
                                rules={{ required: 'Layanan wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Layanan"
                                        options={serviceTypeOptions}
                                        placeholder="Pilih Layanan"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>

                        {/* Select Kanan - Kategori Layanan */}
                        <Col md={6}>
                            <Controller
                                name="supplier"
                                control={control}
                                rules={{ required: 'Supplier wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Supplier"
                                        options={serviceCategoryOptions}
                                        placeholder="Pilih supplier"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                            >
                                Ubah
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};