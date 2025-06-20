import { Controller } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';

interface SupplierSectionProps {
    control: any;
    errors: any;
    variantMaterialSuppliers: any[];
    handleAddVariantMaterialSupplier: () => void;
    handleRemoveVariantMaterialSupplier: (index: number) => void;
}

export const SupplierSection = ({
    control,
    errors,
    variantMaterialSuppliers,
    handleAddVariantMaterialSupplier,
    handleRemoveVariantMaterialSupplier,
}: SupplierSectionProps) => {
    return (
        <div className="card p-5 w-100 mb-4">
            <h3>Supplier</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Supplier</th>
                        <th>Skema Harga</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th>Prioritas</th>
                        <th>Default Pembelian</th>
                        <th>Default Penjualan</th>
                        <th>Default Supplier</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {variantMaterialSuppliers.length > 0 ? (
                        variantMaterialSuppliers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <SelectField
                                        name={`variant_material_suppliers[${index}].supplier_id`}
                                        label="Supplier"
                                        placeholder="Pilih supplier"
                                        control={control}
                                        errors={errors}
                                    />
                                </td>
                                <td>
                                    <SelectField
                                        name={`variant_material_suppliers[${index}].price_scheme_id`}
                                        label="Skema Harga"
                                        placeholder="Pilih skema harga"
                                        control={control}
                                        errors={errors}
                                    />
                                </td>
                                <td>
                                    <InputField
                                        name={`variant_material_suppliers[${index}].buy_price`}
                                        label="Harga Beli"
                                        control={control}
                                        placeholder="Masukkan harga beli"
                                        errors={errors}
                                        type="number"
                                    />
                                </td>
                                <td>
                                    <InputField
                                        name={`variant_material_suppliers[${index}].sell_price`}
                                        label="Harga Jual"
                                        control={control}
                                        placeholder="Masukkan harga jual"
                                        errors={errors}
                                        type="number"
                                    />
                                </td>
                                <td>
                                    <InputField
                                        name={`variant_material_suppliers[${index}].priority_supplier`}
                                        label="Prioritas"
                                        control={control}
                                        placeholder="Masukkan prioritas"
                                        errors={errors}
                                        type="number"
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`variant_material_suppliers[${index}].variant_default_purchase`}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`variant_default_purchase-${index}`}
                                                    {...field}
                                                />
                                                <label className="form-check-label" htmlFor={`variant_default_purchase-${index}`}>
                                                    Default Pembelian
                                                </label>
                                            </div>
                                        )}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`variant_material_suppliers[${index}].variant_default_sale`}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`variant_default_sale-${index}`}
                                                    {...field}
                                                />
                                                <label className="form-check-label" htmlFor={`variant_default_sale-${index}`}>
                                                    Default Penjualan
                                                </label>
                                            </div>
                                        )}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`variant_material_suppliers[${index}].default_supplier`}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`default_supplier-${index}`}
                                                    {...field}
                                                />
                                                <label className="form-check-label" htmlFor={`default_supplier-${index}`}>
                                                    Default Supplier
                                                </label>
                                            </div>
                                        )}
                                    />
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton-supplier-${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-supplier-${index}`}>
                                            <li>
                                                <button className="dropdown-item" type="button" onClick={() => handleRemoveVariantMaterialSupplier(index)}>
                                                    Hapus
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10} className="text-center">
                                Belum ada data. Silahkan tambah data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                type="button"
                onClick={handleAddVariantMaterialSupplier}
                className="btn border border-primary px-12 py-4 text-primary mx-auto mt-3"
            >
                Tambah Supplier
            </button>
        </div>
    );
};