/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import {
  createSupplier,
  updateSupplier,
  getSupplierById,
  getCompanySelect,
} from "../../core/_request";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { idxIndustries } from "../molecules/field/sectorData";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { Form } from "react-bootstrap";

interface FormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city_id: string;
  industry: string;
  address: string;
  contact_person: string;
  is_a_company?: boolean;
  is_company_id?: string | null;
}

interface City {
  id: string;
  name: string;
  province: string;
}

interface Company {
  id: string;
  name: string;
}

interface FormProps {
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nama supplier wajib diisi")
    .max(255, "Nama supplier maksimal 255 karakter")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Nama supplier hanya boleh mengandung huruf, angka dan spasi"
    ),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi")
    .max(255, "Email maksimal 255 karakter"),
  phone: Yup.string()
    .matches(
      /^62\d{9,11}$/,
      "Nomor Handphone harus dimulai dengan 62 dan memiliki 11-13 digit angka"
    )
    .required("Nomor Handphone wajib diisi"),
  city_id: Yup.string().required("Kota wajib dipilih"),
  industry: Yup.string().required("Industri wajib dipilih"),
  address: Yup.string()
    .required("Alamat wajib diisi")
    .max(255, "Alamat maksimal 255 karakter"),
  contact_person: Yup.string()
    .required("Nama contact person wajib diisi")
    .max(255, "Nama contact person maksimal 255 karakter")
    .matches(
      /^[A-Za-z\s]+$/,
      "Nama contact person hanya boleh mengandung huruf dan spasi"
    ),
  is_a_company: Yup.boolean().optional(),
  is_company_id: Yup.string().nullable().optional(),
});

const SupplierForm: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  headTitle,
  buttonTitle,
  message,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [company, setCompany] = useState<Company[]>([]);
  const [confirmData, setConfirmData] = useState<FormData | null>(null);
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(
    defaultValues?.is_a_company || false
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phone: "62",
      city_id: "",
      industry: "",
      address: "",
      contact_person: "",
      is_a_company: false,
      is_company_id: null,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const phoneValue = watch("phone");

  useEffect(() => {
    if (phoneValue) {
      const cleaned = phoneValue.replace(/[^0-9]/g, "");
      let formatted = cleaned;

      if (cleaned.startsWith("0")) {
        formatted = "62" + cleaned.slice(1);
      } else if (cleaned.startsWith("62")) {
        formatted = cleaned;
      } else if (cleaned) {
        formatted = "62" + cleaned;
      }

      if (!formatted.startsWith("62")) {
        formatted = "62" + formatted;
      }

      if (formatted !== phoneValue) {
        setValue("phone", formatted, { shouldValidate: true });
      }
    }
  }, [phoneValue, setValue]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosInstance.get("/core/city/select");
        setCities(response.data.data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getCompanySelect();
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      }
    };
    fetchCompany();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form Valid", isValid);
    if (!data.is_a_company) {
      data.is_company_id = null;
    }
    setConfirmData(data);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmData) {
      setIsSubmitting(true);
      try {
        if (mode === "create") {
          await createSupplier(confirmData);
        } else if (mode === "edit") {
          if (!id) {
            console.error("id is missing.");
            alert("Supplier ID is missing. Cannot update Supplier.");
            setIsSubmitting(false);
            return;
          }
          await updateSupplier(id, confirmData);
        }
        setIsSuccessModalVisible(true);
        setConfirmData(null);
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData.field && typeof errorData.field === "object") {
            // mengumpulkan semua pesan error dari setiap field
            const errors = Object.entries(errorData.field)
              .map(([key, value]) => `${key}: ${value as string}`)
              .join("\n");
            setErrorMessage(errors);
          } else {
            setErrorMessage(errorData.field);
          }
        } else {
          setErrorMessage("Gagal mengirim data.");
        }
        setIsModalVisible(false);
        setIsFailed(true);
        console.error("Failed to perform Supplier action:", error);
      } finally {
        setIsSubmitting(false);
        setIsModalVisible(false);
      }
    }
  };

  const cityOptions = cities.map((city: City) => ({
    value: city.id,
    label: `${city.name}, ${city.province}`,
  }));

  const companyOptions = company.map((company: Company) => ({
    value: company.id,
    label: company.name,
  }));

  const industryOptions = idxIndustries.map((industry) => ({
    value: industry.name,
    label: industry.name,
  }));

  return (
    <div className="font-secondary">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100">
          <div className="row g-2">
            <h3 className="mb-6">Perusahaan</h3>
            <div className="col-md-6 col-lg-6">
              <InputField
                name="name"
                label="Nama Perusahaan"
                control={control}
                placeholder="Masukkan nama perusahaan"
                errors={errors}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="city_id"
                label="Kota"
                control={control}
                options={cityOptions}
                placeholder="Pilih kota"
                errors={errors}
              />
            </div>
            <div className="col-md-6 row-2">
              <SelectField
                name="industry"
                label="Industri"
                control={control}
                options={industryOptions}
                placeholder="Pilih industri"
                errors={errors}
              />
            </div>
            <div className="col-md-6">
              <TextareaField
                name="address"
                label="Alamat perusahaan"
                control={control}
                placeholder="Masukkan alamat perusahaan"
                errors={errors}
                required={true}
              />
            </div>
            <div className="col-md-12">
              <div className="d-flex align-items-center">
                <Controller
                  name="is_a_company"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      type="checkbox"
                      id="is_company"
                      label="Perusahaan"
                      checked={isCompanySelected} // Use isCompanySelected here
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setIsCompanySelected(e.target.checked);
                      }}
                      className="col-md-6"
                    />
                  )}
                />
                {isCompanySelected && (
                  <div className="col-md-6">
                    <SelectField
                      name="is_company_id"
                      label="Perusahaan"
                      control={control}
                      options={companyOptions}
                      placeholder="Pilih perusahaan"
                      errors={errors}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-4">
          <h3 className="mb-6">Contact Person</h3>
          <div className="row g-2">
            <div className="col-md-6 col-lg-6">
              <InputField
                name="contact_person"
                label="Nama Contact Person"
                control={control}
                placeholder="Masukkan nama contact person"
                errors={errors}
              />
            </div>
            <div className="col-md-6">
              <InputField
                name="email"
                label="Email"
                control={control}
                placeholder="Masukkan email"
                errors={errors}
                type="email"
              />
            </div>
            <div className="col-md-6">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputField
                    name="phone"
                    label="Nomor Handphone"
                    control={control}
                    placeholder="Masukkan nomor handphone"
                    errors={errors}
                    type="tel"
                    onChange={(e: any) => {
                      const cleaned = e.target.value.replace(/[^0-9]/g, "");
                      let newValue = cleaned;
                      if (!cleaned.startsWith("62")) {
                        newValue = "62" + cleaned;
                      }
                      field.onChange(newValue);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : buttonTitle}
            </button>
          </div>
        </div>

        {isFailed && (
          <FailedModal
            closeModal={() => {
              setIsFailed(false);
              setIsModalVisible(false);
            }}
            message={errorMessage}
          />
        )}

        {isModalVisible && (
          <ConfirmModal
            buttonTitle={buttonTitle}
            handleSubmit={handleConfirm}
            closeModal={() => setIsModalVisible(false)}
            headTitle={headTitle}
            confirmButtonLabel={buttonTitle}
            cancelButtonLabel="Kembali"
            message={message}
          />
        )}
        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              navigate(-1);
            }}
            successMessage={successMessage}
          />
        )}
      </form>
    </div>
  );
};

export default SupplierForm;
