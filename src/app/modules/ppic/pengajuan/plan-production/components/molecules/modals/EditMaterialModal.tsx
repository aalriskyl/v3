import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface MaterialFormData {
    bill_of_materials: string;
    tanggal_produksi: Date;
    jumlah_produksi: string;
    jenis_buffer_stock: string;
    buffer_stock: string;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: MaterialFormData) => void;
    id: string;
}

export const EditMaterialModal = ({ show, handleClose, onSubmit }: EditMaterialModalProps) => {
    const { id } = useParams<{ id: string }>();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<MaterialFormData>({
        defaultValues: {
            bill_of_materials: '',
            tanggal_produksi: new Date(),
            jumlah_produksi: '',
            jenis_buffer_stock: '',
            buffer_stock: '',
        },
    });

    // Data statis untuk materialOptions
    const materialOptions = [
        { value: '1', label: 'Material 1' },
        { value: '2', label: 'Material 2' },
        { value: '3', label: 'Material 3' },
    ];

    const handleFormSubmit = useCallback(async (data: MaterialFormData) => {
        if (!id) {
            setSubmitError('ID is required to create a material.');
            return;
        }

        const payload = {
            bill_of_materials: data.bill_of_materials,
            tanggal_produksi: data.tanggal_produksi.toISOString(),
            jumlah_produksi: parseInt(data.jumlah_produksi, 10),
            jenis_buffer_stock: data.jenis_buffer_stock,
            buffer_stock: parseInt(data.buffer_stock, 10),
        };

        try {
            // Simulasikan proses penyimpanan data
            console.log('Payload:', payload);
            setSuccessMessage('Material created successfully!');
            reset();
            handleClose();
        } catch (error) {
            setSubmitError('Failed to create material. Please try again.');
        }
    }, [id, reset, handleClose]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Ubah Material</h2>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Row>
                        <Col md={6}>
                            <Controller
                                name="bill_of_materials"
                                control={control}
                                rules={{ required: 'Bill of Materials is required' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Bill of Materials"
                                        options={materialOptions}
                                        placeholder="Pilih Bill of Materials"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="jumlah_produksi"
                                control={control}
                                rules={{ required: 'Jumlah Produksi is required' }}
                                render={({ field }) => (
                                    <InputField
                                        label="Jumlah Produksi"
                                        type="number"
                                        placeholder="Masukkan Jumlah Produksi"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6}>
                            <Controller
                                name="jenis_buffer_stock"
                                control={control}
                                rules={{ required: 'Jenis Buffer Stock is required' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Jenis Buffer Stock"
                                        options={[{ value: 'Nominal', label: 'Nominal' }]}
                                        placeholder="Pilih Jenis Buffer Stock"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="buffer_stock"
                                control={control}
                                rules={{ required: 'Buffer Stock is required' }}
                                render={({ field }) => (
                                    <InputField
                                        label="Buffer Stock"
                                        type="number"
                                        placeholder="Masukkan Buffer Stock"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    {submitError && <div className="text-danger">{submitError}</div>}
                    {successMessage && <div className="text-success">{successMessage}</div>}
                    <div className="d-flex mt-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <Button variant="outline-primary border border-primary text-primary" onClick={() => { reset(); }}>
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