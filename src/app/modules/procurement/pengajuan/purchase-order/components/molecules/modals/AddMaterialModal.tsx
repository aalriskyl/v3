import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { createPurchaseOrderMaterial, getSinglePurchaseOrder, getAllMaterialByCompanyId, getSingleMaterialRequestMaterials, getMaterialUomSelect } from '../../../core/_request';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../../../service/axiosInstance';
// 
export interface MaterialFormData {
    material_uom_id: string;
    material_id: string;
    amount: number;
    price: number;
    material_supplier_id: string;
    conversion_material_id: string;
    conversion_material_uom_id: string;
}


interface AxiosError {
    response?: {
        data?: {
            field?: string;
        };
    };
}

interface AddMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    purchaseOrderId: string;
    onSuccess?: () => void;
    supplierId: string;
    materialRequestId: string | null;
}

interface UomOption {
    value: string;
    label: string;
    sellPrice?: number;
}

export const AddMaterialModal = ({ show, handleClose, purchaseOrderId, onSuccess, supplierId }: AddMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [materialsData, setMaterialsData] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string; materialSuppliers?: any[] }[]>([]);
    const [materialRequestId, setMaterialRequestId] = useState<string>('');
    const [conversionMaterialOptions, setConversionMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [conversionUomOptions, setConversionUomOptions] = useState<UomOption[]>([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    

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

    const selectedMaterialId = watch('material_id');
    const selectedUomId = watch('material_uom_id');
    const selectedConversionMaterialId = watch('conversion_material_id');
    const priceFieldUomConversion = watch('conversion_material_uom_id');

    // Disable Material Konversi and Satuan Konversi if Satuan UOM is not selected
    const isConversionDisabled = !selectedUomId;

    // Watch for changes in conversion UOM and set price
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

    // Fetch conversion UOM options
    useEffect(() => {
        const fetchConversionUom = async () => {
            if (selectedConversionMaterialId) {
                try {
                    const response = await getMaterialUomSelect(selectedConversionMaterialId);
                    const uoms = response.uoms.map((uom: any) => ({
                        value: uom.id,
                        label: uom.uom_actual?.name || uom.name,
                        sellPrice: uom.avg_hpp === 0 ? uom.sell_price : uom.avg_hpp
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

    // Fetch purchase order details
    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            if (id) {
                try {
                    const response = await getSinglePurchaseOrder(id);
                    const supplierId = response.data.supplier.id;
                    const materialRequestId = supplierId;

                    if (materialRequestId) {
                        setMaterialRequestId(materialRequestId);
                    }
                    // Fetch materials for conversion dropdown
                    const companyId = response.data.supplier.is_company_id;
                    if (!companyId) {
                        console.error('Company ID is undefined or null');
                        return;
                    }
                    const companyMaterials = await getAllMaterialByCompanyId(companyId);
                    console.log('coba cek', companyMaterials);
                    const conversionOptions = companyMaterials.map((material: any) => ({
                        value: material.id,
                        label: material.name,
                        materialData: material,
                    }));
                    console.log(conversionOptions);
                    setConversionMaterialOptions(conversionOptions);

                } catch (error) {
                    console.error('Failed to fetch purchase order:', error);
                }
            }
        };
        fetchPurchaseOrder();
    }, [id]);

    // Fetch materials
    useEffect(() => {
        const fetchMaterials = async () => {
            if (materialRequestId) {
                try {
                    const response = await getSingleMaterialRequestMaterials(materialRequestId);
                    const materialRequests = response.data.material_requests;
                    const materialIds = materialRequests.map((mr: any) => mr.material.id);

                    const supplierMaterialsResponse = await axiosInstance.get(
                        `/inventory/master-data/material/select-supplier/${supplierId}`
                    );
                    console.log('GELE', supplierMaterialsResponse);
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

    // Fetch UOM options for selected material
    useEffect(() => {
        if (selectedMaterialId) {
            const selectedMaterial = materialsData.find(m => m.id === selectedMaterialId);
            if (selectedMaterial) {
                const uoms = selectedMaterial.material_uom || [];
                console.log(uoms)
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

    // Set material supplier and price based on selected UOM
    useEffect(() => {
        if (selectedUomId && supplierId) {
            const selectedUom = uomOptions.find(uom => uom.value === selectedUomId);
            if (selectedUom && selectedUom.materialSuppliers) {
                const materialSupplier = selectedUom.materialSuppliers.find(
                    (ms: any) => ms.supplier_id === supplierId
                );
                if (materialSupplier) {
                    setValue('material_supplier_id', materialSupplier.id);
                    // setValue('price', materialSupplier.buy_price || 0);
                } else {
                    setValue('material_supplier_id', '');
                    // setValue('price', 0);
                }
            } else {
                setValue('material_supplier_id', '');
                // setValue('price', 0);
            }
        }
    }, [selectedUomId, supplierId, uomOptions, setValue]);


    function isAxiosError(error: unknown): error is AxiosError {
        return (error as AxiosError).response !== undefined;
    }

    // Handle save and new
    const handleSaveAndNew = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                price: Number(data.price),
                amount: Number(data.amount),
                material_supplier_id: data.material_supplier_id,
            };

            await createPurchaseOrderMaterial(purchaseOrderId, payload);
            reset();
            setShowSuccess(true);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.data?.field) {
                    setErrorMessage(error.response.data.field);
                } else {
                    console.error("Failed to create purchase order material:", error);
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle save and close
    const handleSaveAndClose = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                price: Number(data.price),
                amount: Number(data.amount),
                material_supplier_id: data.material_supplier_id,
            };

            await createPurchaseOrderMaterial(purchaseOrderId, payload);
            reset();
            if (onSuccess) onSuccess();
            handleClose();
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.data?.field) {
                    setErrorMessage(error.response.data.field);
                } else {
                    console.error("Failed to create purchase order material:", error);
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
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
                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                )}
                <Form onSubmit={handleSubmit(handleSaveAndClose)}>
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
                                        />
                                    )}
                                />
                            </Col>
                            <Controller
                                name="material_supplier_id"
                                control={control}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
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
                                            disabled={isConversionDisabled} // Disable if Satuan UOM is not selected
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
                                        />
                                    )}
                                />
                                {errors.amount && (
                                    <p className="text-danger mt-2">{errors.amount.message}</p>
                                )}
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
                                            disabled={isConversionDisabled} // Disable if Satuan UOM is not selected
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
                                            {...field}
                                            disabled={true}
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
                                type="button"
                                className="btn text-primary border border-primary px-6 py-2"
                                onClick={handleSubmit(handleSaveAndNew)}
                                disabled={isLoading}
                            >
                                {isLoading ? "Menyimpan..." : "Simpan & Tambah Baru"}
                            </button>
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