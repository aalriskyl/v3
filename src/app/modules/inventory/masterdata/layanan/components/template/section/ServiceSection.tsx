import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form'; // Import Controller
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
// import { dummyDataService } from '../../organism/table/dummyData';
import SupplierTableLayout from '../SupplierTableLayout';
import { fetchCategories } from '../../core/_request';
import { getBrandByActive } from '../../../../brand/core/_request';

interface ServiceSectionProps {
    control: any;
    errors: any;
}

interface Category {
    id: string;
    name: string;
}

interface Brand {
    id: string;
    name: string;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ control, errors }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategoriesAndBrands = async () => {
            try {
                const [categoriesData, brandsData] = await Promise.all([
                    fetchCategories(),
                    getBrandByActive('')
                ]);

                setCategories(categoriesData || []);
                setBrands(brandsData || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                // Set dummy data for both categories and brands
                setCategories([]);
                setBrands([]); // Set empty array for brands if fetching fails
            } finally {
                setLoading(false);
            }
        };

        getCategoriesAndBrands();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="font-secondary">
                <div className="card p-5 w-100 mb-4">
                    <h2 className='mb-6'>Layanan</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <InputField
                                name="name"
                                label="Nama"
                                control={control}
                                placeholder="Masukkan nama layanan"
                                errors={errors}
                                type="text"
                            />
                        </div>

                        <div className="col-md-6">
                            <SelectField
                                name="category"
                                label="Kategori Produk"
                                control={control}
                                placeholder='Pilih kategori produk'
                                options={categories.map(category => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                name="brand_id"
                                label="Brand"
                                control={control}
                                placeholder="Pilih brand"
                                options={brands.map(brand => ({
                                    value: brand.id,
                                    label: brand.name,
                                }))}
                                errors={errors}
                            />
                            <TextareaField
                                name="description"
                                label="Deskripsi"
                                control={control}
                                placeholder="Masukkan deskripsi"
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6 mb-8">
                            <Controller
                                name="sell_price"
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value && !/^\d*(,\d{0,2})?$/.test(value)) {
                                            return "Harga jual boleh memiliki maksimal 2 angka setelah koma.";
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <InputField
                                        name="sell_price"
                                        label="Harga Jual"
                                        control={control}
                                        placeholder="Masukkan harga jual"
                                        errors={errors}
                                        type="number"
                                        inputMode="decimal"
                                        value={field.value}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            // Allow only numbers and commas, enforce optional two decimal places
                                            const value = e.target.value.replace(/[^0-9,]/g, '');
                                            const regex = /^\d*(,\d{0,2})?$/;
                                            if (value === '' || regex.test(value)) {
                                                field.onChange(value);
                                            }
                                        }}
                                    // error={error?.message} // Pass the error message to the InputField
                                    />
                                )}
                            />
                            {/* <label className="form-label">Set Default</label> */}
                            {/* <div>
                                <Controller
                                    name="default_sale"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="default_sale"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                            <label className="form-label" htmlFor="default_sale">
                                                Penjualan
                                            </label>
                                        </div>
                                    )}
                                />
                                <Controller
                                    name="default_purchase"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="default_purchase"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                            <label className="form-label" htmlFor="default_purchase">
                                                Pembelian
                                            </label>
                                        </div>
                                    )}
                                />
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>

            {/* <SupplierTableLayout /> */}
        </>
    );
};

export default ServiceSection;