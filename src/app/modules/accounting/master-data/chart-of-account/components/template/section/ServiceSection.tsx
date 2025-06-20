import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form"; // Import Controller
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import axiosInstance from "../../../../../../../../service/axiosInstance";

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

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  control,
  errors,
}) => {
  // Dummy data for categories and brands
  const dummyCategories: Category[] = [
    { id: "1", name: "Kategori 1" },
    { id: "2", name: "Kategori 2" },
    { id: "3", name: "Kategori 3" },
  ];

  const dummyBrands: Brand[] = [
    { id: "1", name: "Brand A" },
    { id: "2", name: "Brand B" },
    { id: "3", name: "Brand C" },
  ];

  const [categories] = useState<Category[]>(dummyCategories);
  const [brands] = useState<Brand[]>(dummyBrands);

  const [coaChoice, setCoaChoice] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/accounting/master-data/coa/select?company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        console.log({ res });
      });
  }, []);

  return (
    <>
      <div className="font-secondary">
        <div className="card p-5 w-100 mb-4">
          <h2 className="mb-6">Chart of Account</h2>
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
              <InputField
                name="nomor_akun"
                label="Nomor Akun"
                control={control}
                placeholder="Masukkan nomor akun"
                errors={errors}
                type="text"
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="brand_id"
                label="Akun Induk"
                control={control}
                placeholder="Pilih akun induk"
                options={brands.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                }))}
                errors={errors}
              />
              {/* <TextareaField
                                name="description"
                                label="Deskripsi"
                                control={control}
                                placeholder="Masukkan deskripsi"
                                errors={errors}
                            /> */}
              <div className="mt-3">
                <label className="form-label mb-3">Set Default</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="uom"
                    value="uom"
                  />
                  <label className="form-check-label text-black" htmlFor="uom">
                    Akun Induk
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-8">
              <SelectField
                name="category"
                label="Tipe"
                control={control}
                placeholder="Pilih tipe"
                options={[
                  { label: "Kredit", value: "Kredit" },
                  { label: "Debit", value: "Debit" },
                ]}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSection;
