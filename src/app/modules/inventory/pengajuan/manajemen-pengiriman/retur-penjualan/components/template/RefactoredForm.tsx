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
import { DetailView } from "../../core/_models";
import clsx from "clsx";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";
import axiosInstancePar from "../../../../../../../../service/axiosInstanceNoCompany";

interface FormData {
  delivery_note_id: string;
  retur_purchase_id: string;
  sales_order_id: string;
  retur_option: string;
  createdBy: "" | "retur_purchase_id" | "delivery_note_id";
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

// const validationSchema = Yup.object().shape({
//   delivery_note_id: Yup.string().required("Pilih Received Note"),
//   retur_purchase_id: Yup.string().required("Pilih Retur Pembelian"),
//   sales_order_id: Yup.string().required("Pilih Sales Order"),
//   retur_option: Yup.string().required("Pilih Retur Option"),
//   createdBy: Yup.string()
//     .oneOf(["", "retur_purchase_id", "delivery_note_id"])
//     .required("Pilih Buat Berdasarkan"),
// });

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

  const [deliveryNoteChoice, setDeliveryNoteChoice] = useState<
    DeliveryNoteChoiceType[]
  >([]);

  const [returPurchaseChoice, setReturPurchaseChoice] = useState<
    ReturPurchaseChoiceType[]
  >([]);

  useEffect(() => {
    axiosInstance
      .get(`/inventory/submission/delivery-management/delivery-note/select?`)
      .then((res) => {
        console.log({ getSelectDeliveryNote: res.data.data });
        setDeliveryNoteChoice(res.data.data);
      });
    axiosInstance
      .get(
        `/inventory/submission/delivery-management/retur-purchase/select?is_company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        console.log({ getSelectReturPurchase: res.data.data });
        setReturPurchaseChoice(res.data.data);
      });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      sales_order_id: "",
      delivery_note_id: "",
      retur_purchase_id: "",
      retur_option: "",
      createdBy: "",
    },
  });

  const delivery_note_id = watch("delivery_note_id");
  const retur_purchase_id = watch("retur_purchase_id");
  const sales_order_id = watch("sales_order_id");
  const retur_option = watch("retur_option");
  const createdBy = watch("createdBy");

  useEffect(() => {
    if (createdBy === "delivery_note_id") setValue("retur_purchase_id", "");
    else if (createdBy === "retur_purchase_id")
      setValue("delivery_note_id", "");
  }, [createdBy]);

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/inventory/submission/delivery-management/retur-sales/${id}`
      );
      const { delivery_note, sales_order, retur_option, retur_purchase } = res
        .data.data as DetailView;
      if (retur_purchase) {
        setValue("createdBy", "retur_purchase_id");
        setValue("retur_purchase_id", retur_purchase?.id || "");
      } else {
        setValue("createdBy", "delivery_note_id");
        setValue("delivery_note_id", delivery_note?.id || "");
        setValue("sales_order_id", sales_order.id);
      }
      setValue("retur_option", retur_option);
      console.log({ getData: res.data.data });
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ delivery_note_id, sales_order_id });

  useEffect(() => {
    getData();
  }, [id, reset]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        delivery_note_id:
          createdBy === "delivery_note_id" ? delivery_note_id : null,
        retur_purchase_id:
          createdBy === "retur_purchase_id" ? retur_purchase_id : null,
        sales_order_id:
          createdBy === "delivery_note_id" ? sales_order_id : null,
        retur_option,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/inventory/submission/delivery-management/retur-sales`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/inventory/submission/delivery-management/retur-sales/${id}`,
          payload
        );
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    if (delivery_note_id.length > 0) {
      const findData = deliveryNoteChoice.find(
        (item) => item.id === delivery_note_id
      );
      if (findData) {
        setValue("sales_order_id", findData.sales_order.id);
      }
    }
  }, [delivery_note_id]);

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
          <h3 className="mb-6">Retur Penjualan</h3>
          <div className="row">
            <div className="col-md-12">
              <SelectField
                disabled={mode === "edit"}
                placeholder="Buat Berdasarkan"
                name="createdBy"
                label="Pilih Buat Berdasarkan"
                control={control}
                options={[
                  { label: "Catatan Pengiriman", value: "delivery_note_id" },
                  { label: "Retur Pembelian", value: "retur_purchase_id" },
                ]}
                errors={errors}
              />
            </div>
          </div>
          {createdBy === "delivery_note_id" && (
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Nomor Catatan Pengiriman"
                  name="delivery_note_id"
                  label="Nomor Catatan Pengiriman"
                  control={control}
                  options={deliveryNoteChoice
                    .filter((item) => item.delivery_type === "Standard") // Only include Standard delivery types
                    .map((item) => ({
                      label: item.no_delivery_note,
                      value: item.id,
                    }))}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nomor Sales Order</label>
                <input
                  className={clsx("form-control py-4")}
                  placeholder="Sales Order"
                  value={
                    deliveryNoteChoice.find(
                      (item) => item.id === delivery_note_id
                    )?.sales_order.no_sales_order || ""
                  }
                  disabled
                />
              </div>
            </div>
          )}
          {createdBy === "retur_purchase_id" && (
            <div className="row">
              <div className="col-md-12">
                <SelectField
                  disabled={mode === "edit"}
                  placeholder="Pilih Nomor Retur Pembelian"
                  name="retur_purchase_id"
                  label="Nomor Retur Pembelian"
                  control={control}
                  options={returPurchaseChoice.map((item) => ({
                    label: item.no_retur_purchase,
                    value: item.id,
                  }))}
                  errors={errors}
                />
              </div>
              {/* <div className="col-md-6">
                <label className="form-label">Nomor Sales Order</label>
                <input
                  className={clsx("form-control py-4")}
                  placeholder="Sales Order"
                  value={
                    deliveryNoteChoice.find(
                      (item) => item.id === delivery_note_id
                    )?.sales_order.no_sales_order || ""
                  }
                  disabled
                />
              </div> */}
            </div>
          )}
          {createdBy.length > 0 && (
            <div className="row">
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
          )}
        </div>

        {/* {createdBy !== "" && (
          <MaterialTableLayout
            delivery_note_id={delivery_note_id}
            retur_purchase_id={retur_purchase_id}
            createdBy={createdBy}
          />
        )} */}

        {/* {type === "Dana" && (
          <div className="card p-5 w-100 mb-8">
            <h3 className="mb-6">Chart of Account</h3>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Kredit"
                  name=""
                  label="Kredit"
                  control={control}
                  options={[
                    {
                      label: "DUMMY1",
                      value: "DUMMY2",
                    },
                  ]}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Debit"
                  name=""
                  label="Debit"
                  control={control}
                  options={[
                    {
                      label: "DUMMY1",
                      value: "DUMMY2",
                    },
                  ]}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  placeholder="0"
                  name=""
                  label="Total Harga"
                  control={control}
                  errors={errors}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        )} */}

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
                  `/inventory/pengajuan/manajemen-pengiriman/retur-penjualan/detail/${newId}`
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

type DeliveryNoteChoiceType = {
  delivery_type: string;
  id: string;
  no_delivery_note: string;
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  status: string;
  type: string;
};

type ReturPurchaseChoiceType = {
  approved_date: string;
  id: string;
  no_retur_purchase: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
    supplier: {
      id: string;
      is_a_company: boolean;
      is_company_id: string;
      name: string;
    };
  };
  received_note: {
    id: string;
    no_received_note: string;
  };
  retur_sales: never[];
  retur_option: string;
  status: string;
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
