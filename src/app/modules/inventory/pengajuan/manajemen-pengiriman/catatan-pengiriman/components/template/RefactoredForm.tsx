/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
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
  getAllReturPembelian,
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
  delivery_type: string;
  retur_purchase_id?: string; // Tambahkan field retur_id
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

interface ReturPembelian {
  id: string;
  no_retur_purchase: string; // Ensure this matches the actual property name in the API response
}

// const validationSchema = Yup.object().shape({
//   id: Yup.number().nullable().optional(),
//   type: Yup.string().required("Tipe wajib diisi"),
//   customer_id: Yup.string().required("Konsumen wajib diisi"),
//   sales_order_id: Yup.string().when("delivery_type", {
//     is: "Normal",
//     then: Yup.string().required("Nomor Sales Order wajib diisi"),
//     otherwise: Yup.string().nullable().optional(),
//   }),
//   retur_id: Yup.string().when("delivery_type", {
//     is: "Retur",
//     then: Yup.string().required("Nomor Retur Pembelian wajib diisi"),
//     otherwise: Yup.string().nullable().optional(),
//   }),
//   warehouse_id: Yup.string().required("Warehouse wajib diisi"),
//   delivery_type: Yup.string().required("Tipe Delivery wajib diisi"),
//   delivery_date: Yup.date().required("Tanggal Pengiriman wajib diisi"),
// });

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

