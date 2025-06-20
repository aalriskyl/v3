import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DropdownField from "../../../../materials/components/molecules/field/DropdownField";
import { useUom } from "../../template/UomTableLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";

interface FilterModalProps {
  closeModal: () => void;
}

interface FormValues {
  dateCreated: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
  const { setDate, dateCreated } = useUom();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      dateCreated: dateCreated || "",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    reset({
      dateCreated: "",
    });
  };

  const formatDateForPayload = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true); // Set loading to true when submitting
    try {
      const formattedDate = formatDateForPayload(data.dateCreated); // Format the date
      setDate(formattedDate); // Pass the formatted date to the context
      closeModal();
    } finally {
      setLoading(false); // Set loading to false after submission
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
          name="dateCreated"
          control={control}
          render={({ field }) => (
            <DateInputField
              label="Tanggal Pembuatan"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
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
