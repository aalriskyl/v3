import { Modal, Button, Form, Row, Col, FormCheck } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMaterialSelect, getMaterialUomSelect, createMaterialEntryStock } from '../../../../entry-stock/core/_request';

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

export const AddMaterialModal = ({ show, handleClose, onSubmit }: AddMaterialModalProps) => {
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [materialsData, setMaterialsData] = useState<any[]>([]); // Menyimpan data material lengkap
    const [uomOptions, setUomOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [scanMode, setScanMode] = useState(false); // State untuk mode scan
    const [barcodeInput, setBarcodeInput] = useState(''); // State untuk input barcode
    const [scannedMaterial, setScannedMaterial] = useState<{ name: string; uom: string } | null>(null); // State untuk menyimpan info material dan UOM
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, getValues } = useForm<MaterialFormData>({
        defaultValues: {
            material_id: '',
            amount: undefined,
            uom_id: '',
            supplier_id: '',
            stock_entry_id: id,
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
                console.log(materials)
                setMaterialOptions(materialOptions);
                setMaterialsData(materials); // Simpan data material lengkap
            } catch (error) {
                console.error('Error fetching material data:', error);
                setMaterialOptions([]);
                setMaterialsData([]);
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

    const handleBarcodeScan = (value: string) => {
        const barcode = parseInt(value, 10);
        if (isNaN(barcode)) {
            setErrorMessage('Barcode harus berupa angka');
            return;
        }

        console.log(materialsData)
        // Cari material_uom berdasarkan barcode
        let foundMaterialId = '';
        let foundUomId = '';
        let foundMaterialName = '';
        let foundUomName = '';
        for (const material of materialsData) {
            for (const mu of material.material_uom) {
                if (mu.barcode === barcode) {
                    foundMaterialId = material.id;
                    foundUomId = mu.id;
                    foundMaterialName = material.name;
                    foundUomName = mu.uom_actual.name;
                    break;
                }
            }
            if (foundMaterialId) break;
        }

        if (!foundMaterialId || !foundUomId) {
            setErrorMessage('Barcode tidak ditemukan');
            setScannedMaterial(null); // Reset info material dan UOM
            return;
        }

        const currentMaterialId = getValues('material_id');
        const currentUomId = getValues('uom_id');

        // Jika barcode sama, tambah jumlah
        if (currentMaterialId === foundMaterialId && currentUomId === foundUomId) {
            const currentAmount = getValues('amount') || 0;
            setValue('amount', currentAmount + 1);
        } else {
            // Jika berbeda, submit data sebelumnya (jika ada)
            if (currentMaterialId && currentUomId && (getValues('amount') || 0) > 0) {
                handleSubmit(handleFormSubmit)().then(() => {
                    reset();
                    setValue('material_id', foundMaterialId);
                    setValue('uom_id', foundUomId);
                    setValue('amount', 1);
                    setBarcodeInput('');
                    setScannedMaterial({ name: foundMaterialName, uom: foundUomName }); // Set info material dan UOM
                });
            } else {
                // Langsung set data baru
                reset();
                setValue('material_id', foundMaterialId);
                setValue('uom_id', foundUomId);
                setValue('amount', 1);
                setBarcodeInput('');
                setScannedMaterial({ name: foundMaterialName, uom: foundUomName }); // Set info material dan UOM
            }
        }
    };

    const handleFormSubmit = async (data: MaterialFormData) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            if (!id) throw new Error('Stock entry ID is missing.');

            const payload = {
                material_id: data.material_id,
                amount: Number(data.amount),
                material_uom_id: data.uom_id,
            };

            await createMaterialEntryStock(id, payload);
            onSubmit?.(data);
            reset();
            handleClose();
            navigate(0);
        } catch (error) {
            console.error('Error creating material entry:', error);
            setErrorMessage('Gagal menyimpan data. Silakan coba lagi.');
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
                
                {/* Toggle Switch untuk Mode Scan */}
                <div className="mb-4">
                    <FormCheck
                        type="switch"
                        id="scan-mode-switch"
                        label="Mode Scan Barcode"
                        checked={scanMode}
                        onChange={() => setScanMode(!scanMode)}
                    />
                </div>

                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Section Input berdasarkan Mode */}
                    <div className="mb-6">
                        <Row>
                            {scanMode ? (
                                // Mode Scan
                                <>
                                    <Col md={12}>
                                        <Form.Group controlId="barcodeInput">
                                            <Form.Label>Scan Barcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Scan barcode di sini"
                                                value={barcodeInput}
                                                onChange={(e) => {
                                                    setBarcodeInput(e.target.value);
                                                    handleBarcodeScan(e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    {/* Tampilkan info material dan UOM */}
                                    {scannedMaterial && (
                                        <Col md={12} className="mt-3">
                                            <div>
                                                <strong>Material:</strong> {scannedMaterial.name}
                                            </div>
                                            <div>
                                                <strong>UOM:</strong> {scannedMaterial.uom}
                                            </div>
                                        </Col>
                                    )}
                                </>
                            ) : (
                                // Mode Manual
                                <>
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
                                </>
                            )}
                        </Row>
                    </div>

                    {/* Jumlah Stock (tetap muncul di kedua mode) */}
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

                    {/* Tombol Aksi */}
                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Batalkan
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
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