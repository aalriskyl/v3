import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { getMaterialSelect, getMaterialUomSelect } from '../../../core/_request';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../../../../../../service/axiosInstance';
import { getErrorMessage } from '../../../../../../../../helper/getErrorMessage';

interface MaterialFormData {
    material_id: string;
    amount: number;
    uom_id: string;
    supplier_id: string;
    stock_entry_id: string;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: MaterialFormData) => void;
    supplier_id: string; // Change to string
}

export const EditStockModal = ({ show, handleClose, onSubmit, supplier_id }: EditMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            material_id: '',
            amount: undefined,
            uom_id: '',
            supplier_id: '',
            stock_entry_id: '', // This can be set later
        }
    });

    const selectedMaterialId = watch('material_id');

    // Fetch material options
    useEffect(() => {
        const fetchData = async () => {
            try {
                const materials = await getMaterialSelect();
                const materialOptions = materials.data.map((material: { id: string; name: string }) => ({
                    value: material.id,
                    label: material.name,
                }));
                setMaterialOptions(materialOptions);
            } catch (error) {
                console.error('Error fetching material data:', error);
                setMaterialOptions([]);
            }
        };

        fetchData();
    }, []);

    // Fetch UOM options based on selected material
    useEffect(() => {
        const fetchUomData = async () => {
            if (selectedMaterialId) {
                try {
                    const uomsResponse = await getMaterialUomSelect(selectedMaterialId);
                    const uoms = uomsResponse.map((uom: { id: string; name: string }) => ({
                        value: uom.id,
                        label: uom.name,
                    }));
                    setUomOptions(uoms);
                    if (uoms.length > 0) {
                        setValue('uom_id', uoms[0].value);
                    }
                } catch (error) {
                    console.error('Error fetching UOM data:', error);
                    setUomOptions([]);
                }
            }
        };

        fetchUomData();
    }, [selectedMaterialId]);

    // Fetch existing material entry data when the modal is opened
    useEffect(() => {
        const fetchMaterialEntry = async () => {
            setLoading(true);
            if (show && supplier_id) {
                try {
                    const response = await axiosInstance.get(`/inventory/submission/stock-management/stock-entry/stock-entry-material/${supplier_id}`);
                    const materialEntry = response.data.data;
                    console.log('Material entry:', materialEntry);
                    reset({
                        material_id: materialEntry.material_id,
                        amount: materialEntry.amount,
                        uom_id: materialEntry.uom_id,
                        supplier_id: materialEntry.supplier_id,
                        stock_entry_id: supplier_id,
                    });
                } catch (error) {
                    console.error('Error fetching material entry data:', error);
                    setErrorMessage('Failed to load material entry data.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMaterialEntry();
    }, [show, supplier_id, reset]);

    // Handle form submission
    const handleFormSubmit = async (data: MaterialFormData) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            if (!supplier_id) throw new Error('Material entry ID missing.');

            const payload = {
                material_id: data.material_id,
                amount: Number(data.amount),
                material_uom_id: data.uom_id,
                supplier_id: data.supplier_id,
            };

            await axiosInstance.put(`/inventory/submission/stock-management/stock-entry/stock-entry-material/${supplier_id}`, payload);
            onSubmit?.(data);
            reset();
            handleClose();
            navigate(0); // Refresh or navigate as needed
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Material</h2>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
                                    name="amount"
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
                            {/* <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                disabled={loading}
                            >
                                Simpan & Tambah Baru
                            </button> */}
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};