import { FC, useState, useRef, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import ImageField from "@metronic/layout/components/form/molecules/ImageField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";
import axiosInstance from "../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import bankOptions from "../../../../../../helper/bankOptions";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

interface CompanyItem {
  company_id: string;
  position_id: string;
  date: string;
}

interface EmployeeFormValues {
  photo: File | null;
  name: string;
  email: string;
  gender: string;
  birth_date: string;
  address_ktp: string;
  address_domicile: string;
  phone: string;
  marital_status: string;
  religion: string;
  last_education: string;
  join_date: string;
  bank: string;
  no_bank: string;
  contract_type: string;
  name_emergency_phone: string;
  emergency_phone: string;
  position_id: string;
  relationship_emergency_phone: string;
  company_employees: CompanyItem[];
}

interface FormProps {
  formTitle?: string;
  submitButtonLabel?: string;
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  mode: "create" | "edit"; // Add mode prop
}

const Form: FC<FormProps> = ({
  headTitle,
  buttonTitle,
  message,
  cancelButtonLabel,
  mode,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const handleConfirmData = useRef<FormData | null>(null);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [companyOptions, setCompanyOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [positionOptions, setPositionOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [originalImagePath, setOriginalImagePath] = useState<string | null>(null);
  const [imageWasRemoved, setImageWasRemoved] = useState(false);
  const [newId, setNewId] = useState<string | null>(null);
  const [successPassword, setSuccessPassword] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL for edit mode
  const navigate = useNavigate();
  const baseUrl = API_BASE_URL;
  const validationSchema = Yup.object().shape({
    photo: Yup.mixed().test(
      "photo-required",
      "Photo is required",
      function (value) {
        // In create mode, photo is required
        if (mode === "create") {
          return !!value;
        }
        // In edit mode, either existingImageUrl or new photo is acceptable
        return true;
      }
    ),
    name: Yup.string()
      .required("Nama wajib diisi")
      .max(255, "Nama maksimal 255 karakter")
      .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf dan spasi"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Jenis Kelamin is required"),
    birth_date: Yup.string().required("Tanggal Lahir is required"),
    address_ktp: Yup.string()
      .required("Alamat KTP wajib diisi")
      .max(255, "Alamat KTP maksimal 255 karakter"),
    address_domicile: Yup.string()
      .required("Alamat Domisili wajib diisi")
      .max(255, "Alamat Domisili maksimal 255 karakter"),
    phone: Yup.string()
      .matches(/^\d{11,13}$/, "Nomor Handphone harus 11 sampai 13 digit angka")
      .required("Nomor Handphone wajib diisi"),
    marital_status: Yup.string().required("Status Pernikahan is required"),
    religion: Yup.string().required("Agama is required"),
    last_education: Yup.string().required("Pendidikan Terakhir is required"),
    bank: Yup.string().required("Bank is required"),
    no_bank: Yup.string()
      .matches(/^[0-9]+$/, "Nomor Akun Bank harus mengandung angka")
      .required("Nomor Akun Bank is required"),
    contract_type: Yup.string().required("Jenis Kontrak is required"),
    name_emergency_phone: Yup.string()
      .required("Nama kontak darurat wajib diisi")
      .max(255, "Nama kontak darurat maksimal 255 karakter")
      .matches(
        /^[A-Za-z\s]+$/,
        "Nama kontak darurat hanya boleh mengandung huruf dan spasi"
      ),
    emergency_phone: Yup.string()
      .matches(
        /^\d{11,13}$/,
        "Nomor kontak darurat harus 11 sampai 13 digit angka"
      )
      .required("Nomor kontak darurat wajib diisi"),
    relationship_emergency_phone: Yup.string().required(
      "Hubungan kontak darurat is required"
    ),
    company_employees: Yup.array()
      .of(
        Yup.object().shape({
          company_id: Yup.string().required("Perusahaan is required"),
          position_id: Yup.string().required("Jabatan is required"),
          date: Yup.string().required("Tanggal Bergabung is required"),
        })
      )
      .min(1, "At least one company employee record is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<EmployeeFormValues>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema as any),
    defaultValues: {
      photo: null,
      name: "",
      email: "",
      gender: "",
      birth_date: "",
      address_ktp: "",
      address_domicile: "",
      phone: "62",
      marital_status: "",
      religion: "",
      last_education: "",
      join_date: "",
      bank: "",
      no_bank: "",
      contract_type: "",
      name_emergency_phone: "",
      emergency_phone: "62",
      relationship_emergency_phone: "",
      company_employees: [],
    },
  });
  const getBankOptions = bankOptions.map((bankOptions) => ({
    label: bankOptions.name,
    value: bankOptions.name,
  }));
  // New state to track submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneValue = watch("phone");
  const emergencyPhoneValue = watch("emergency_phone");

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
    if (emergencyPhoneValue) {
      const cleaned = emergencyPhoneValue.replace(/[^0-9]/g, "");
      let formatted = cleaned;

      if (cleaned.startsWith("0")) {
        formatted = "62" + cleaned.slice(1);
      } else if (cleaned.startsWith("62")) {
        formatted = cleaned;
      } else if (cleaned) {
        formatted = "62" + cleaned;
      }

      // Ensure the emergency phone number always starts with 62 and cannot be deleted
      if (!formatted.startsWith("62")) {
        formatted = "62" + formatted;
      }

      // Update the emergency phone value in the form
      if (formatted !== emergencyPhoneValue) {
        setValue("emergency_phone", formatted, { shouldValidate: true });
      }
    }
  }, [emergencyPhoneValue, setValue]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get(
          "/company/management-company/company/select"
        );
        const data = response.data.data;
        const options = data.map((company: { id: string; name: string }) => ({
          value: company.id,
          label: company.name,
        }));
        setCompanyOptions(options);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    const fetchPosition = async () => {
      try {
        const response = await axiosInstance.get(
          "/hr/master-data/position/select"
        );
        const data = response.data.data;
        const options = data.map((position: { id: string; name: string }) => ({
          value: position.id,
          label: position.name,
        }));
        setPositionOptions(options);
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchCompanies();
    fetchPosition();
  }, []);

  const handleCloseFailedModal = () => setIsFailed(false);

  const formatDateToDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // DD
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MM
    const year = date.getFullYear(); // YYYY
    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  // Fetch data for edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchEmployeeData = async () => {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/hr/master-data/employee/${id}`
          );
          const data = response.data.data;

          const formattedBirthDate = data.birth_date
            ? new Date(data.birth_date).toISOString().split("T")[0]
            : "";
          const companyEmployees = data.company_employees.map(
            (company: any) => ({
              company_id: company.company_id,
              position_id: company.position_id,
              date: company.date
                ? new Date(company.date).toISOString().split("T")[0]
                : "",
            })
          );

          reset({
            ...data,
            birth_date: formattedBirthDate,
            company_employees: companyEmployees || [],
          });

          if (data.photo && typeof data.photo === "string") {
            const imageUrl = `${baseUrl}/${data.photo}`;
            setExistingImageUrl(imageUrl);
            setOriginalImagePath(data.photo);
            // Set the initial photo value to the path
            setValue("photo", data.photo, {
              shouldValidate: true,
            });
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
          setErrorMessage("Failed to fetch employee data.");
          setIsFailed(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEmployeeData();
    }
  }, [mode, id, reset, baseUrl, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "company_employees",
  });

  const address_ktp = watch("address_ktp");

  useEffect(() => {
    if (isSameAddress) {
      setValue("address_domicile", address_ktp, { shouldValidate: true });
    }
  }, [address_ktp, isSameAddress, setValue]);

  const onSubmit = (data: EmployeeFormValues) => {
    if (data.company_employees.length === 0) {
      setErrorMessage("At least one company employee record is required.");
      setIsFailed(true);
      return;
    }

    const formattedCompanyEmployees = data.company_employees.map(
      (employee) => ({
        ...employee,
        date: new Date(employee.date).toISOString(),
      })
    );
    const formattedBirthDate = new Date(data.birth_date).toISOString();
    const formData = new FormData();

    // Handle photo field based on its type
    if (data.photo instanceof File) {
      // New file uploaded
      formData.append("photo", data.photo);
    } else if (typeof data.photo === "string" && !imageWasRemoved) {
      // Existing image path and image was not removed
      formData.append("photo", data.photo);
    } else if (imageWasRemoved) {
      // Image was explicitly removed
      formData.append("photo", "");
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("birth_date", formattedBirthDate);
    formData.append("address_ktp", data.address_ktp);
    formData.append("address_domicile", data.address_domicile);
    formData.append("phone", data.phone);
    formData.append("marital_status", data.marital_status);
    formData.append("religion", data.religion);
    formData.append("last_education", data.last_education);
    formData.append("bank", data.bank);
    formData.append("no_bank", data.no_bank);
    formData.append("contract_type", data.contract_type);
    formData.append("name_emergency_phone", data.name_emergency_phone);
    formData.append("emergency_phone", data.emergency_phone);
    formData.append(
      "relationship_emergency_phone",
      data.relationship_emergency_phone
    );
    formData.append(
      "company_employees",
      JSON.stringify(formattedCompanyEmployees)
    );

    setIsModalVisible(true);
    handleConfirmData.current = formData;
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // New file selected
      setValue("photo", file);
      setImageWasRemoved(false);
    } else {
      // Image was removed
      setValue("photo", null);
      setImageWasRemoved(true);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {
      setValue("address_domicile", address_ktp, { shouldValidate: true });
    } else {
      setValue("address_domicile", "", { shouldValidate: true });
    }
  };

  const handleConfirm = async () => {
    if (handleConfirmData.current) {
      try {
        setIsLoading(true);
        setIsSubmitting(true); // Start submission
        let response;
        if (mode === "create") {
          response = await axiosInstance.post(
            "/hr/master-data/employee",
            handleConfirmData.current,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else if (mode === "edit" && id) {
          response = await axiosInstance.put(
            `/hr/master-data/employee/${id}`,
            handleConfirmData.current,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        if (response && mode === "create") {
          setSuccessPassword(response.data.data.password);
          setNewId(response.data.data.id);
          setIsSuccessModalVisible(true);
        } else if (mode === "edit") {
          setIsSuccessModalVisible(true);
        }
        reset();
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData.field && typeof errorData.field === "object") {
            const errors = Object.entries(errorData.field)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n");
            setErrorMessage(errors);
          } else {
            setErrorMessage(errorData.field);
          }
        } else {
          setErrorMessage("Failed to submit data.");
        }
        setIsModalVisible(false);
        setIsFailed(true);
      } finally {
        setIsLoading(false);
        setIsSubmitting(false); // End submission
      }
    }
    setIsModalVisible(false);
  };
  const selectedBank = watch("bank");

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-5 w-100 mb-4">
            <div className="row g-6">
              <h4>Data Diri</h4>
              <div className="col-md-12 col-lg-6">
                {mode === "edit" && (
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <ImageField
                        name="photo"
                        label="Foto Pegawai"
                        onChange={(file) => handleImageChange(file)}
                        errors={errors.photo?.message}
                        defaultValue={
                          existingImageUrl ? existingImageUrl : null
                        }
                        isRequired={false}
                      />
                    )}
                  />
                )}
                {mode === "create" && (
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <ImageField
                        name="photo"
                        label="Foto Pegawai"
                        onChange={(file) => handleImageChange(file)}
                        errors={errors.photo?.message}
                        defaultValue={existingImageUrl}
                      />
                    )}
                  />
                )}
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="row g-2">
                  <div className="col-md-12">
                    <InputField
                      name="name"
                      label="Nama Lengkap"
                      control={control}
                      placeholder="Masukkan nama lengkap"
                      errors={errors}
                      type="text"
                    />
                  </div>
                  <div className="col-md-12">
                    <InputField
                      name="email"
                      label="Email"
                      control={control}
                      placeholder="Masukkan email"
                      errors={errors}
                      type="email"
                    />
                  </div>
                  <div className="col-md-12">
                    <SelectField
                      name="gender"
                      label="Jenis Kelamin"
                      control={control}
                      errors={errors}
                      placeholder="Pilih jenis kelamin"
                      options={[
                        { value: "male", label: "Laki-Laki" },
                        { value: "female", label: "Perempuan" },
                      ]}
                    />
                  </div>
                  <div className="col-md-12">
                    <DateInputField
                      label="Tanggal Lahir"
                      value={watch("birth_date")}
                      onChange={(date) =>
                        setValue("birth_date", date, { shouldValidate: true })
                      }
                      isBirthDate
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-6">
              <div className="col-md-12 col-lg-6">
                <SelectField
                  name="religion"
                  label="Agama"
                  control={control}
                  errors={errors}
                  placeholder="Pilih Agama"
                  options={[
                    { value: "Islam", label: "Islam" },
                    { value: "Kristen", label: "Kristen" },
                    { value: "Buddha", label: "Buddha" },
                    { value: "Hindu", label: "Hindu" },
                    { value: "Lainnya", label: "Lainnya" },
                  ]}
                />
                <SelectField
                  name="last_education"
                  label="Pendidikan Terakhir"
                  control={control}
                  errors={errors}
                  placeholder="Pilih pendidikan terakhir"
                  options={[
                    { value: "S3", label: "S3" },
                    { value: "S2", label: "S2" },
                    { value: "Sarjana", label: "Sarjana" },
                    { value: "SMA", label: "SMA" },
                    { value: "SMP", label: "SMP" },
                  ]}
                />
                <TextareaField
                  name="address_ktp"
                  label="Alamat KTP"
                  control={control}
                  placeholder="Masukkan alamat KTP"
                  errors={errors}
                />
              </div>
              <div className="col-md-12 col-lg-6">
                <SelectField
                  name="marital_status"
                  label="Status Pernikahan"
                  control={control}
                  errors={errors}
                  placeholder="Pilih status pernikahan"
                  options={[
                    { value: "Menikah", label: "Menikah" },
                    { value: "Lajang", label: "Lajang" },
                    { value: "Other", label: "Lainnya" },
                  ]}
                />
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
                <TextareaField
                  name="address_domicile"
                  label="Alamat Domisili"
                  control={control}
                  placeholder="Masukkan alamat domisili"
                  errors={errors}
                  disabled={isSameAddress}
                />
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    className="form-check-input"
                    checked={isSameAddress}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="sameAddress" className="ms-2">
                    Alamat domisili sama dengan alamat KTP
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* KEPEGAWAIAN */}
          <div className="card p-5 w-100 mb-4">
            <h4 className="mb-8">Kepegawaian</h4>
            <div className="row g-8">
              <div className="col-md-12 col-lg-6">
                <SelectField
                  name="bank"
                  label="Bank"
                  control={control}
                  errors={errors}
                  placeholder="Pilih Bank"
                  options={getBankOptions}
                />
                <SelectField
                  name="contract_type"
                  label="Jenis Kontrak"
                  control={control}
                  errors={errors}
                  placeholder="Pilih jenis kontrak"
                  options={[
                    { value: "Paruh-Waktu", label: "Paruh-Waktu" },
                    { value: "Permanen", label: "Permanent" },
                    { value: "Contract", label: "Kontrak" },
                    { value: "Magang", label: "Magang" },
                  ]}
                />
              </div>
              <div className="col-md-12 col-lg-6">
                <InputField
                  name="no_bank"
                  label="Nomor Akun Bank"
                  control={control}
                  errors={errors}
                  placeholder="Masukkan nomor akun bank"
                />
              </div>
            </div>
          </div>

          <div className="card p-6 mb-4">
            <h2 style={{ fontSize: "18px" }}>Perusahaan</h2>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-4">
                <div className="d-flex align-items-start mt-6 gap-3 flex-wrap">
                  <div
                    className="fs-6 mt-12 text-center"
                    style={{
                      maxWidth: "60x",
                      paddingRight: "12px",
                      paddingLeft: "12.5px",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-grow-1" style={{ minWidth: "250px" }}>
                    <SelectField
                      name={`company_employees.${index}.company_id`}
                      label="Perusahaan"
                      control={control}
                      options={companyOptions} // Use the fetched company options
                      errors={errors}
                      placeholder="Pilih Perusahaan"
                    />
                  </div>

                  <div className="flex-grow-1" style={{ minWidth: "250px" }}>
                    <SelectField
                      name={`company_employees.${index}.position_id`}
                      label="Jabatan"
                      control={control}
                      options={positionOptions}
                      errors={errors}
                      placeholder="Pilih Jabatan"
                    />
                  </div>

                  <div
                    className="flex-grow-1"
                    style={{ minWidth: "220px", paddingBottom: "4px" }}
                  >
                    <DateInputField
                      label="Tanggal Bergabung"
                      value={watch(`company_employees.${index}.date`)}
                      onChange={(date) =>
                        setValue(`company_employees.${index}.date`, date, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <span
                      onClick={() => fields.length > 1 && remove(index)}
                      style={{
                        cursor: fields.length > 1 ? "pointer" : "not-allowed",
                        color: fields.length > 1 ? "inherit" : "gray",
                      }}
                    >
                      <i
                        className={`fa-solid fa-trash d-flex align-items-center fs-2 ${
                          fields.length > 1 ? "text-muted" : "text-gray-400"
                        } mt-13`}
                      ></i>
                    </span>
                  </div>
                </div>
                {index < fields.length - 1 && (
                  <div className="separator border-gray-400 mt-6 w-90"></div>
                )}
              </div>
            ))}

            <div className="separator border-gray-400 mt-2 mb-5 w-90 mx-auto"></div>
            <button
              type="button"
              onClick={() =>
                append({ company_id: "", position_id: "", date: "" })
              }
              className="btn border border-primary text-primary px-12 py-3 mx-auto"
            >
              Tambah
            </button>
          </div>

          {/* KONTAK DARURAT */}
          <div className="card p-5 w-100 mb-4">
            <h4 className="mb-8">Kontak Darurat</h4>
            <div className="row g-8">
              <div className="col-md-12 col-lg-6">
                <InputField
                  name="name_emergency_phone"
                  label="Nama Kontak Darurat"
                  control={control}
                  errors={errors}
                  placeholder="Masukkan nama kontak darurat"
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      name="emergency_phone"
                      label="Nomor Kontak Darurat"
                      control={control}
                      placeholder="Masukkan nomor kontak darurat"
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
              <div className="col-md-12 col-lg-6">
                <SelectField
                  name="relationship_emergency_phone"
                  label="Hubungan Kontak Darurat"
                  control={control}
                  errors={errors}
                  placeholder="Hubungan Kontak Darurat"
                  options={[
                    { value: "Pasangan", label: "Pasangan" },
                    { value: "Orang Tua", label: "Orang Tua" },
                    { value: "Saudara", label: "Saudara" },
                    { value: "Lainnya", label: "Lainnya" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mb-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn px-12 py-3 border border-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={!isValid || isSubmitting} // Disable if not valid or submitting
            >
              {buttonTitle}
            </button>
          </div>
        </form>
      )}

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          cancelButtonLabel={cancelButtonLabel}
          buttonTitle={buttonTitle}
          message={message}
        />
      )}

      {isSuccessModalVisible && mode === "create" && (
        <SuccessModal
          closeModal={() => {
            navigate(`../detail/${newId}`);
            setIsSuccessModalVisible(false);
            setSuccessPassword(null);
          }}
          successMessage={`Password user: ${successPassword}`}
        />
      )}

      {isSuccessModalVisible && mode === "edit" && (
        <SuccessModal
          closeModal={() => {
            navigate(`../detail/${id}`);
            setIsSuccessModalVisible(false);
            setSuccessPassword(null);
          }}
          successMessage="Pegawai berhasil diubah"
        />
      )}

      {isFailed && (
        <FailedModal
          closeModal={handleCloseFailedModal}
          message={errorMessage}
        />
      )}
    </div>
  );
};

export default Form;
