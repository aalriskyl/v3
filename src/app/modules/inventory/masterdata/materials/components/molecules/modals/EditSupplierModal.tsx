import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';
import { getSingleMaterialSuppliers, getActiveSuppliers } from '../../core/_request';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

interface SupplierFormData {
    supplier_id: string; // Supplier ID
    priority_supplier: number; // Priority supplier (1, 2, 3, or 4)
    default_supplier: boolean; // Default supplier
    buy_price: number; // Buy price (must be a number)
}

interface EditSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id: string;
}

export const EditSupplierModalMaterial = ({ show, handleClose, supplier_id }: EditSupplierModalProps) => {
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<SupplierFormData | null>(null);
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]); // State for supplier options
    const navigate = useNavigate();
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [submittedData, setSubmittedData] = useState<SupplierFormData | null>(null);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    

    const { control, handleSubmit, formState: { errors }, reset } = useForm<SupplierFormData>({
        defaultValues: {
            supplier_id: '',
            priority_supplier: 1,
            default_supplier: false,
            buy_price: 0,
        }
    });

    // Fetch supplier data when the modal opens
    useEffect(() => {
        if (show && supplier_id) {
            setLoading(true);
            getSingleMaterialSuppliers(supplier_id)
                .then((data) => {
                    setInitialData({
                        supplier_id: data.supplier_id,
                        priority_supplier: data.priority_supplier,
                        default_supplier: data.default_supplier,
                        buy_price: data.buy_price,
                    });
                    reset({
                        supplier_id: data.supplier_id,
                        priority_supplier: data.priority_supplier,
                        default_supplier: data.default_supplier,
                        buy_price: data.buy_price,
                    });
                })
                .catch((error) => {
                    console.error('Failed to fetch supplier data:', error);
                })
                .finally(() => setLoading(false));
        }
    }, [show, supplier_id, reset]);

    // Fetch supplier options for the SelectField
    useEffect(() => {
        if (show) {
            setLoading(true);
            getActiveSuppliers()
                .then((response) => {
                    const options = response.map((supplier: { id: string; name: string }) => ({
                        value: supplier.id,
                        label: supplier.name,
                    }));
                    setSupplierOptions(options);
                })
                .catch((error) => {
                    console.error('Failed to fetch supplier options:', error);
                })
                .finally(() => setLoading(false));
        }
    }, [show]);

    const handleFormSubmit = async (data: SupplierFormData) => {
        setSubmittedData(data); // Store the form data
        setLoading(true);
        try {
            const payload = {
                supplier_id: data.supplier_id,
                priority_supplier: data.priority_supplier,
                default_supplier: data.default_supplier,
                buy_price: Number(data.buy_price), // Ensure it's a number
            };
            await axiosInstance.put(`/inventory/master-data/material/supplier/${supplier_id}`, payload);
            setTimeout(() => {
                setSuccessMessage("Supplier berhasil di update");
            }, 3000);
            setLoading(false);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                {loading && <OverlayLoader />}
                <Modal.Header closeButton>
                    <h2>Ubah Supplier</h2>
                </Modal.Header>
                <Modal.Body>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="supplier_id"
                                    control={control}
                                    rules={{ required: 'Supplier wajib diisi' }}
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
                                        </Row>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col md={6}>
                                <Controller
                                    name="buy_price"
                                    control={control}
                                    rules={{ required: 'Harga beli wajib diisi' }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Harga Beli"
                                            type="number"
                                            placeholder="Masukkan harga beli"
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
                        {failedMessage && (
                            <div className="text-danger mt-3">{failedMessage}</div>
                        )}
                        <div className="d-flex mt-4 justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Kembali
                            </Button>
                            <Button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Menyimpan...' : 'Ubah'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* {isSuccessModalVisible && (
                <SuccessModal 
                closeModal={handleCloseSuccessModal} 
                message=" Data berhasil diubah!" />
            )} */}

            {isFailedModalVisible && (
                <FailedModal 
                closeModal={() => setFailedModalVisible(false)} 
                title='Gagal' 
                message='Supplier gagal diubah.' />
            )}
        </>
    );
};