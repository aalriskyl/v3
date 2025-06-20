import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import { getActiveSuppliers, createMaterialSuppliers } from '../../core/_request';
import { useParams } from 'react-router-dom';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

interface SupplierFormData {
    supplier_id: string; // Supplier ID
    priority_supplier: number; // Priority supplier (1, 2, 3, or 4)
    default_supplier: boolean; // Default supplier
    buy_price: number | null; // Buy price (must be a number)
}

interface AddSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: SupplierFormData) => void; // Callback for parent component
}

export const AddSupplierModal = ({ show, handleClose, onSubmit }: AddSupplierModalProps) => {
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(true)
    
    const { control, handleSubmit, formState: { errors, isValid }, reset, } = useForm<SupplierFormData>({
        defaultValues: {
            supplier_id: '',
            priority_supplier: 1, // Default priority (1)
            default_supplier: false,
            buy_price: null, // Default buy price
        }
    });

    useEffect(() => {
        if (show) {
            getActiveSuppliers()
                .then((response) => {
                    const options = response.map((supplier: { id: number; name: string }) => ({
                        value: supplier.id.toString(),
                        label: supplier.name,
                    }));
                    setSupplierOptions(options);
                })
                .catch((error) => {
                    console.error('Failed to fetch suppliers:', error);
                }).finally(
                    () => setLoading(false)
                );
        }
    }, [show]);

    const handleFormSubmit = async (data: SupplierFormData) => {
        try {
            setIsSubmitting(true)
            setLoading(true)
            if (!id) {
                console.error('Material ID is undefined');
                return; // Exit early if id is undefined
            }

            const payload = {
                supplier_id: data.supplier_id,
                priority_supplier: data.priority_supplier,
                default_supplier: data.default_supplier,
                buy_price: Number(data.buy_price),
            };
            await createMaterialSuppliers(id, payload);

            // Check if onSubmit is defined before calling it
            if (onSubmit) {
                onSubmit(data); // Call the callback function
            }

            // Reset the form and close the modal
            reset();
            handleClose();
            setIsSubmitting(false);
        } catch (error) {
             setFailedMessage(getErrorMessage(error));
        } finally {
            setLoading(false);
            setIsSubmitting(false);

        }
    };

    const handleFormReset = async (data: SupplierFormData) => {
        try {
            setLoading(true)
            setIsSubmitting(true)
            if (!id) {
                console.error('Material ID is undefined');
                return; // Exit early if id is undefined
            }

            const payload = {
                supplier_id: data.supplier_id,
                priority_supplier: data.priority_supplier,
                default_supplier: data.default_supplier,
                buy_price: Number(data.buy_price),
            };
            await createMaterialSuppliers(id, payload);

            // Check if onSubmit is defined before calling it
            if (onSubmit) {
                onSubmit(data); // Call the callback function
            }
            // Reset the form and close the modal
            reset();
            setIsSubmitting(false);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setLoading(false);
            setIsSubmitting(false);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            {
                loading && <OverlayLoader/>
            }
            <Modal.Header closeButton>
                <h2>Tambah Supplier</h2>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Section Supplier */}
                    <div className="mb-6">
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="supplier_id"
                                    control={control}
                                    rules={{ required: 'Supplier wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Supplier"
                                            options={supplierOptions}
                                            placeholder="Pilih supplier"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <label className="form-label">Skala Prioritas Supplier*</label>
                                <Controller
                                    name="priority_supplier"
                                    control={control}
                                    rules={{ required: 'Skala prioritas wajib dipilih' }}
                                    render={({ field }) => (
                                        <Row>
                                            <Col md={6}>
                                                <Form.Check
                                                    type="radio"
                                                    id="priority-1"
                                                    label="Tinggi"
                                                    value={1}
                                                    checked={field.value === 1}
                                                    onChange={() => field.onChange(1)}
                                                    className="mb-3"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="priority-2"
                                                    label="Sedang"
                                                    value={2}
                                                    checked={field.value === 2}
                                                    onChange={() => field.onChange(2)}
                                                    className="mb-3"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="priority-3"
                                                    label="Rendah"
                                                    value={3}
                                                    checked={field.value === 3}
                                                    onChange={() => field.onChange(3)}
                                                    className="mb-3"
                                                />
                                            </Col>
                                            <Col md={6}>
                                            </Col>
                                        </Row>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={6}>
                                <Controller
                                    name="buy_price"
                                    control={control}
                                    rules={{ required: 'Harga beli wajib diisi' }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Harga Beli"
                                            type="number"
                                            placeholder="0"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12}>
                                <label className="form-label">Set Default Supplier</label>
                                <div className="d-flex gap-4">
                                    <Controller
                                        name="default_supplier"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Check
                                                type="checkbox"
                                                id="default-supplier"
                                                label="Default Supplier"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Tombol */}
                    {failedMessage && (
                        <div className="text-danger mt-3">{failedMessage}</div>
                    )}
                    {/* {successMessage && (
                        <div className="text-success mt-3">{successMessage}</div>
                    )} */}
                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                onClick={handleSubmit(handleFormReset)}
                            >
                                Simpan & Tambah Baru
                            </button>
                            <button
                                onClick={handleSubmit(handleFormSubmit)}
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                disabled={!isValid || isSubmitting}
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