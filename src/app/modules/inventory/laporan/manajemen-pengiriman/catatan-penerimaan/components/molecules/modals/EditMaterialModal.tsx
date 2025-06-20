import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TextareaField from '../field/TextareaField';
import { dummyMaterials } from '../../organisms/table/dummyUsers';


interface MaterialFormData {
    material: string;
    uom: string;
    jumlah: number;
    harga: number;
    barcode: string; // Tambahkan field barcode
    catatan: string;
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
            material: '',
            uom: '',
            jumlah: 0,
            harga: 0,
            barcode: '', // Default value untuk barcode
            catatan: '',
        },
    });

    // Data statis untuk materialOptions dan uomOptions
    const materialOptions = [
        { value: '1', label: 'Material 1' },
        { value: '2', label: 'Material 2' },
        { value: '3', label: 'Material 3' },
    ];

    const uomOptions = [
        { value: 'Nominal', label: 'Nominal' },
        { value: 'Gram', label: 'Gram' },
        { value: 'Liter', label: 'Liter' },
    ];

    const handleFormSubmit = useCallback(async (data: MaterialFormData) => {
        if (!id) {
            setSubmitError('ID is required to create a material.');
            return;
        }

        const payload = {
            material: data.material,
            uom: data.uom,
            jumlah: data.jumlah,
            harga: data.harga,
            barcode: data.barcode, // Sertakan barcode dalam payload
            catatan: data.catatan,
        };

        try {
            // Simulasikan proses penyimpanan data
            console.log('Payload:', payload);
            setSuccessMessage('Material berhasil disimpan!');
            reset();
            handleClose();
        } catch (error) {
            setSubmitError('Gagal menyimpan material. Silakan coba lagi.');
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
                        {/* Sebelah Kiri: Material, Satuan UOM, Harga */}
                        <Col md={6}>
                            <Controller
                                name="material"
                                control={control}
                                rules={{ required: 'Material wajib diisi' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Material"
                                        options={materialOptions}
                                        placeholder="Pilih Material"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="uom"
                                control={control}
                                rules={{ required: 'Satuan UOM wajib diisi' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Satuan UOM"
                                        options={uomOptions}
                                        placeholder="Pilih Satuan UOM"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="catatan"
                                control={control}
                                rules={{ required: 'Catatan wajib diisi' }}
                                render={({ field }) => (
                                    <TextareaField
                                        label="Catatan"
                                        placeholder="Masukkan Catatan"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                        rows={4}
                                    />
                                )}
                            />
                        </Col>

                        {/* Sebelah Kanan: Jumlah, Barcode, Catatan */}
                        <Col md={6}>
                            <Controller
                                name="jumlah"
                                control={control}
                                rules={{ required: 'Jumlah wajib diisi' }}
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
                            <Controller
                                name="barcode"
                                control={control}
                                rules={{ required: 'Barcode wajib diisi' }}
                                render={({ field }) => (
                                    <InputField
                                        label="Barcode"
                                        type="text"
                                        placeholder="Masukkan Barcode"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    {submitError && <div className="text-danger mt-3">{submitError}</div>}
                    {successMessage && <div className="text-success mt-3">{successMessage}</div>}
                    <div className="d-flex mt-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <Button variant="primary" type="submit">
                                Ubah
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};