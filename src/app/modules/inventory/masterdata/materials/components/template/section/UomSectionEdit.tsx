import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import SupplierTableLayout from '../SupplierTableLayout';
// import { dummyDataUom } from '../../organism/table/dummyData';

interface UomSectionEditProps {
    control: any;
    errors: any;
}

export const UomSectionEdit: React.FC<UomSectionEditProps> = ({ control, errors }) => {
    const { id } = useParams<{ id: string }>();
    // const uom = dummyDataUom.find((item) => item.id === parseInt(id || '0'));

    // const { reset } = useForm();

    // useEffect(() => {
    //     if (uom) {
    //         reset({
    //             satuan_uom: uom.satuan_uom,
    //             satuan_konversi: uom.satuan_konversi,
    //             konversi_uom: uom.konversi_uom,
    //             barcode: uom.barcode,
    //             sku: uom.sku,
    //             bisa_dijual: uom.bisa_dijual,
    //         });
    //     }
    // }, [uom, reset]);

    // const satuanUOMOptions = [
    //     { value: 'kg', label: 'Kilogram (kg)' },
    //     { value: 'g', label: 'Gram (g)' },
    //     { value: 'l', label: 'Liter (L)' },
    //     { value: 'm', label: 'Meter (m)' },
    //     { value: 'pcs', label: 'Pieces (pcs)' },
    // ];

    // const satuanKonversiOptions = [
    //     { value: 'mg', label: 'Milligram (mg)' },
    //     { value: 'ml', label: 'Milliliter (ml)' },
    //     { value: 'cm', label: 'Centimeter (cm)' },
    //     { value: 'dozen', label: 'Dozen (12 pcs)' },
    //     { value: 'box', label: 'Box (100 pcs)' },
    // ];

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
                                    // options={satuanUOMOptions}
                                    errors={errors}
                                />
                            </div>

                            <div className="mb-3">
                                <InputField
                                    name="konversi_uom"
                                    label="Konversi UOM"
                                    control={control}
                                    placeholder="Masukkan konversi UOM"
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
                                    // options={satuanKonversiOptions}
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

export default UomSectionEdit;