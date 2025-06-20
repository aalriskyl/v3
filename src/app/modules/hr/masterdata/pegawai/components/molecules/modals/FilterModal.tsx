import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputField from "../field/InputField";
import DropdownField from "../../../../../../inventory/masterdata/materials/components/molecules/field/DropdownField";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useEmployees } from "../../core/EmployeeProviderContext";

interface FilterModalProps {
  closeModal: () => void;
}

interface FormValues {
  search: string;
  positionId: string;
  contractType: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
  const { contractType, setContractType, positionId, setPositionId } =
    useEmployees();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      search: "",
      positionId: positionId || "",
      contractType: contractType || "",
    },
  });

  const [positions, setPositions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axiosInstance.get(
          "/hr/master-data/position/select"
        );
        const formattedPositions = response.data.data.map((pos: any) => ({
          value: pos.id,
          label: pos.name,
        }));
        setPositions(formattedPositions);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleReset = () => {
    reset({
      search: "",
      positionId: "",
      contractType: "",
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPositionId(data.positionId);
    setContractType(data.contractType);
    closeModal();
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
          name="positionId"
          control={control}
          render={({ field }) => (
            <DropdownField
              label="Position"
              value={field.value}
              onChange={field.onChange}
              options={positions}
            />
          )}
        />
        <Controller
          name="contractType"
          control={control}
          render={({ field }) => (
            <DropdownField
              label="Contract Type"
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "Paruh-Waktu", label: "Paruh-Waktu" },
                { value: "Permanen", label: "Permanen" },
                { value: "Contract", label: "Kontrak" },
                { value: "Magang", label: "Magang" },
              ]}
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
