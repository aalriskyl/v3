/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../../../../../service/axiosInstance';

interface MaterialFormData {
    material: { id: string; name: string , hpp: string };
    quantity: string;
    uom: { id: string; name: string };
    supplier: { id: string; name: string };
}

export const AddMaterialModal = ({ show, handleClose, onSubmit }: any) => {
    const [loading, setLoading] = useState(true);
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [UOMOptions, setUOMOptions] = useState<{ value: string; label: string }[]>([]);
    const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            material: { id: '', name: '', hpp: ""},
            quantity: '',
            uom: { id: '', name: '' },
            supplier: { id: '', name: '' },
        },
    });

    const selectedMaterialId = watch('material.id');
    const selectedUomId = watch('uom.id');

    // Fetch initial material options
    const fetchMaterialData = async () => {
        try {
            const response = await axiosInstance.get(`/inventory/master-data/material?status`);
            if (response.data.status === 200) {
                const formattedMaterial = response.data.data.materials.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }));
                setMaterialOptions(formattedMaterial);
            }
        } catch (error) {
            console.error('Error fetching materials:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch UOM based on selected material
    const fetchUOMByMaterial = async (materialId: string) => {
        try {
            const response = await axiosInstance.get(`/inventory/master-data/material/uom/select/${materialId}`);
            if (response.data.status === 200) {
                const formattedUOM = response.data.data.uoms.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }));
                setUOMOptions(formattedUOM);
            }
        } catch (error) {
            console.error('Error fetching UOM:', error);
            setUOMOptions([]);
        }
    };

    // Fetch suppliers based on material and UOM
    const fetchSuppliersByMaterialAndUOM = async (uomId: string) => {
        try {
            console.log(uomId)
            const response = await axiosInstance.get(
                `/inventory/master-data/material/supplier/select/${uomId}`
            );
            if (response.data.status === 200) {
                const formattedSupplier = response.data.data.suppliers.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }));
                setSupplierOptions(formattedSupplier);
            }
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            setSupplierOptions([]);
        }
    };

    useEffect(() => {
        fetchMaterialData();
    }, []);

    const fetchHPPMaterial = async (materialID: string) => {
        try {
            const res = await axiosInstance.get(`/inventory/submission/stock-management/stock-history/hpp/${materialID}`)
            return res.data.data.hpp
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if (selectedMaterialId) {
            fetchUOMByMaterial(selectedMaterialId);
            setValue('uom.id', '');
            setValue('supplier.id', '');
        } else {
            setUOMOptions([]);
            setSupplierOptions([]);
        }
    }, [selectedMaterialId]);

    useEffect(() => {
        if (selectedMaterialId && selectedUomId) {
            fetchSuppliersByMaterialAndUOM(selectedUomId);
            setValue('supplier.id', '');
        } else {
            setSupplierOptions([]);
        }
    }, [selectedUomId]);

    const handleFormSubmit = async (data: MaterialFormData) => {
        // Temukan nama dari opsi yang dipilih berdasarkan ID
        const selectedUOM = UOMOptions.find(opt => opt.value === data.uom.id) || { value: '', label: '' };
        const selectedSupplier = supplierOptions.find(opt => opt.value === data.supplier.id) || { value: '', label: '' };
        const selectedMaterial = materialOptions.find(opt => opt.value === data.material.id) || { value: '', label: '' };
        const processedData = {
            ...data,
            quantity: parseInt(data.quantity, 10), // Konversi quantity ke number
            material: {
                id: selectedMaterial.value,
                name: selectedMaterial.label,
                hpp: await fetchHPPMaterial(selectedMaterialId)
             },
            uom: {
                id: selectedUOM.value,
                 name: selectedUOM.label,
             },
            supplier: {
                id: selectedSupplier.value,
                 name: selectedSupplier.label,
             },
        };

        console.log('Form Data Submitted (Processed):', processedData);
        onSubmit(processedData);
        reset();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Tambah Material</h2>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-6">
                    <Row>
                        <Col md={6}>
                            <Controller
                                name="material.id"
                                control={control}
                                rules={{ required: 'Material wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Pilih Material"
                                        options={materialOptions}
                                        placeholder={loading ? "Memuat..." : "Pilih material"}
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="uom.id"
                                control={control}
                                rules={{ required: 'Satuan UOM wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Pilih Satuan UOM"
                                        options={UOMOptions}
                                        placeholder={UOMOptions.length ? "Pilih satuan" : "Pilih material terlebih dahulu"}
                                        control={control}
                                        errors={errors}
                                        disabled={!selectedMaterialId}
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
                                name="quantity"
                                control={control}
                                rules={{
                                    required: 'Jumlah material wajib diisi',
                                    pattern: { value: /^[0-9]*$/, message: 'Hanya angka yang diperbolehkan' },
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Jumlah Material"
                                        type="number"
                                        placeholder="Masukkan jumlah"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="supplier.id"
                                control={control}
                                rules={{ required: 'Supplier wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Supplier"
                                        options={supplierOptions}
                                        placeholder={supplierOptions.length ? "Pilih supplier" : "Pilih UOM terlebih dahulu"}
                                        control={control}
                                        errors={errors}
                                        disabled={!selectedMaterialId || !selectedUomId}
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
                        <Button variant="primary"
                            onClick={handleSubmit(handleFormSubmit)}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};  