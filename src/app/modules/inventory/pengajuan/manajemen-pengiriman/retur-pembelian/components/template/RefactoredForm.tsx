/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ID } from "@metronic/helpers";
import { CatatanPengirimanModel, initialUser } from "../molecules/core/_models";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { dummyUsers } from "../organisms/table/dummyUsers";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import DateInputField from "../molecules/field/DateInputField";
import MaterialTableLayout from "./MaterialTableLayout";
import {
  getAllSalesOrder,
  getAllSalesOrderApproved,
  getMaterialBySoId,
  getSinglePengiriman,
} from "../../core/_request";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import MaterialTableLayoutDetail from "./MaterialTableLayoutDetail";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import clsx from "clsx";
import { DetailView } from "../../core/_models";

interface FormData {
  received_note_id: string;
  purchase_order_id: string;
  retur_option: string;
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
  received_note_id: Yup.string().required("Pilih Received Note"),
  purchase_order_id: Yup.string().required("Pilih Purchase Order"),
  retur_option: Yup.string().required("Pilih Retur Option"),
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
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newId, setNewId] = useState("");
  const navigate = useNavigate();

  const [receivedNoteChoice, setReceiveNoteChoice] = useState<
    ReceivedNoteChoiceType[]
  >([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/inventory/submission/delivery-management/received-note/select?received_type=Standard`
      )
      .then((res) => {
        console.log({ getSelectReceivedNote: res.data.data });
        setReceiveNoteChoice(res.data.data);
      });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      received_note_id: "",
      purchase_order_id: "",
      retur_option: "",
    },
  });

  const received_note_id = watch("received_note_id");
  const purchase_order_id = watch("purchase_order_id");
  const retur_option = watch("retur_option");

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/inventory/submission/delivery-management/retur-purchase/${id}`
      );
      const { received_note, purchase_order, retur_option } = res.data
        .data as DetailView;
      setValue("received_note_id", received_note.id);
      setValue("purchase_order_id", purchase_order.id);
      setValue("retur_option", retur_option);
      console.log({ getData: res.data.data });
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ received_note_id, purchase_order_id });

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        purchase_order_id,
        received_note_id,
        retur_option,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/inventory/submission/delivery-management/retur-purchase`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/inventory/submission/delivery-management/retur-purchase/${id}`,
          payload
        );
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error) {
      const field = (error as any)?.response?.data?.field;
      if (field) {
        let errorMessage = null;
        Object.keys(field).forEach((key) => {
          errorMessage = key.length > 3 ? `${key} : ${field[key]}` : null;
        });
        setFailedMessage(
          errorMessage !== null
            ? errorMessage
            : field || "Gagal membuat payment terms"
        );
        console.log({ errorMessage });
      }
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    if (received_note_id.length > 0) {
      const findData = receivedNoteChoice.find(
        (item) => item.id === received_note_id
      );
      if (findData) {
        setValue("purchase_order_id", findData.purchase_order.id);
      }
    }
  }, [received_note_id]);

  // if (mode === "edit" && status !== "Draft") return null;

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsModalVisible(true);
        }}
      >
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Retur Pembelian</h3>
          <div className="row">
            <div className="col-md-6">
              <SelectField
                name="received_note_id"
                label="Nomor Catatan Penerimaan"
                control={control}
                errors={errors}
                value={received_note_id}
                options={receivedNoteChoice.map((item) => ({
                  label: item.no_received_note,
                  value: item.id,
                }))}
                placeholder="Pilih Catatan Penerimaan"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor Purchase Order</label>
              <input
                className={clsx("form-control py-4")}
                placeholder="Purchase Order"
                value={
                  receivedNoteChoice.find(
                    (item) => item.id === received_note_id
                  )?.purchase_order.no_purchase_order || ""
                }
                disabled
              />
            </div>
            <div className="col-md-12">
              <SelectField
                placeholder="Pilih Opsi Pengembalian"
                name="retur_option"
                label="Opsi Pengembalian"
                control={control}
                options={[
                  {
                    label: "Barang",
                    value: "Barang",
                  },
                  {
                    label: "Dana",
                    value: "Dana",
                  },
                ]}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 my-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-500 me-2"
          >
            {cancelButtonLabel}
          </button>
          {/* <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-500 me-2"
          >
            Simpan Draft
          </button> */}
          <button
            type="submit"
            className="btn btn-primary px-12 py-3 border border-primary"
            disabled={isLoading}
          >
            {confirmButtonLabel}
          </button>
        </div>

        {isModalVisible && (
          <ConfirmModal
            headTitle={headTitle}
            message={message}
            confirmButtonLabel={confirmButtonLabel}
            cancelButtonLabel={cancelButtonLabel}
            handleSubmit={onSubmit}
            closeModal={() => setIsModalVisible(false)}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              if (mode === "create") {
                navigate(
                  `/inventory/pengajuan/manajemen-pengiriman/retur-pembelian/detail/${newId}`
                );
              }
            }}
            successMessage={successMessage}
          />
        )}

        {failedMessage && (
          <FailedModal
            closeModal={() => setFailedMessage(null)}
            message={failedMessage}
            confirmLabel={"Tutup"}
          />
        )}
      </form>
    </div>
  );
};

export default FormComponent;

type ReceivedNoteChoiceType = {
  id: string;
  no_received_note: string;
  received_type: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  status: string;
  type: string;
};

const getDateForInput = (dateStr: Date | string) => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const value = `${year}-${month}-${day}T${hours}:${minutes}`;
  return value;
};

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};
