/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap'; // Import Spinner for loading state
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect, useCallback } from 'react';
// import { getActiveSuppliers } from '../../../../materials/components/core/_request';
import { getSingleServiceSupplier, updateServiceSupplier } from '../../core/_request';
import { useParams, useNavigate } from 'react-router-dom';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { getActiveSuppliers } from '../../../../../../inventory/masterdata/materials/components/core/_request';

interface SupplierFormData {
    supplier_id?: string;
    buy_price?: number;
    sell_price?: number;
    default_supplier?: boolean;
    supplier_priority?: number;
    status?: boolean;
    set_default?: boolean;
}

export interface SupplierPayload {
    supplier_id: string;
    buy_price: number;
    sell_price: number;
    supplier_priority: number;
    default_supplier?: boolean;
    status: boolean;
}

interface EditSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id?: string;
    onSuccess?: () => void;
}

export const EditSupplierModal = ({ show, handleClose, supplier_id, onSuccess }: EditSupplierModalProps) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetched, setIsFetched] = useState<boolean>(false); // Track if all data is fetched
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<SupplierFormData>({
        defaultValues: {
            supplier_id: '',
            buy_price: 0,
            sell_price: 0,
            supplier_priority: 3,
            set_default: false,
            status: true,
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
                }
            };

            fetchSuppliers();
        }
    }, [show]);

    useEffect(() => {
        const fetchSupplierData = async () => {
            if (!supplier_id) return;

            try {
                const supplierData = await getSingleServiceSupplier(supplier_id);
                const defaultValues = {
                    supplier_id: supplierData.supplier_id,
                    buy_price: supplierData.buy_price,
                    sell_price: supplierData.sell_price,
                    supplier_priority: supplierData.supplier_priority,
                    set_default: supplierData.default_supplier,
                    status: supplierData.status,
                };
                reset(defaultValues);
                setIsFetched(true);
            } catch (error) {
                setError('Failed to fetch supplier data');
            } finally {
                setLoading(false);
            }
        };

        fetchSupplierData();
    }, [supplier_id, reset]);

    const transformFormDataToPayload = (data: SupplierFormData): SupplierPayload => {
        return {
            supplier_id: data.supplier_id || "",
            buy_price: Number(data.buy_price),
            sell_price: Number(data.sell_price),
            supplier_priority: data.supplier_priority || 3,
            default_supplier: data.set_default || false,
            status: data.status || true,
        };
    };

    const handleFormSubmit = useCallback(async (formData: SupplierFormData) => {
        if (!id || !supplier_id) {
            setSubmitError('ID is required to update a supplier.');
            return;
        }
        try {
            const payload = transformFormDataToPayload(formData);
            await updateServiceSupplier(id, supplier_id, payload);
            reset();
            onSuccess?.();
            handleClose();
            navigate(0);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Failed to update supplier');
            setFailedModalVisible(true);
        }
    }, [id, supplier_id, reset, onSuccess, handleClose, navigate]); // Add handleClose to dependencies

    const handleCloseFailedModal = () => {
        setFailedModalVisible(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Ubah Supplier</h2>
                </Modal.Header>
                <Modal.Body>
                    {loading || !isFetched ? ( // Show loading spinner until all data is fetched
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <div className="text-danger text-center">{error}</div>
                    ) : (
                        <Form onSubmit={handleSubmit(handleFormSubmit)}>
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
                                            render={({ field }) => (
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
                                        <div className="mt-20">
                                            <label className="form-label">Set Default</label>
                                            <div className="d-flex gap-4">
                                                <Controller
                                                    name="set_default"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Form.Check
                                                            type="checkbox"
                                                            id="default-supplier"
                                                            label="Supplier"
                                                            checked={field.value || false}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {submitError && <div className="text-danger">{submitError}</div>}

                            <div className="d-flex mt-4 g-4 justify-content-between">
                                <Button variant="secondary" onClick={handleClose}>
                                    Kembali
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
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal Gagal */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    title='Gagal'
                    message='Supplier gagal diubah.'
                />
            )}
        </>
    );
};