interface ReturPembelian {
  id: string;
  no_retur: string;
  type: string;
  customer_id: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [material, setMaterial] = useState<MaterialManajemenPengeriman[]>([]);
  const [salesOrderChoice, setSalesOrderChoice] = useState<any[]>([]);
  const [customerChoice, setCustomerChoice] = useState([]);
  const [outletChoice, setOutletChoice] = useState([]);
  const [warehouseChoice, setWarehouseChoice] = useState([]);
  const [returChoice, setReturChoice] = useState<any[]>([]);
  const [newId, setNewId] = useState("");
  const [supplierOptions, setSupplierOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [returSalesOptions, setReturSalesOptions] = useState<
    {
      value: string;
      label: string;
      customer_id: string;
      customer_name: string;
    }[]
  >([]);
  const [customerOptions, setCustomerOptions] = useState<
    { value: string; label: string }[]
  >([]);
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
      type: "",
      customer_id: "",
      sales_order_id: "",
      warehouse_id: "",
      delivery_type: "",
      delivery_date: new Date(),
      retur_purchase_id: "",
    },
  });

  const type = watch("type");
  const customer_id = watch("customer_id");
  const sales_order_id = watch("sales_order_id");
  const warehouse_id = watch("warehouse_id");
  const delivery_type = watch("delivery_type");
  const delivery_date = watch("delivery_date");
  const retur_purchase_id = watch("retur_purchase_id");
  const status = watch("status");

  // Fetch data sales order dan retur
  useEffect(() => {
    getAllSalesOrderApproved().then((data) => {
      const updatedSalesOrderChoice = data.map((order: any) => ({
        id: order.id,
        no_sales_order: order.no_sales_order,
        type: order.customer.is_a_company ? "Outlet" : "Customer",
        customer_id: order.customer?.id,
        customer_name: order.customer?.name, // Determine type based on is_a_company
        // You can add other properties if needed
      }));
      setSalesOrderChoice(updatedSalesOrderChoice);
    });
  }, []);

  useEffect(() => {
    const fetchReturPembelian = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/inventory/submission/delivery-management/retur-purchase/select?type=${type}`
        );
        const returData = response.data.data.map((item: any) => ({
          value: item.id,
          label: item.no_retur_purchase,
          purchase_order: item.purchase_order,
        }));
        setReturChoice(returData);
      } catch (error) {
        console.error("Gagal mengambil data retur pembelian:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (delivery_type === "Retur") {
      fetchReturPembelian();
    }
  }, [delivery_type, type]);

  // Handle perubahan pada select field retur pembelian
  useEffect(() => {
    if (retur_purchase_id && delivery_type === "Retur") {
      const selectedRetur = returChoice.find(
        (retur) => retur.value === retur_purchase_id
      );
      if (selectedRetur) {
        const supplier = selectedRetur.purchase_order.supplier;
        setValue("customer_id", supplier.id); // Set supplier id
        // setValue("type", ""); // Set type to Supplier

        // Update supplier options
        setSupplierOptions([
          {
            value: supplier.id,
            label: supplier.name,
          },
        ]);
      }
    }
  }, [retur_purchase_id, delivery_type, returChoice, setValue]);

  useEffect(() => {
    if (sales_order_id && delivery_type === "Standard") {
      const selectedOrder = salesOrderChoice.find(
        (order) => order.id === sales_order_id
      );
      if (selectedOrder) {
        // Set the customer_id and type based on the selected sales order
        setValue("customer_id", selectedOrder.customer_id);
        setValue("type", selectedOrder.type);
      }
    }
  }, [sales_order_id, delivery_type, salesOrderChoice, setValue]);

  // Fetch data customer, outlet, dan warehouse
  useEffect(() => {
    axiosInstance
      .get(
        `/sales/master-data/customer/select?is_a_company=false&company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        setCustomerChoice(
          res.data.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        );
      });
    axiosInstance
      .get(
        `/sales/master-data/customer/select?is_a_company=true&company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        setOutletChoice(
          res.data.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        );
      });
    axiosInstance
      .get(
        `/inventory/master-data/warehouse?company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        setWarehouseChoice(
          res.data.data.warehouses.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        );
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Exit if no ID is provided
      try {
        const data = await getSinglePengiriman(id);
        // Log the fetched data for debugging
        console.log("Fetched Data:", data);
        // Safely set form values using optional chaining
        if (data) {
          setValue("customer_id", data.data?.customer?.id || "");
          setValue("delivery_type", data.data?.delivery_type);
          setValue("sales_order_id", data.data?.sales_order?.id || "");
          setValue("type", data.data?.type || "");
          setValue("warehouse_id", data.data?.warehouse?.id || "");
          setValue("retur_purchase_id", data.data?.retur_purchase?.id || "");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id, setValue]); // Add setValue as a dependency

  // useEffect(() => {
  //   if (delivery_type === "Retur") {
  //     // Jika jenis pengiriman adalah Retur, set tipe ke "Supplier" atau "Warehouse"
  //     setValue("type", ""); // Atau "Warehouse" tergantung kebutuhan
  //   } else if (delivery_type === "Standard") {
  //     // Jika jenis pengiriman adalah Standard, reset tipe ke nilai default
  //     setValue("type", "");
  //   }
  // }, [delivery_type]);

  useEffect(() => {
    if (sales_order_id && delivery_type === "Standard") {
      const selectedOrder = salesOrderChoice.find(
        (order) => order.id === sales_order_id
      );
      if (selectedOrder) {
        // Set the type based on the customer.is_a_company property
        setValue("type", selectedOrder?.type);
      }
    }
  }, [sales_order_id, delivery_type, salesOrderChoice]);

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
          customer_id: delivery_type === "Standard" ? customer_id : null,
          supplier_id:
            delivery_type === "Retur"
              ? returChoice.find((retur) => retur.value === retur_purchase_id)
                  ?.supplier_id
              : null, // Ambil supplier_id dari retur yang dipilih
          sales_order_id: delivery_type === "Standard" ? sales_order_id : null,
          retur_purchase_id:
            delivery_type === "Retur" ? retur_purchase_id : null,
          delivery_type,
          delivery_date,
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
            setValue("delivery_type", data.delivery_type);
            setValue("customer_id", data.customer_id);
            setValue("sales_order_id", data.sales_order_id);
            setValue("type", data.type);
            setValue("warehouse_id", data.warehouse_id);
            setValue("status", data.status);
            setValue("retur_purchase_id", data.retur_purchase_id);
          });
        }
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
      {isLoading && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Catatan Pengiriman</h3>

          {/* Layout untuk Jenis Pengiriman Standard */}
          <div hidden={delivery_type !== "Standard" && delivery_type !== ""}>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Jenis Pengiriman"
                  name="delivery_type"
                  label="Jenis Pengiriman"
                  control={control}
                  options={[
                    { value: "Standard", label: "Standard" },
                    { value: "Retur", label: "Retur" },
                  ]}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  disabled={mode === "edit"}
                  placeholder="Pilih Nomor Sales Order"
                  name="sales_order_id"
                  label="Nomor Sales Order"
                  control={control}
                  options={salesOrderChoice.map((item) => ({
                    label: item.no_sales_order,
                    value: item.id,
                  }))}
                  errors={errors}
                  onChange={(value) => {
                    const selectedOrder = salesOrderChoice.find(
                      (order) => order.id === value
                    );
                    if (selectedOrder) {
                      // Set the type based on the customer.is_a_company property
                      setValue(
                        "type",
                        selectedOrder?.type ? "Outlet" : "Customer"
                      );
                      setValue("customer_id", selectedOrder.customer_id);
                    }
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Tipe"
                  name="type"
                  label="Tipe"
                  control={control}
                  options={[
                    { value: "Customer", label: "Customer" },
                    { value: "Outlet", label: "Outlet" },
                  ]}
                  errors={errors}
                  disabled={true}
                />
              </div>
              {type && (
                <div className="col-md-6">
                  <SelectField
                    placeholder={`Pilih ${type}`}
                    name="customer_id"
                    label={type}
                    control={control}
                    options={type === "Outlet" ? outletChoice : customerChoice}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Gudang"
                  name="warehouse_id"
                  label="Gudang"
                  control={control}
                  options={warehouseChoice}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          {/* Layout untuk Jenis Pengiriman Retur */}
          <div hidden={delivery_type !== "Retur"}>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Jenis Pengiriman"
                  name="delivery_type"
                  label="Jenis Pengiriman"
                  control={control}
                  options={[
                    { value: "Standard", label: "Standard" },
                    { value: "Retur", label: "Retur" },
                  ]}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
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
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Nomor Retur Pembelian"
                  name="retur_purchase_id"
                  label="Nomor Retur Pembelian"
                  control={control}
                  options={returChoice}
                  errors={errors}
                />
              </div>
              {type && (
                <div className="col-md-6">
                  <SelectField
                    placeholder={`Pilih ${type}`}
                    name="customer_id"
                    label={type}
                    control={control}
                    options={supplierOptions}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              )}
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Gudang"
                  name="warehouse_id"
                  label="Gudang"
                  control={control}
                  options={warehouseChoice}
                  errors={errors}
                />
              </div>
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
              if (mode === "edit") {
                navigate(
                  `/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman/detail/${id}`
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
