import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect, useCallback } from 'react';
import { getActiveSuppliers } from '../../../../../../inventory/masterdata/materials/components/core/_request';
import { createServiceSupplier } from '../../core/_request';
import { useParams } from 'react-router-dom';

interface SupplierFormData {
    supplier_id?: string;
    buy_price: number;
    default_supplier?: boolean;
    supplier_priority?: number;
    status?: boolean;
    set_default?: string[];
}

interface AddSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: SupplierFormData) => void;
    supplier_id?: string;
}

export const AddSupplierModal = ({ show, handleClose, onSubmit }: AddSupplierModalProps) => {
    const { id } = useParams<{ id: string }>();
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [keepModalOpen, setKeepModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<SupplierFormData>({
        defaultValues: {
            supplier_id: '',
            buy_price: 0,
            default_supplier: false,
            supplier_priority: undefined,
            status: true,
            set_default: [],
        },
    });

    useEffect(() => {
        if (show) {
            const fetchSuppliers = async () => {
                setLoading(true);
                setError(null);
                try {
                    const suppliers = await getActiveSuppliers();
                    const options = suppliers.map((supplier: any) => ({
                        value: supplier.id,
                        label: supplier.name,
                    }));
                    setSupplierOptions(options);
                } catch (err) {
                    setError('Failed to load suppliers');
                } finally {
                    setLoading(false);
                }
            };

            fetchSuppliers();
        }
    }, [show]);

    const handleFormSubmit = useCallback(async (data: SupplierFormData, keepOpen: boolean = false) => {
        if (!id) {
            setSubmitError('ID is required to create a supplier.');
            return;
        }

        const payload = {
            buy_price: parseFloat(data.buy_price as any),
            default_supplier: data.set_default?.includes("Supplier") || false,
            supplier_priority: data.supplier_priority,
            supplier_id: data.supplier_id || '',
            status: true,
        };

        try {
            const newSupplier = await createServiceSupplier(id, payload); // Assuming this returns the created supplier
            setSuccessMessage('Supplier created successfully!');
            reset();
            setKeepModalOpen(keepOpen);
            if (!keepOpen) {
                handleClose();
            }
            if (onSubmit) onSubmit(newSupplier); // Pass the new supplier data to the onSubmit callback
        } catch (error: any) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.field && errorData.message) {
                    setErrorMessage(`${errorData.field}: ${errorData.message}`);
                } else {
                    setErrorMessage('Terjadi kesalahan pada server.');
                }
            } else {
                setErrorMessage('Gagal mengirim data.');
            }
            // setIs(false);
        } finally {
            setLoading(false);
        }
    }, [id, reset, handleClose, onSubmit]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Tambah Supplier</h2>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div>Loading suppliers...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <Form onSubmit={handleSubmit((data) => handleFormSubmit(data, keepModalOpen))}>
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
                                    <Controller
                                        name="buy_price"
                                        control={control}
                                        rules={{
                                            validate: (value) => {
                                                if (value && !/^\d*(\.\d{0,2})?$/.test(`${value}`)) {
                                                    return "Harga beli boleh memiliki maksimal 2 angka setelah koma. dan harap menggunakan '.' untuk koma";
                                                }
                                                return true;
                                            }
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputField
                                                name="buy_price"
                                                label="Harga Beli"
                                                control={control}
                                                placeholder="Masukkan harga beli"
                                                errors={errors}
                                                type="text" // Use type="text" to avoid browser validation
                                                inputMode="decimal" // Show numeric keyboard on mobile devices
                                                value={field.value || ""} // Ensure value is always defined
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const value = e.target.value;
                                                    const regex = /^\d*(\.\d{0,2})?$/; // Validate up to 2 decimal places
                                                    if (value === "" || regex.test(value)) {
                                                        field.onChange(value); // Update the field value
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Col>

                                <Col>
                                    <label className="form-label">Skala Prioritas Supplier</label>
                                    <Controller
                                        name="supplier_priority"
                                        control={control}
                                        rules={{ required: 'Skala prioritas wajib dipilih *' }}
                                        render={({ field }) => (
                                            <Row>
                                                <Col md={3}>
                                                    <Form.Check
                                                        type="radio"
                                                        id="priority-high"
                                                        label="Tinggi"
                                                        value={1}
                                                        checked={field.value === 1}
                                                        onChange={() => field.onChange(1)}
                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Check
                                                        type="radio"
                                                        id="priority-medium"
                                                        label="Sedang"
                                                        value={2}
                                                        checked={field.value === 2}
                                                        onChange={() => field.onChange(2)}
                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Check
                                                        type="radio"
                                                        id="priority-low"
                                                        label="Rendah"
                                                        value={3}
                                                        checked={field.value === 3}
                                                        onChange={() => field.onChange(3)}
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                    />
                                    {/* Move the "Set Default" section here */}
                                    {/* <div className="mt-20">
                                        <label className="form-label">Set Default</label>
                                        <div className="d-flex gap-4">
                                            <Controller
                                                name="set_default"
                                                control={control}
                                                render={({ field }) => {
                                                    const selectedValues = field.value || [];
                                                    return (
                                                        <>
                                                            <Form.Check
                                                                type="checkbox"
                                                                id="default-supplier"
                                                                label="Supplier"
                                                                checked={selectedValues.includes("Supplier")}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.checked
                                                                        ? [...selectedValues, "Supplier"]
                                                                        : selectedValues.filter((value) => value !== "Supplier");
                                                                    field.onChange(newValue);
                                                                }}
                                                            />
                                                        </>
                                                    );
                                                }}
                                            />
                                        </div>  
                                    </div> */}
                                </Col>
                            </Row>
                        </div>

                        {submitError && <div className="text-danger">{submitError}</div>}
                        {successMessage && <div className="text-success">{successMessage}</div>}

                        <div className="d-flex mt-4 g-4 justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Kembali
                            </Button>
                            <div className="d-flex gap-4">
                                <button
                                    type="button"
                                    className="btn border border-primary px-8 py-2 text-primary"
                                    onClick={handleSubmit((data) => handleFormSubmit(data, true))}
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
                )}
            </Modal.Body>
        </Modal>
    );
};