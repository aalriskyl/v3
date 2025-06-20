import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DropdownField from "../../../../materials/components/molecules/field/DropdownField";
import { useCategory } from "../../template/CategoryTableLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";

interface FilterModalProps {
  closeModal: () => void;
}

interface FormValues {
  product_type: string; // Keep as string for form handling
  dateCreated: string;
}

interface ProductTypeOption {
  value: string;
  label: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
  const { setDate, setProductType, dateCreated, productType } = useCategory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      product_type: productType || "",
      dateCreated: dateCreated || "",
    },
  });
  const [productTypeOptions, setProductTypeOptions] = useState<
    ProductTypeOption[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Fetch product types on component mount
  useEffect(() => {
    const fetchProductTypes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          "/inventory/master-data/product-type"
        );
        const formattedProductTypes = response.data.data.map((cat: any) => ({
          value: cat.id.toString(), // Keep as string for dropdown
          label: cat.name,
        }));
        setProductTypeOptions(formattedProductTypes);
      } catch (error) {
        console.error("Failed to fetch product types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  // Reset form fields
  const handleReset = () => {
    reset({
      product_type: "",
      dateCreated: "",
    });
  };

  // Format date to 'yyyy-MM-dd'
  const formatDateForPayload = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const formattedDate = formatDateForPayload(data.dateCreated);
      setProductType(data.product_type ? Number(data.product_type) : undefined);
      setDate(formattedDate);
      reset();
      closeModal();
    } catch (error) {
      console.error("Failed to apply filters", error);
    } finally {
      setLoading(false);
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
        {/* Product Type Dropdown */}
        <Controller
          name="product_type"
          control={control}
          render={({ field }) => (
            <DropdownField
              label="Tipe Produk"
              value={field.value}
              onChange={field.onChange}
              options={productTypeOptions}
              placeholder="Pilih Tipe"
            />
          )}
        />

        {/* Date Input Field */}
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
