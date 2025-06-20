import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { getUomFromMaterialId } from '../../../../../../inventory/masterdata/materials/components/core/_request';
import { createPurchaseOrderMaterial, getSinglePurchaseOrder, getMaterialSelectBySupplier } from '../../../core/_request';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../../../service/axiosInstance';

interface AxiosError {
    response?: {
        data?: {
            field?: string;
        };
    };
}


export interface MaterialFormData {
    material_uom_id: string;
    material_id: string;
    amount: number;
    price: number;
    // barcode?: number;
    material_supplier_id: string; // Added field
}

interface AddMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    purchaseOrderId: string;
    onSuccess?: () => void; // Add this line
    supplierId: string;

}

export const AddMaterialModalSupplier = ({ show, handleClose, purchaseOrderId, onSuccess, supplierId }: AddMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string; materialData?: any }[]>([]);
    const [materialsData, setMaterialsData] = useState<any[]>([]); // Store full materials data
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const [uomOptions, setUomOptions] = useState<{ value: string; label: string; materialSuppliers?: any[] }[]>([]);
    // const [supplierId, setSupplierId] = useState<string>(''); // Store supplier ID from purchase order
    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            material_uom_id: '',
            amount: 0,
            material_id: '',
            price: 0,
            // barcode: 0,
            material_supplier_id: '', // Initialize new field
        }
    });

    const selectedMaterialId = watch('material_id');
    const selectedUomId = watch('material_uom_id');

    // useEffect(() => {
    //     const fetchPurchaseOrder = async () => {
    //         if (supplierId) {
    //             try {
    //                 const response = await getSinglePurchaseOrder(id);
    //                 const supplierId = response.data.supplier.id;
    //                 setSupplierId(supplierId);
    //             } catch (error) {
    //                 console.error('Failed to fetch purchase order:', error);
    //             }
    //         }
    //     };
    //     fetchPurchaseOrder();
    // }, [id]);


    function isAxiosError(error: unknown): error is AxiosError {
        return (error as AxiosError).response !== undefined;
    }

    useEffect(() => {
        if (show) {
            setShowSuccess(false);
            reset();
        }
    }, [show, reset]);  

    useEffect(() => {
        const fetchMaterials = async () => {
            if (supplierId) {
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
    }, [supplierId]);

    // In the UOM fetching useEffect
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

    // In the UOM selection useEffect
    useEffect(() => {
     

        if (selectedUomId && supplierId) {
            const selectedUom = uomOptions.find(uom => uom.value === selectedUomId);

            if (selectedUom && selectedUom.materialSuppliers) {

                const materialSupplier = selectedUom.materialSuppliers.find(
                    (ms: any) => ms.supplier.id === supplierId
                );

                if (materialSupplier) {                   
                    setValue('material_supplier_id', materialSupplier.id);
                    setValue('price', materialSupplier.buy_price || 0);
                } else {
                    console.warn('No Material Supplier found for supplier ID:', supplierId);
                    setValue('material_supplier_id', '');
                    setValue('price', 0);
                }
            }
        } else {
            setValue('material_supplier_id', '');
            setValue('price', 0);
        }
    }, [selectedUomId, supplierId, uomOptions, setValue]);


    const handleSaveAndNew = async (data: MaterialFormData) => {
        setErrorMessage(null);
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
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
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
                    {/* Section Material */}
                    <div className="mb-6">
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
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
                                {/* <Controller
                                    name="barcode"
                                    control={control}
                                    rules={{ required: 'Barcode wajib diisi' }}
                                    render={({ field }) => (
                                        <InputField
                                            label="Barcode"
                                            type="number"
                                            placeholder="Masukkan barcode"
                                            control={control}
                                            errors={errors}
                                            {...field}
                                        />
                                    )}
                                /> */}
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
                                            // disabled={true}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <Controller
                                    name="material_supplier_id"
                                    control={control}
                                    render={({ field }) => <input type="hidden" {...field} />}
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
                                className="btn border border-primary px-8 py-2 text-primary"
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