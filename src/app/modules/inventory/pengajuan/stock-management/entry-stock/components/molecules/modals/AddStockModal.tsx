/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Row, Col, FormCheck, InputGroup } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect, useCallback } from 'react';
import { getMaterialSelect, createMaterialEntryStock, getMaterialUomSelect, getMaterialUomByBarcode } from '../../../core/_request';
import { useParams } from 'react-router-dom';
import { getErrorMessage } from '../../../../../../../../helper/getErrorMessage';

interface MaterialFormData {
    material_id: string;
    amount: number;
    uom_id: string;
    // supplier_id: string;
    stock_entry_id: string;
}


interface MaterialData {
    material: {
        id: any,
        name: any
    };
    amount: number;
    material_uom: {
        uom_actual: {
            id: any,
            name: any
        }
    }, 
    // supplier_id: any;
    stock_entry_id: any;
}


export const AddStockModal = (
    { 
        show, 
        handleClose, 
        onAddMaterial,
        materialData,
        setMaterialData
    }: any) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string>('');
    const [lastScannedBarcode, setLastScannedBarcode] = useState<string | null>(null);
    const [isScanActive, setIsScanActive] = useState(false); // Mode scan aktif/manual
    const { id } = useParams<{ id: string }>();
    const [pendingUomId, setPendingUomId] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, getValues } = useForm<MaterialFormData>({
        defaultValues: {
            material_id: '',
            amount: 0,
            uom_id: '',
            // supplier_id: '',
            stock_entry_id: id,
        }
    });

    const selectedMaterialId = watch('material_id');
    const currentAmount = watch('amount');

    // Fungsi debounce untuk menunda request API
    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

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

                    // Jika ada pending UOM ID, cek apakah ada di opsi
                    if (pendingUomId) {
                        const exists = uoms.some((uom: any) => uom.value === pendingUomId);
                        if (exists) {
                            setValue('uom_id', pendingUomId);
                            setPendingUomId(null); // Hapus pending setelah di-set
                        } else {
                            setErrorMessage('UOM dari barcode tidak tersedia untuk material ini.');
                            setPendingUomId(null);
                        }
                    } else {
                        // Default ke opsi pertama jika tidak ada pending
                        if (uoms.length > 0) {
                            setValue('uom_id', uoms[0].value);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching UOM data:', error);
                    setUomOptions([]);
                    if (pendingUomId) {
                        setErrorMessage('Gagal memuat UOM untuk material ini.');
                        setPendingUomId(null);
                    }
                }
            }
        };

        fetchUomData();
    }, [selectedMaterialId]); // Fetch saat material_id berubah

    useEffect(() => {
        // Handle pending UOM ID saat opsi UOM sudah tersedia (misal: material sudah dipilih sebelumnya)
        if (pendingUomId && uomOptions.length > 0) {
            const exists = uomOptions.some(uom => uom.value === pendingUomId);
            if (exists) {
                setValue('uom_id', pendingUomId);
                setPendingUomId(null);
            } else {
                setErrorMessage('UOM dari barcode tidak ditemukan dalam opsi yang tersedia.');
                setPendingUomId(null);
            }
        }
    }, [pendingUomId, uomOptions]); // Cek saat pendingUomId atau opsi UOM berubah

    // Fetch barcode data dengan debounce agar tidak spam request
    const fetchBarcodeData = useCallback(
        debounce(async (barcodeValue: string) => {
            if (barcodeValue && isScanActive) {
                try {
                    const response = await getMaterialUomByBarcode(barcodeValue);

                    if (response) {
                        const material_id = response.material_id;
                        const uom_actual_id = response.id;

                        // jika response.id ada sama pada materialdata.uom_actual.uom.id maka
                        // ambil value dari response.id
                        const findDuplikatMaterial = materialData.find((item: any) => item.material_uom.uom_actual.id === response.id && true )


                        if (lastScannedBarcode === barcodeValue) {
                            // Jika barcode sama, tambahkan jumlahnya
                            setValue('amount', getValues('amount') + 1);
                        } else {
                            // Jika barcode berbeda, simpan data sebelumnya & pindah ke material baru
                            if (lastScannedBarcode) {
                                await handleFormSubmit(getValues(), true);
                            }
                            // Atur nilai baru
                            setValue('material_id', material_id);
                            setPendingUomId(uom_actual_id); // Simpan UOM ID yang diharapkan dari barcode
                            setValue('uom_id', uom_actual_id);
                            if(
                                materialData.find((item: any) => item.material_uom.uom_actual.id === response.id && true ) 
                            ){
                                setValue('amount', findDuplikatMaterial.amount  + 1);
                            }else{
                                setValue('amount', 1);
                            }
                            setLastScannedBarcode(barcodeValue);
                        }

                        setErrorMessage(null);
                    } else {
                        throw new Error("Invalid response data");
                    }
                } catch (error) {
                    console.error('Error fetching barcode data:', error);
                    setErrorMessage('Failed to fetch barcode data. Please try again.');
                } finally {
                    setBarcode('');
                }
            }
        }, 500), // Delay 500ms sebelum request dikirim
        [isScanActive, lastScannedBarcode, setValue]
    );
    useEffect(() => {
        if (barcode) {
            fetchBarcodeData(barcode);
        }
    }, [barcode]);

    const handleFormSubmit = async (data: any, keepOpen: boolean = false) => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            if (!id) {
                throw new Error('Stock entry ID is missing.');
            }

            const material = materialOptions.find((item) => item.value === data.material_id);
            const uom = uomOptions.find((item) => item.value === data.uom_id);

            // Cari apakah material dengan UOM yang sama sudah ada di materialData
            const findDuplikatMaterialIndex = materialData.findIndex((item: any) =>
                item.material_uom.uom_actual.id === uom?.value &&
                item.material.id === material?.value
            );

            if (findDuplikatMaterialIndex !== -1) {
                // Jika ditemukan, update amount tanpa menambahkan data baru
                const updatedMaterialData = materialData.map((item: any, index: any) => {
                    if (index === findDuplikatMaterialIndex) {
                        return {
                            ...item,
                            amount: Number(data.amount), // Convert amount to number
                        };
                    }
                    return item;
                });
                setMaterialData(updatedMaterialData); // Update state tanpa duplikasi
            } else {
                // Jika tidak ditemukan, tambahkan data baru
                const dataChoice: MaterialData = {
                    material: {
                        id: material?.value,
                        name: material?.label,
                    },
                    material_uom: {
                        uom_actual: {
                            id: uom?.value,
                            name: uom?.label,
                        },
                    },
                    amount: Number(data.amount), // Convert amount to number
                    // supplier_id: data.supplier_id,
                    stock_entry_id: id,
                };
                setMaterialData([...materialData, dataChoice]); // Tambahkan data baru ke state
            }

            // Convert amount to number and include material_uom_id in the payload
            const payload = {
                ...data,
                amount: Number(data.amount), // Ensure amount is a number
                material_uom_id: uom?.value, // Include material_uom_id
            };

            // Make the API call to create the material entry
            const response = await createMaterialEntryStock(id, payload);
            if (response) {
                setSuccessMessage('Material entry created successfully.');
            } else {
                throw new Error('Failed to create material entry.');
            }

            reset();

            if (!keepOpen) {
                handleClose();
            } else {
                setSuccessMessage('Berhasil ditambahkan');
            }

            onAddMaterial?.();
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
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Toggle Scan Aktif */}
                <Form.Check
                    type="switch"
                    id="scan-toggle"
                    label="Scan Aktif"
                    checked={isScanActive}
                    onChange={(e) => setIsScanActive(e.target.checked)}
                    className="mb-4"
                />

                {/* Input Barcode (Muncul hanya jika scan aktif) */}
                {isScanActive && (
                    <InputGroup className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Scan barcode..."
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </InputGroup>
                )}

                <Form onSubmit={handleSubmit((data) => handleFormSubmit(data, false))}>
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

                    {/* Section Jumlah Stock */}
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
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                disabled={loading}
                                onClick={handleSubmit((data) => handleFormSubmit(data, true))}
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
