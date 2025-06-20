import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '../field/TextareaField';
import { useState, useCallback, useEffect } from 'react';
import { updateRnMaterial } from '../../../core/_request';
import axiosInstance from '../../../../../../../../../service/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface MaterialFormData {
    material: string;
    uom: string;
    amount: number;
    remarks?: string;
    amount_destroy?: number;
    amount_retur?: number;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    id: string;
    type: string;
    onMaterialUpdated: () => void; // Add this prop
}

export const EditMaterialModal = ({ show, handleClose, id, type, onMaterialUpdated }: EditMaterialModalProps) => {
    const [materialData, setMaterialData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<MaterialFormData>({
        defaultValues: {
            material: '',
            uom: '',
            amount: 0,
            remarks: '',
            amount_destroy: undefined,
            amount_retur: undefined,
        },
    });

    // Fetch material data when the modal is opened
    useEffect(() => {
        const fetchMaterialData = async () => {
            if (!id) {
                setError('ID is required to fetch material data.');
                return;
            }

            try {
                const response = await axiosInstance.get(`/inventory/submission/delivery-management/received-note/received-note-material/${id}`);
                setMaterialData(response.data.data);
                // console.log('material data', response.data.data);
                reset({
                    material: response.data.data.material.name,
                    uom: response.data.data.material_uom.uom_actual.name,
                    amount: response.data.data.amount,
                    remarks: response.data.data.remarks || '',
                    amount_destroy: response.data.data.amount_destroy,
                    amount_retur: response.data.data.amount_retur,
                });
                setError(null);
            } catch (error: any) {
                if (error.response) {
                    const errorData = error.response.data;
                    if (errorData.field && typeof errorData.field === 'object') {
                        const errors = Object.entries(errorData.field)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join('\n');
                        setError(errors);
                    } else {
                        setError(errorData.field);
                    }
                } else {
                    setError('Failed to submit data.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (show) {
            fetchMaterialData();
        }
    }, [id, show, reset]);

    const handleFormSubmit = useCallback(async (data: MaterialFormData) => {
        if (!id) {
            setSubmitError('ID is required to update the material.');
            return;
        }

        const payload = {
            amount: Number(data.amount),
            amount_destroy: Number(data.amount_destroy),
            amount_retur: Number(data.amount_retur),
            remarks: data.remarks,
        };

        try {
            await updateRnMaterial(id, payload);
            setSuccessMessage('Material berhasil diperbarui!');
            reset();
            handleClose();
            navigate(0);
        } catch (error: any) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.field && typeof errorData.field === 'object') {
                    const errors = Object.entries(errorData.field)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('\n');
                    setError(errors);
                } else {
                    setSubmitError(errorData.field);
                }
            } else {
                setError('Failed to submit data.');
            }
        }
    }, [id, reset, handleClose, onMaterialUpdated]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Ubah Material</h2>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Row>
                            {/* Sebelah Kiri: Material, Satuan UOM */}
                            <Col md={6}>
                                <Controller
                                    name="material"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            label="Material"
                                            type="text"
                                            placeholder="Material"
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
                                    render={({ field }) => (
                                        <InputField
                                            label="Satuan UOM"
                                            type="text"
                                            placeholder="Satuan UOM"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                            disabled
                                        />
                                    )}
                                />
                            </Col>

                            {/* Sebelah Kanan: Jumlah, Catatan */}
                            <Col md={6}>
                                <Controller
                                    name="amount"
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
                                        {
                                            type === "Standard" ? (
                                                <Controller
                                                    name="amount_retur"
                                                    control={control}
                                                    rules={{ required: 'Jumlah retur wajib diisi' }}
                                                    render={({ field }) => (
                                                        <InputField
                                                            label="Jumlah Retur"
                                                            type="number"
                                                            placeholder="Masukkan Jumlah Retur"
                                                            control={control}
                                                            errors={errors}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            ) : (
                                                <Controller
                                                    name="amount_destroy"
                                                    control={control}
                                                    rules={{ required: 'Jumlah dimusnahkan wajib diisi' }}
                                                    render={({ field }) => (
                                                        <InputField
                                                            label="Jumlah Dimusnahkan"
                                                            type="number"
                                                            placeholder="Masukkan Jumlah Dimusnahkan"
                                                            control={control}
                                                            errors={errors}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            )
                                        }
                                <Controller
                                    name="remarks"
                                    control={control}
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
                        </Row>
                                {submitError && (
                                    <div className="text-danger mt-3">{submitError}</div>
                                )}
                                {successMessage && (
                                    <div className="text-success mt-3">{successMessage}</div>
                                )}
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
                )}
            </Modal.Body>
        </Modal>
    );
};