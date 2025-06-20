import React, { useEffect, useState } from 'react';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import SupplierTableLayout from '../SupplierTableLayout';
import { getActiveUoms } from '../../core/_request';

interface UomSectionProps {
    control: any;
    errors: any;
}

export const UomSection: React.FC<UomSectionProps> = ({ control, errors }) => {
    const [satuanUOMOptions, setSatuanUOMOptions] = useState([]);
    const [satuanKonversiOptions, setSatuanKonversiOptions] = useState([]);

    useEffect(() => {
        const fetchUoms = async () => {
            try {
                const data = await getActiveUoms();
                const uomOptions = data.map((uom: any) => ({
                    value: uom.id, // Assuming `id` is the unique identifier
                    label: `${uom.name}`, // Assuming `name` and `unit` are available
                }));
                setSatuanUOMOptions(uomOptions);

                // Optionally, reuse or customize options for conversion
                setSatuanKonversiOptions(uomOptions);
            } catch (error) {
                console.error('Error fetching UOMs:', error);
            }
        };

        fetchUoms();
    }, []);

    return (
        <>
            <div className="font-secondary">
                <div className="card p-5 w-100 mb-4">
                    <h2 className='mb-6'>UOM</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <SelectField
                                    name="satuan_uom"
                                    label="Satuan UOM"
                                    control={control}
                                    placeholder="Pilih Satuan UOM"
                                    options={satuanUOMOptions}
                                    errors={errors}
                                />
                            </div>

                            <div className="mb-3">
                                <InputField
                                    name="konversi_uom"
                                    label="Nilai Konversi"
                                    control={control}
                                    placeholder="Masukkan nilai konversi"
                                    errors={errors}
                                    type="text"
                                />
                            </div>

                            <div className="mb-3">
                                <InputField
                                    name="sku"
                                    label="SKU"
                                    control={control}
                                    placeholder="Masukkan SKU"
                                    errors={errors}
                                    type="text"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Akses</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="bisa-dijual"
                                            {...control.register('bisa_dijual')}
                                        />
                                        <label className="form-label" htmlFor="bisa-dijual">
                                            Bisa Dijual
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <SelectField
                                    name="satuan_konversi"
                                    label="Satuan Konversi"
                                    control={control}
                                    placeholder="Pilih Satuan Konversi"
                                    options={satuanKonversiOptions}
                                    errors={errors}
                                />
                            </div>

                            <div className="mb-3">
                                <InputField
                                    name="barcode"
                                    label="Barcode"
                                    control={control}
                                    placeholder="Masukkan barcode"
                                    errors={errors}
                                    type="text"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Set Default</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="uom"
                                            value="uom"
                                        />
                                        <label className="form-label" htmlFor="uom">
                                            UOM
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="penjualan"
                                            value="penjualan"
                                        />
                                        <label className="form-label" htmlFor="penjualan">
                                            Penjualan
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="pembelian"
                                            value="pembelian"
                                        />
                                        <label className="form-label" htmlFor="pembelian">
                                            Pembelian
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <SupplierTableLayout /> */}
        </>
    );
};

export default UomSection;
