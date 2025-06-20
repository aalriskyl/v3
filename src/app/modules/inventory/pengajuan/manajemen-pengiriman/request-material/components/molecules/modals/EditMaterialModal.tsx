import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../../../../../../service/axiosInstance';

interface MaterialFormData {
    material_id: string;
    amount: number;
    uom_id: string;
    supplier_id: string;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit: (data: any) => void; // onSubmit is the refetchData function
    supplier_id: string;
    material_request_id?: any;
    materialId?: any; // Add materialId to the props
}

export const EditMaterialModal = ({ show, handleClose, onSubmit, supplier_id, material_request_id, materialId }: EditMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [materialsData, setMaterialsData] = useState<any[]>([]);
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string; materialSuppliers?: any }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState<MaterialFormData>({
        material_id: '',
        amount: 0,
        uom_id: '',
        supplier_id: '',
    });

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues,
    });

    const selectedMaterialId = watch('material_id');
    const selectedUomId = watch('uom_id');

    // Fetch material details based on materialId
    useEffect(() => {
        const fetchMaterialDetails = async () => {
            if (materialId) {
                setIsLoading(true); // Start loading
                try {
                    const response = await axiosInstance.get(
                        `/inventory/submission/delivery-management/material-request/material-request-material/${materialId}`
                    );
                    const materialDetails = response.data.data;

                    // Set default values
                    setDefaultValues({
                        material_id: materialDetails.material_id,
                        amount: materialDetails.amount,
                        uom_id: materialDetails.material_uom_id,
                        supplier_id: materialDetails.material_supplier_id,
                    });

                    // Reset the form with the fetched values
                    reset({
                        material_id: materialDetails.material_id,
                        amount: materialDetails.amount,
                        uom_id: materialDetails.material_uom_id,
                        supplier_id: materialDetails.material_supplier_id,
                    });
                } catch (error) {
                    console.error("Failed to fetch material details:", error);
                } finally {
                    setIsLoading(false); // End loading
                }
            }
        };

        if (show) {
            fetchMaterialDetails();
        }
    }, [materialId, show, reset]);

    // Fetch materials based on supplier ID
    useEffect(() => {
        const fetchMaterials = async () => {
            if (supplier_id) {
                setIsLoading(true); // Start loading
                try {
                    const response = await axiosInstance.get(
                        `/inventory/master-data/material/select-supplier/${supplier_id}`
                    );
                    const materials = response.data.data;
                    setMaterialsData(materials);
                    const options = materials.map((material: any) => ({
                        value: material.id,
                        label: material.name,
                        materialData: material,
                    }));
                    setMaterialOptions(options);
                } catch (error) {
                    console.error("Failed to fetch materials:", error);
                    setMaterialOptions([]);
                } finally {
                    setIsLoading(false); // End loading
                }
            }
        };
        fetchMaterials();
    }, [supplier_id]);

    // Fetch UOM options based on selected material
    useEffect(() => {
        if (selectedMaterialId) {
            const selectedMaterial = materialsData.find(m => m.id === selectedMaterialId);
            if (selectedMaterial) {
                const uoms = selectedMaterial.material_uom || [];
                const options = uoms.map((uom: any) => ({
                    value: uom.id,
                    label: uom.uom_actual.name,
                    materialSuppliers: uom.material_suppliers,
                }));
                setUomOptions(options);
            } else {
                setUomOptions([]);
            }
        } else {
            setUomOptions([]);
        }
    }, [selectedMaterialId, materialsData]);

    // Set supplier ID and price based on selected UOM
    useEffect(() => {
        if (selectedUomId && supplier_id) {
            const selectedUom = uomOptions.find(uom => uom.value === selectedUomId);
            if (selectedUom && selectedUom.materialSuppliers) {
                const materialSupplier = selectedUom.materialSuppliers.find(
                    (ms: any) => ms.supplier.id === supplier_id
                );
                if (materialSupplier) {
                    setValue('supplier_id', materialSupplier.id);
                    setValue('amount', materialSupplier.amount || 0);
                } else {
                    setValue('supplier_id', '');
                    setValue('amount', 0);
                }
            }
        } else {
            setValue('supplier_id', '');
            setValue('amount', 0);
        }
    }, [selectedUomId, supplier_id, uomOptions, setValue]);

    // Handle form submission
    const handleFormSubmit = async (data: MaterialFormData) => {
        setIsLoading(true); // Start loading
        try {
            const payload = {
                material_request_id: material_request_id,
                material_id: data.material_id,
                material_uom_id: data.uom_id,
                amount: Number(data.amount),
                material_supplier_id: data.supplier_id,
            };

            console.log('Payload:', payload); // Debug the payload

            const response = await axiosInstance.put(
                `/inventory/submission/delivery-management/material-request/material-request-material/${materialId}`,
                payload
            );

            const processedData = {
                ...response.data.data,
                material: {
                    id: data.material_id,
                    name: materialOptions.find(opt => opt.value === data.material_id)?.label || '',
                },
                uom: {
                    id: data.uom_id,
                    name: uomOptions.find(opt => opt.value === data.uom_id)?.label || '',
                }
            };

            onSubmit(processedData); // Call the onSubmit function (refetchData)
            reset();
            handleClose();
        } catch (error) {
            console.error('Failed to submit form:', error);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Material</h2>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
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
                                                disabled={!selectedMaterialId || isLoading} // Disable if loading
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>
                        </div>

                        {/* Section Quantity */}
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

                        {/* Buttons */}
                        <div className="d-flex mt-4 g-4 justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Batalkan
                            </Button>
                            <div className="d-flex gap-4">
                                <button
                                    type="button"
                                    className="btn btn-primary border border-primary px-16 py-2"
                                    onClick={handleSubmit(handleFormSubmit)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};