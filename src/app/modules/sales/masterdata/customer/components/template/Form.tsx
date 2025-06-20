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
import { idxIndustries } from "../../../../../procurement/masterdata/suppliers/components/molecules/field/sectorData";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../core/_request";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { Form } from "react-bootstrap";
import { getCompanySelect } from "../../../../../procurement/masterdata/suppliers/core/_request";

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
  // customerId?: string;
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nama Customer wajib diisi")
    .max(255, "Nama Customer maksimal 255 karakter")
    .matches(
      /^[A-Za-z\s]+$/,
      "Nama Customer hanya boleh mengandung huruf dan spasi"
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
    .max(500, "Alamat maksimal 500 karakter"),
  contact_person: Yup.string()
    .required("Nama Contact Person wajib diisi")
    .max(255, "Nama Contact Person maksimal 255 karakter")
    .matches(
      /^[A-Za-z\s]+$/,
      "Nama Contact Person hanya boleh mengandung huruf dan spasi"
    ),
  is_a_company: Yup.boolean().optional(),
  is_company_id: Yup.string().nullable().optional(),
});
const CustomerForm: FC<FormProps> = ({
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
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);

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

      // Ensure the phone number always starts with 62 and cannot be deleted
      if (!formatted.startsWith("62")) {
        formatted = "62" + formatted;
      }

      // Update the phone value in the form
      if (formatted !== phoneValue) {
        setValue("phone", formatted, { shouldValidate: true });
      }
    }
  }, [phoneValue, setValue]);

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      reset({
        ...defaultValues,
        is_a_company: defaultValues.is_a_company || false,
        is_company_id: defaultValues.is_company_id || null,
      });
    }
  }, [mode, defaultValues, reset]);

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
          await createCustomer(confirmData);
        } else if (mode === "edit") {
          if (!id) {
            console.error("id is missing.");
            alert("Supplier ID is missing. Cannot update Supplier.");
            setIsSubmitting(false);
            return;
          }
          await updateCustomer(id, confirmData);
        }
        setIsSuccessModalVisible(true);
        setConfirmData(null);
      } catch (error: unknown) {
        setError(error);
        setIsFailed(true);
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
  const handleCloseFailedModal = () => setIsFailed(false);

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
              />
            </div>
            <div className="col-md-12">
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
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          // No need to set isCompanySelected here
                        }}
                        className="col-md-6"
                      />
                    )}
                  />
                  {watch("is_a_company") && ( // Use watch to determine if the checkbox is checked
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
              {isSubmitting ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Mengirim...
                </span>
              ) : (
                buttonTitle
              )}
            </button>
          </div>
        </div>

        {isFailed && (
          <FailedModal
            closeModal={handleCloseFailedModal}
            error={error}
            confirmLabel={buttonTitle}
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
            isLoading={isSubmitting} // Pass the isSubmitting state as isLoading
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

export default CustomerForm;
