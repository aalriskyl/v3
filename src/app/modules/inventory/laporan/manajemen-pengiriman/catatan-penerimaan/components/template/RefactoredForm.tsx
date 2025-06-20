import { FC, useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ID } from "@metronic/helpers";
import {
  CatatanPenerimaanModel,
  // initialMaterial,
} from "../molecules/core/_models";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { dummyUsers } from "../organisms/table/dummyUsers";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import DateInputField from "../molecules/field/DateInputField";
import MaterialTableLayout from "./MaterialTableLayout";
import { getAllPurchaseOrder, createRecievedNote } from "../../core/_request";

interface FormData extends CatatanPenerimaanModel {
  id: ID;
  type: string;
  pemasok: string;
  purchase_order_number: string;
  tanggal_penerimaan: Date;
}

interface FormProps {
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  id: Yup.number().nullable().optional(),
  type: Yup.string().required("Tipe wajib diisi"),
  pemasok: Yup.string().required("Konsumen wajib diisi"),
  purchase_order_number: Yup.string().required(
    "Nomor Purchase Order wajib diisi"
  ),
  tanggal_penerimaan: Yup.date().required("Tanggal Penerimaan wajib diisi"),
});

const FormComponent: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  headTitle,
  confirmButtonLabel = "Konfirmasi",
  cancelButtonLabel = "Batal",
  message,
}) => {
  const { customerId } = useParams<{ customerId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmData, setConfirmData] = useState<FormData | null>(null);
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const type = watch("type");

  useEffect(() => {
    // Fetch purchase orders
    const fetchPurchaseOrders = async () => {
      try {
        const response = await getAllPurchaseOrder();
        console.log("console", response.data);
        const options = response.material_requests.map((po: any) => ({
          value: po.no_purchase_order,
          label: po.no_purchase_order,
        }));
        setPurchaseOrderOptions(options);
      } catch (error) {
        console.error("Failed to fetch purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  useEffect(() => {
    if (mode === "edit" && customerId) {
      const foundData = dummyUsers.find(
        (user) => user.id === Number(customerId)
      );
      if (foundData) {
        reset(foundData);
      }
    }
  }, [mode, customerId, reset]);

  const onSubmit = (data: FormData) => {
    setConfirmData(data);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmData) {
      setIsSubmitting(true);
      try {
        const newData: CatatanPenerimaanModel = {
          // ...initialMaterial,
          ...confirmData,
          id: mode === "create" ? dummyUsers.length + 1 : confirmData.id,
        };

        if (mode === "create") {
          dummyUsers.push(newData);
        } else if (mode === "edit" && customerId) {
          const index = dummyUsers.findIndex(
            (user) => user.id === Number(customerId)
          );
          if (index !== -1) dummyUsers[index] = newData;
        }

        setIsSuccessModalVisible(true);
        reset();
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
        setIsFailedModalVisible(true);
      } finally {
        setIsSubmitting(false);
        setIsModalVisible(false);
      }
    }
  };

  return (
    <div className="font-secondary">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Catatan PenerimaanAAA</h3>
          <div className="row">
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Nomor Purchase Order"
                name="purchase_order_number"
                label="Nomor Purchase Order"
                control={control}
                options={purchaseOrderOptions}
                errors={errors}
              />
              <SelectField
                placeholder="Pilih Tipe"
                name="type"
                label="Tipe"
                control={control}
                options={[
                  { value: "Warehouse", label: "Internal" },
                  { value: "Supplier", label: "External" },
                ]}
                errors={errors}
              />
            </div>
            <div className="col-md-6">
              <Controller
                name="tanggal_penerimaan"
                control={control}
                render={({ field: dateField }) => (
                  <DateInputField
                    label="Tanggal Penerimaan"
                    value={dateField.value}
                    onChange={(value) => dateField.onChange(new Date(value))}
                    error={errors.tanggal_penerimaan?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <MaterialTableLayout type={type} />

        <div className="d-flex justify-content-end gap-3 my-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-500 me-2"
          >
            {cancelButtonLabel}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-500 me-2"
          >
            Simpan Draft
          </button>
          <button
            type="submit"
            className="btn btn-primary px-12 py-3 border border-primary"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : confirmButtonLabel}
          </button>
        </div>

        {isModalVisible && (
          <ConfirmModal
            headTitle={headTitle}
            message={message}
            confirmButtonLabel={confirmButtonLabel}
            cancelButtonLabel={cancelButtonLabel}
            handleSubmit={handleConfirm}
            closeModal={() => setIsModalVisible(false)}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              navigate("../");
            }}
            successMessage={successMessage}
          />
        )}

        {isFailedModalVisible && (
          <FailedModal
            closeModal={() => setIsFailedModalVisible(false)}
            message="Terjadi kesalahan, coba lagi!"
          />
        )}
      </form>
    </div>
  );
};

export default FormComponent;
