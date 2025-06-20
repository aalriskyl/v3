import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useCallback } from 'react';
import { ID } from '@metronic/helpers';

interface MaterialFormData {
    material: string;
    uom: string;
    jumlah: number;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: MaterialFormData) => void;
    materialId?: ID;
    id?: string;
}

export const EditMaterialModal = ({ show, handleClose, onSubmit, materialId }: EditMaterialModalProps) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<MaterialFormData>({
        defaultValues: {
            material: '',
            uom: '',
            jumlah: 0,
        },
    });

    // Data statis untuk materialOptions dan uomOptions
    const materialOptions = [
        { value: '1', label: 'Material 1' },
        { value: '2', label: 'Material 2' },
        { value: '3', label: 'Material 3' },
    ];

    const uomOptions = [
        { value: 'pcs', label: 'PCS' },
        { value: 'kg', label: 'KG' },
        { value: 'liter', label: 'Liter' },
    ];

    const handleFormSubmit = useCallback((data: MaterialFormData) => {
        // Simulasikan proses penyimpanan data
        console.log('Data yang disubmit:', data);
        if (onSubmit) {
            onSubmit(data); // Panggil onSubmit jika ada
        }
        reset(); // Reset form setelah submit
        handleClose(); // Tutup modal
    }, [onSubmit, reset, handleClose]);

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
                                name="material"
                                control={control}
                                rules={{ required: 'Material wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Material"
                                        options={materialOptions}
                                        placeholder="Pilih Material"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="jumlah"
                                control={control}
                                rules={{ required: 'Jumlah wajib diisi'}}
                                render={({ field }) => (
                                    <InputField
                                        label="Jumlah"
                                        type="number"
                                        placeholder="Masukkan Jumlah"
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
                                name="uom"
                                control={control}
                                rules={{ required: 'Satuan UOM wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Satuan UOM"
                                        options={uomOptions}
                                        placeholder="Pilih Satuan UOM"
                                        control={control}
                                        errors={errors}
                                        {...field}
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
                            <Button variant="outline-primary border border-primary text-primary" onClick={() => reset()}>
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