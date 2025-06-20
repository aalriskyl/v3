import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { updatePurchaseOrderMaterial, getSinglePurchaseOrder, getAllMaterialByCompanyId, getSingleMaterialRequestMaterials, getMaterialUomSelect, getSingleMaterialRequestMaterial } from '../../../core/_request';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../../../service/axiosInstance';

export interface MaterialFormData {
    material_uom_id: string;
    material_id: string;
    amount: number;
    price: number;
    material_supplier_id: string;
    conversion_material_id: string; // Add this line
    conversion_material_uom_id: string;
}

interface EditMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    purchaseOrderId: any;
    onSuccess?: () => void;
    // refetch: ()=> void;
}

interface UomOption {
    value: string;
    label: string;
    sellPrice?: number; // Add this line
}

export const EditMaterialModalWarehouse = ({ show, handleClose, purchaseOrderId, onSuccess }: EditMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [materialsData, setMaterialsData] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string; materialSuppliers?: any[] }[]>([]);
    const [supplierId, setSupplierId] = useState<string>('');
    const [materialRequestId, setMaterialRequestId] = useState<string>('');
    const [materials, setMaterials] = useState([]);
    const [conversionMaterialOptions, setConversionMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [conversionUomOptions, setConversionUomOptions] = useState<UomOption[]>([]);
    const navigate = useNavigate();
    const [sellPriceOptions, setSellPriceOptions] = useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            material_uom_id: '',
            amount: 0,
            material_id: '',
            price: 0,
            material_supplier_id: '',
            conversion_material_id: '',
            conversion_material_uom_id: '',
        }
    });

    //edit
    useEffect(() => {
        const fetchMaterialData = async () => {
            if (show && purchaseOrderId) {
                try {
                    const response = await getSingleMaterialRequestMaterial(purchaseOrderId);
                    const materialData = response.data;

                    // Reset form with fetched data
                    reset({
                        material_id: materialData.material.id, // Correctly accessing material ID
                        material_uom_id: materialData.material_uom.id, // Correctly accessing UOM ID
                        material_supplier_id: materialData.material_supplier.id, // Correctly accessing supplier ID
                        conversion_material_id: materialData.conversion_material_id, // Correctly accessing conversion material ID
                        conversion_material_uom_id: materialData.conversion_material_uom_id, // Correctly accessing conversion UOM ID
                        amount: materialData.amount, // Correctly accessing amount
                        price: materialData.price, // Correctly accessing price
                    });
                } catch (error) {
                    console.error('Failed to fetch material data:', error);
                }
            }
        };
        if (show) {
            fetchMaterialData();
        }
    }, [show, purchaseOrderId, reset]);

    const selectedMaterialId = watch('material_id');
    const selectedUomId = watch('material_uom_id');
    const selectedConversionMaterialId = watch('conversion_material_id');
    const priceFieldUomConversion = watch('conversion_material_uom_id');

    // Add this useEffect to watch conversion UOM selection
    useEffect(() => {
        const selectedConversionUom = conversionUomOptions.find(
            uom => uom.value === priceFieldUomConversion
        );

        if (selectedConversionUom?.sellPrice !== undefined) {
            setValue('price', selectedConversionUom.sellPrice);
        } else {
            setValue('price', 0); // Set to 0 if sellPrice is undefined
        }
    }, [priceFieldUomConversion, conversionUomOptions, setValue]);

    // Update the conversion UOM fetch to include sell price
    useEffect(() => {
        const fetchConversionUom = async () => {
            if (selectedConversionMaterialId) {
                try {
                    const response = await getMaterialUomSelect(selectedConversionMaterialId);
                    const uoms = response.uoms.map((uom: any) => ({
                        value: uom.id,
                        label: uom.uom_actual?.name || uom.name,
                        sellPrice: uom.sell_price
                    }));
                    setConversionUomOptions(uoms);
                } catch (error) {
                    console.error("Failed to fetch conversion UOM:", error);
                    setConversionUomOptions([]);
                }
            } else {
                setConversionUomOptions([]);
            }
        };

        fetchConversionUom();
    }, [selectedConversionMaterialId]);

    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            if (id) {
                try {
                    const response = await getSinglePurchaseOrder(id);
                    // console.log('Fetched purchase order:', response.data);
                    const supplierId = response.data.supplier.id;
                    // const materialRequestId = response.data.material_request.id;
                    setSupplierId(supplierId);

                    // if (materialRequestId) {
                    //     setMaterialRequestId(materialRequestId);
                    // }
                    // Fetch materials for conversion dropdown
                    const companyId = response.data.supplier.is_company_id;
                    if (!companyId) {
                        console.error('Company ID is undefined or null');
                        return;
                    }
                    const companyMaterials = await getAllMaterialByCompanyId(companyId);
                    // console.log('test', companyMaterials);
                    const conversionOptions = companyMaterials.map((material: any) => ({
                        value: material.id,
                        label: material.name,
                        materialData: material,
                    }));
                    setConversionMaterialOptions(conversionOptions);

                } catch (error) {
                    console.error('Failed to fetch purchase order:', error);
                }
            }
        };
        fetchPurchaseOrder();
    }, [id]);
    useEffect(() => {
        const fetchPurchaseOrderForMaterialRequest = async () => {
            if (id) {
                try {
                    const response = await getSinglePurchaseOrder(id);
                    console.log('Fetched purchase order for material request:', response.data);

                    // Set materialRequestId from the response
                    const materialRequestId = response.data.material_request.id;
                    setMaterialRequestId(materialRequestId);

                } catch (error) {
                    console.error('Failed to fetch purchase order for material request:', error);
                }
            }
        };
        fetchPurchaseOrderForMaterialRequest();
    }, [id]);

    useEffect(() => {
        const fetchMaterials = async () => {
            if (materialRequestId) {
                try {
                    // Fetch material request materials
                    const response = await getSingleMaterialRequestMaterials(materialRequestId);
                    const materialRequests = response.data.material_requests;
                    const materialIds = materialRequests.map((mr: any) => mr.material.id);

                    // Re-fetch materials using supplier-specific endpoint to get correct UOMs
                    const supplierMaterialsResponse = await axiosInstance.get(
                        `/inventory/master-data/material/select-supplier/${supplierId}?materialIds=${materialIds.join(',')}`
                    );
                    const materials = supplierMaterialsResponse.data.data;

                    setMaterialsData(materials);
                    const options = materials.map((material: any) => ({
                        value: material.id,
                        label: material.name,
                        materialData: material,
                    }));
                    setMaterialOptions(options);
                } catch (error) {
                    console.error("Failed to fetch material request materials:", error);
                    setMaterialOptions([]);
                }
            } else if (supplierId) {
                // Existing supplier fetch logic
                try {
                    const response = await axiosInstance.get(
                        `/inventory/master-data/material/select-supplier/${supplierId}`
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
                }
            }
        };
        fetchMaterials();
    }, [supplierId, materialRequestId]);

    useEffect(() => {
        if (selectedMaterialId) {
            const selectedMaterial = materialsData.find(m => m.id === selectedMaterialId);
            if (selectedMaterial) {
                const uoms = selectedMaterial.material_uom || [];
                const options = uoms.map((uom: any) => ({
                    value: uom.id,
                    label: uom.uom_actual?.name || uom.name,
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

    useEffect(() => {
        if (selectedUomId && supplierId) {
            const selectedUom = uomOptions.find(uom => uom.value === selectedUomId);
            if (selectedUom && selectedUom.materialSuppliers) {
                const materialSupplier = selectedUom.materialSuppliers.find(
                    (ms: any) => ms.supplier_id === supplierId
                );
                if (materialSupplier) {
                    setValue('material_supplier_id', materialSupplier.id); // Set material_supplier_id
                    setValue('price', materialSupplier.buy_price || 0);
                } else {
                    setValue('material_supplier_id', ''); // Ensure this is set to an empty string if no supplier is found
                    setValue('price', 0);
                }
            } else {
                setValue('material_supplier_id', ''); // Ensure this is set to an empty string if no materialSuppliers are found
                setValue('price', 0);
            }
        }
    }, [selectedUomId, supplierId, uomOptions, setValue]);

    const handleFormSubmit = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                price: Number(data.price),
                amount: Number(data.amount),

                material_supplier_id: data.material_supplier_id,
                conversion_material_id: data.conversion_material_id,
                conversion_material_uom_id: data.conversion_material_uom_id
            };
            await updatePurchaseOrderMaterial(purchaseOrderId, payload);
            handleClose();
            reset();
            if (onSuccess) onSuccess();
            navigate(0)
        } catch (error) {
            console.error("Failed to create purchase order material:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Material</h2>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="mb-2">
                        <Controller
                            name="material_supplier_id"
                            control={control}
                            render={({ field }) => <input type="hidden" {...field} />}
                        />
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="material_id"
                                    control={control}
                                    rules={{ required: 'Material wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Material"
                                            options={materialOptions}
                                            placeholder="Pilih material"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                            disabled={!!materialRequestId}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Controller
                                    name="conversion_material_id"
                                    control={control}
                                    rules={{ required: 'Material konversi wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Material Konversi"
                                            options={conversionMaterialOptions}
                                            placeholder="Pilih konversi material"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                    </div>
                    <div className="mb-6">
                        <Row>
                            <Col md={6}>
                                <Controller
                                    name="material_uom_id"
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
                                            disabled={!!materialRequestId}
                                        />
                                    )}
                                />

                                <Controller
                                    name="amount"
                                    control={control}
                                    rules={{
                                        required: 'Jumlah wajib diisi',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Hanya angka yang diperbolehkan'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Jumlah"
                                            type="number"
                                            placeholder="Masukkan jumlah"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                            disabled={!!materialRequestId}
                                        />
                                    )}
                                />

                            </Col>

                            <Col md={6}>
                                <Controller
                                    name="conversion_material_uom_id"
                                    control={control}
                                    rules={{ required: 'Satuan UOM wajib dipilih' }}
                                    render={({ field }) => (
                                        <SelectField
                                            label="Satuan Konversi"
                                            options={conversionUomOptions}
                                            placeholder="Pilih satuan konversi UOM"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                            
                                        />
                                    )}
                                />
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{
                                        required: 'Harga wajib diisi',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Hanya angka yang diperbolehkan'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Harga"
                                            type="number"
                                            placeholder="Masukkan harga"
                                            control={control}
                                            errors={errors}
                                            disabled={true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Batalkan
                        </Button>
                        <div className="d-flex gap-4">
                            
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Menyimpan..." : "Simpan"}
                            </button>

                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};