import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState } from 'react';

interface MaterialFormData {
    material_id: string;
    quantity: string;
    uom_id: string;
    supplier_id: string;
}

interface AddMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: MaterialFormData) => void;
}

export const AddMaterialModal = ({ show, handleClose, onSubmit }: AddMaterialModalProps) => {
    const [materialOptions] = useState([
        { value: '1', label: 'Material A' },
        { value: '2', label: 'Material B' },
    ]);

    const [uomOptions] = useState([
        { value: '1', label: 'Kilogram' },
        { value: '2', label: 'Pcs' },
    ]);

    const [supplierOptions] = useState([
        { value: '1', label: 'Supplier X' },
        { value: '2', label: 'Supplier Y' },
    ]);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<MaterialFormData>({
        defaultValues: {
            material_id: '',
            quantity: '',
            uom_id: '',
            supplier_id: '',
        }
    });

    const handleFormSubmit = (data: MaterialFormData) => {
        onSubmit?.(data);
        reset();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Material</h2>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Section Material */}
                    <div className="mb-6">
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="material_id"
                                    control={control}
                                    rules={{ required: 'Material wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Pilih Material"
                                            options={materialOptions}
                                            placeholder="Pilih material"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Controller
                                    name="uom_id"
                                    control={control}
                                    rules={{ required: 'Satuan UOM wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Satuan UOM"
                                            options={uomOptions}
                                            placeholder="Pilih satuan UOM"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />

                            </Col>
                        </Row>
                    </div>

                    {/* Section Satuan UOM */}
                    <div className="mb-6">
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    rules={{
                                        required: 'Jumlah stok wajib diisi',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Hanya angka yang diperbolehkan'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Jumlah Stock"
                                            type="number"
                                            placeholder="Masukkan jumlah stock"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>

                        </Row>
                    </div>

                    {/* Tombol */}
                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Batalkan
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                            >
                                Simpan & Tambah Baru
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};