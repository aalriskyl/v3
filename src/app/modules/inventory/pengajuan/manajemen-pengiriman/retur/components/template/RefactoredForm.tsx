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

interface FormData {
  id?: ID;
  type: string;
  customer_id: string;
  sales_order_id: string;
  warehouse_id: string;
  delivery_date: Date;
  status?: string;
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
  customer_id: Yup.string().required("Konsumen wajib diisi"),
  sales_order_id: Yup.string().required("Nomor Sales Order wajib diisi"),
  warehouse_id: Yup.string().required("Nomor Sales Order wajib diisi"),
  delivery_date: Yup.date().required("Tanggal Pengiriman wajib diisi"),
});

export interface MaterialManajemenPengeriman {
  amount: number;
  id: string;
  material: {
    id: string;
    name: string;
  };
  material_uom: {
    id: string;
    uom_actual: {
      id: string;
      name: string;
    };
  };
  price: number;
}

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
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmData, setConfirmData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  const [material, setMaterial] = useState<MaterialManajemenPengeriman[]>([]);

  const [salesOrderChoice, setSalesOrderChoice] = useState<any[]>([]);
  const [customerChoice, setCustomerChoice] = useState([]);
  const [outletChoice, setOutletChoice] = useState([]);
  const [warehouseChoice, setWarehouseChoice] = useState([]);

  const [newId, setNewId] = useState("");

  // useEffect(() => {
  //   getAllSalesOrderApproved().then((data) => {
  //     setSalesOrderChoice(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get(
  //       `/sales/master-data/customer/select?is_a_company=false&company_id=${localStorage.getItem(
  //         "company_id"
  //       )}`
  //     )
  //     .then((res) => {
  //       console.log({ customer: res.data.data });
  //       setCustomerChoice(
  //         res.data.data.map((item: any) => {
  //           return {
  //             label: item.name,
  //             value: item.id,
  //           };
  //         })
  //       );
  //     });
  //   axiosInstance
  //     .get(
  //       `/sales/master-data/customer/select?is_a_company=true&company_id=${localStorage.getItem(
  //         "company_id"
  //       )}`
  //     )
  //     .then((res) => {
  //       console.log({ outlet: res.data.data });
  //       setOutletChoice(
  //         res.data.data.map((item: any) => {
  //           return {
  //             label: item.name,
  //             value: item.id,
  //           };
  //         })
  //       );
  //     });
  //   axiosInstance
  //     .get(
  //       `/inventory/master-data/warehouse?company_id=${localStorage.getItem(
  //         "company_id"
  //       )}`
  //     )
  //     .then((res) => {
  //       console.log({ outlet: res.data.data });
  //       setWarehouseChoice(
  //         res.data.data.warehouses.map((item: any) => {
  //           return {
  //             label: item.name,
  //             value: item.id,
  //           };
  //         })
  //       );
  //     });
  // }, []);

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
      type: "",
      customer_id: "",
      sales_order_id: "",
      warehouse_id: "",
      delivery_date: new Date(),
    },
  });

  const type = watch("type");
  const customer_id = watch("customer_id");
  const sales_order_id = watch("sales_order_id");
  const warehouse_id = watch("warehouse_id");
  const delivery_date = watch("delivery_date");
  const status = watch("status");

  // useEffect(() => {
  //   console.log({ id });
  //   if (id) {
  //     getSinglePengiriman(id).then((data) => {
  //       setValue("customer_id", data.customer_id);
  //       setValue(
  //         "delivery_date",
  //         data.delivery_date ? new Date(data.delivery_date) : new Date()
  //       );
  //       setValue("sales_order_id", data.sales_order_id);
  //       setValue("type", data.type);
  //       setValue("warehouse_id", data.warehouse_id);
  //       setValue("status", data.status);
  //     });
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (mode === "create") {
  //     // getMaterialBySoId(sales_order_id).then((data) => {
  //     //   console.log("tes", data);
  //     //   setMaterial(data);
  //     // });
  //     const findSO = salesOrderChoice.find(
  //       (item) => item.id === sales_order_id
  //     );
  //     if (findSO) {
  //       setValue("type", findSO.type);
  //       setValue("customer_id", findSO.customer_id);
  //     } else {
  //       setValue("type", "");
  //       setValue("customer_id", "");
  //     }
  //   }
  // }, [sales_order_id]);

  const onSubmit = (data: FormData) => {
    setConfirmData(data);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmData) {
      setIsSubmitting(true);
      try {
        const payload = {
          warehouse_id,
          customer_id,
          delivery_date,
          sales_order_id,
          type,
        };
        console.log({ payload });
        let response;
        if (mode === "create") {
          response = await axiosInstance.post(
            `/inventory/submission/delivery-management/delivery-note?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            payload
          );
          setNewId(response.data.data.id);
        } else if (mode === "edit" && id) {
          response = await axiosInstance.put(
            `/inventory/submission/delivery-management/delivery-note/${id}?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            payload
          );
          getSinglePengiriman(id).then((data) => {
            setValue("customer_id", data.customer_id);
            setValue("delivery_date", new Date(data.delivery_date));
            setValue("sales_order_id", data.sales_order_id);
            setValue("type", data.type);
            setValue("warehouse_id", data.warehouse_id);
            setValue("status", data.status);
          });
        }
        console.log({ response });
        // try {
        //   material.map((item: any) => {
        //     axiosInstance.put(
        //       `/inventory/submission/delivery-management/delivery-note/delivery-note-material/${item.id}`,
        //       {
        //         amount: item.amount,
        //       }
        //     );
        //   });
        // } catch (error) {
        //   console.error("Gagal menyimpan data:", error);
        //   setIsFailedModalVisible(true);
        // }
        setIsModalVisible(true);
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

  // if (mode === "edit" && status !== "Draft") return null;

  return (
    <div className="font-secondary">
      {isSubmitting && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Retur</h3>
          <div className="row">
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Jenis Retur"
                name=""
                label="Jenis Retur"
                control={control}
                options={[
                  {
                    label: "Pembelian",
                    value: "Pembelian",
                  },
                  {
                    label: "Pembelian",
                    value: "Pembelian",
                  },
                ]}
                errors={errors}
              />
              <Controller
                name="delivery_date"
                control={control}
                render={({ field: dateField }) => (
                  <DateInputField
                    label="Tanggal Retur"
                    value={dateField.value}
                    onChange={(value) => dateField.onChange(new Date(value))}
                    error={errors.delivery_date?.message}
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Opsi Pengembalian"
                name=""
                label="Opsi Pengembalian"
                control={control}
                options={[
                  {
                    label: "Barang",
                    value: "Barang",
                  },
                  {
                    label: "Account",
                    value: "Account",
                  },
                ]}
                errors={errors}
              />
              <SelectField
                placeholder="Pilih Nomor Purchase Order"
                name=""
                label="Nomor Purchase Order"
                control={control}
                options={[
                  {
                    label: "PO-1",
                    value: "PO-1",
                  },
                  {
                    label: "PO-2",
                    value: "PO-2",
                  },
                ]}
                errors={errors}
              />
            </div>
          </div>
        </div>

        {/* <MaterialTableLayout setMaterial={setMaterial} material={material} /> */}

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
            disabled={!isValid || isSubmitting}
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
            handleSubmit={handleConfirm}
            closeModal={() => setIsModalVisible(false)}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              if (mode === "create") {
                navigate(
                  `/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman/detail/${newId}`
                );
              }
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
