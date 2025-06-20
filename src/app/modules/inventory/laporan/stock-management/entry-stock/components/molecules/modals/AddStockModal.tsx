import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { getUomSelect, getMaterialSelect, createMaterialEntryStock, getMaterialUomSelect } from '../../../core/_request';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

interface MaterialFormData {
    material_id: string;
    amount: number | undefined;
    uom_id: string;
    supplier_id: string;
    stock_entry_id: string;
}

interface AddMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: MaterialFormData) => void;
}

export const AddStockModal = ({ show, handleClose, onSubmit }: AddMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Extract `id` from URL parameters

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            material_id: '',
            amount: undefined,
            uom_id: '',
            supplier_id: '',
            stock_entry_id: id, // Set the default value for `stock_entry_id`
        }
    });

    const selectedMaterialId = watch('material_id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const materials = await getMaterialSelect();
                const materialOptions = materials.map((material: { id: string; name: string }) => ({
                    value: material.id,
                    label: material.name,
                }));
                setMaterialOptions(materialOptions); // Update state
            } catch (error) {
                console.error('Error fetching material data:', error);
                setMaterialOptions([]); // Reset options on error
            }
        };

        fetchData();
    }, []); // Remove `id` from dependency array if not needed

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
                    // Optionally set the default UOM value
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

    const handleFormSubmit = async (data: MaterialFormData) => {
        setLoading(true);
        setErrorMessage(null); // Reset error message

        try {
            // Ensure `id` is defined
            if (!id) {
                throw new Error('Stock entry ID is missing.');
            }

            // Construct the payload
            const payload = {
                material_id: data.material_id,
                amount: Number(data.amount),
                material_uom_id: data.uom_id,
                // supplier_id: data.supplier_id, // Assuming supplier_id is part of the form data
            };

            // Send the payload to the API
            const entryId = await createMaterialEntryStock(id, payload); // Use `id` from URL parameters
            console.log('Material entry created with ID:', entryId);

            // Call the onSubmit callback if provided
            onSubmit?.(data);

            // Reset the form and close the modal
            reset();
            handleClose();
            navigate(0); // Refresh the page or navigate as needed
        } catch (error) {
            console.error('Error creating material entry:', error);
            setErrorMessage('Failed to create material entry. Please try again.');
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
                            <button
                                type="submit"
                                className="btn border border-primary px-8 py-2 text-primary"
                                disabled={loading}
                            >
                                Simpan & Tambah Baru
                            </button>
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