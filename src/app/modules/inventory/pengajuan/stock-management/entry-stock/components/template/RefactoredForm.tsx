import { FC, useState, useEffect } from "react";
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
  createEntryStock,
  getAllWarehouse,
  getEntryStockById,
  updateEntryStock,
} from "../../core/_request"; // Import the updateEntryStock function
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import DateInputField from "../../../../manajemen-pengiriman/catatan-penerimaan/components/molecules/field/DateInputField";

interface FormData {
  type: string;
  warehouse_id: string;
  remarks?: string;
  // posting_date: Date;
}

interface FormProps {
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  failedMessage?: string;
}

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Tipe entri stok wajib diisi"),
  remarks: Yup.string().optional(),
  warehouse_id: Yup.string().required("Gudang wajib diisi"),
});

const Form: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  headTitle,
  buttonTitle,
  message,
  submitButtonLabel,
  failedMessage,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [confirmData, setConfirmData] = useState<FormData | null>(null);
  const [warehouseOptions, setWarehouseOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

  useEffect(() => {
    // Fetch all warehouses when the component mounts
    const fetchWarehouses = async () => {
      try {
        const response = await getAllWarehouse();
        const options = response.data.warehouses.map((warehouse: any) => ({
          value: warehouse.id,
          label: warehouse.name,
        }));
        setWarehouseOptions(options);
      } catch (error) {
        console.error("Failed to fetch warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    // Fetch entry stock data by ID if in edit mode
    if (mode === "edit" && id) {
      const fetchEntryStock = async () => {
        try {
          const response = await getEntryStockById(id);
          const entryStock = response.data;
          reset({
            type: entryStock.status === "Draft" ? "Debit" : "Kredit", // Adjust based on your logic
            warehouse_id: entryStock.warehouse.id,
            remarks: entryStock.remarks,
            // posting_date: entryStock.posting_date,
          });
        } catch (error) {
          console.error("Failed to fetch entry stock:", error);
        }
      };

      fetchEntryStock();
    }
  }, [mode, id, reset]);

  const onSubmit = (data: FormData) => {
    setConfirmData(data);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmData) {
      setIsSubmitting(true);
      try {
        // Convert posting_date to ISO string format
        const payload = {
          ...confirmData,
        };

        if (mode === "create") {
          const entryStockId = await createEntryStock(payload); // Pass the payload with ISO-formatted date
          setIsSuccessModalVisible(true);
          setTimeout(() => {
            setIsSuccessModalVisible(false);
            navigate(`../detail/${entryStockId}`);
          }); // Close the modal after 2 seconds and then navigate
        } else if (mode === "edit" && id) {
          await updateEntryStock(id, payload); // Update entry stock with the ID and payload
          setIsSuccessModalVisible(true);
          setTimeout(() => {
            setIsSuccessModalVisible(false);
            navigate("../");
          }); // Close the modal after 2 seconds and then navigate
        }
        reset();
        setConfirmData(null);
      } catch (error) {
        setIsModalVisible(false);
        console.error("Failed to perform entry stock action:", error);
        setIsFailed(true); // Show failed modal
      } finally {
        setIsModalVisible(false);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="font-secondary">
      {isSubmitting && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100">
          <div className="row g-2">
            <h3 className="mb-6">Entry Stock</h3>
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Tipe Entry Stock"
                name="type"
                label="Tipe Entry Stock"
                control={control}
                options={[
                  { value: "Debit", label: "Debit" },
                  { value: "Kredit", label: "Kredit" },
                ]}
                errors={errors}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Gudang"
                name="warehouse_id"
                label="Gudang"
                control={control}
                options={warehouseOptions}
                errors={errors}
              />
            </div>
            <div className="col-md-6">
            {/* <Controller
              name="posting_date"
              control={control}
              render={({ field: dateField }) => (
                <DateInputField
                  label="Tanggal Posting"
                  value={dateField.value}
                  onChange={(value) => dateField.onChange(value)} // Pass the value directly
                  error={errors.posting_date?.message}
                />
              )}
            /> */}
            </div>
            <div className="col-md-12">
              <TextareaField
                name="remarks"
                label="Catatan"
                control={control}
                placeholder="Masukkan catatan"
                errors={errors}
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
              {buttonTitle}
            </button>
          </div>
        </div>
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
            closeModal={() => setIsSuccessModalVisible(false)}
            message={successMessage}
          />
        )}
        {isFailed && (
          <FailedModal
            closeModal={() => setIsFailed(false)}
            message={failedMessage}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
