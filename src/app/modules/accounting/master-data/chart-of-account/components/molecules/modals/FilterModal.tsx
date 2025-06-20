import React, { useState } from "react";
import DateInputField from "../field/DateInputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DateRangeInputField from "@metronic/layout/components/form/molecules/DateRangeInputField";
import DropdownField from "../../../../../../inventory/masterdata/materials/components/molecules/field/DropdownField";
import { FormikValues } from "formik";
import { useHelper } from "../core/HelperContext";

interface FilterModalProps {
  closeModal: () => void;
}
interface FormValues {
  type: string;
  createdFrom: string;
  createdTo: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ closeModal }) => {
  const {
    setType,
    type,
    createdDate,
    setCreatedDate,
    createdDateTo,
    setCreatedDateTo,
  } = useHelper();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      type: type || "",
      createdFrom: createdDate || "",
      createdTo: createdDateTo || "",
    },
  });
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mereset form
  const handleReset = () => {
    reset({
      type: "", // Reset status juga
      createdFrom: "",
      createdTo: "",
    });
  };

  console.log({
    type, // Reset status juga
    createdDate,
    createdDateTo,
  });

  // Fungsi untuk memformat tanggal ke format 'yyyy-MM-dd'
  const formatDateForPayload = (dateString: string) => {
    if (!dateString) return ""; // Jika tanggal kosong, kembalikan string kosong
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fungsi yang dipanggil saat form disubmit
  const onSubmit: SubmitHandler<FormikValues> = async (data) => {
    setLoading(true); // Set loading ke true saat proses submit
    console.log(data);
    try {
      // Format tanggal dan simpan ke context
      setCreatedDate(formatDateForPayload(data.createdFrom));
      setCreatedDateTo(formatDateForPayload(data.createdTo));
      setType(data.type); // Simpan status ke context
      closeModal(); // Tutup modal setelah submit
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <div
      className="bg-white rounded shadow-lg p-6"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 1000,
        width: "360px",
        marginTop: "8px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold fs-4">Filter</h2>
        <button className="btn btn-sm btn-icon" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <DropdownField
              label="Tipe"
              value={field.value}
              onChange={field.onChange}
              options={[
                { label: "Modal", value: "Modal" },
                { label: "Beban", value: "Beban" },
                { label: "Aset", value: "Aset" },
              ]}
            />
          )}
        />
        {/* Field untuk rentang tanggal pengajuan */}
        <Controller
          name="createdFrom"
          control={control}
          render={({ field }) => (
            <DateRangeInputField
              label="Tanggal Pembuatan"
              startDate={field.value}
              endDate={control._formValues.createdTo} // Ambil nilai submittedTo dari form
              onChange={(start, end) => {
                field.onChange(start); // Simpan nilai submittedFrom
                setValue("createdTo", end); // Simpan nilai submittedTo menggunakan setValue
              }}
            />
          )}
        />

        {/* Tombol Reset dan Simpan */}
        <div className="d-flex gap-2 mt-8">
          <button
            type="button"
            className="btn border border-primary text-primary btn-light w-50"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary border border-primary w-50"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
