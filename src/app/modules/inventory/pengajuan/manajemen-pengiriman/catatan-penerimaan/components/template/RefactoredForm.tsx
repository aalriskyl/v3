import { FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ID } from "@metronic/helpers";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import DateInputField from "../molecules/field/DateInputField";
import {
  getAllPurchaseOrder,
  createReceivedNote,
  getAllWarehouse,
  getAllPurchaseOrderSelect,
} from "../../core/_request";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";
import axiosInstancePar from "../../../../../../../../service/axiosInstanceNoCompany";

interface ValidationData extends Record<string, any> {
  received_type: string;
  type: string;
  warehouse_id: string;
  purchase_order_number?: string;
  retur_sales_id?: string;
  delivery_note_id?: string;
}

interface FormData {
  received_type: string;
  type: string;
  warehouse_id: string;
  purchase_order_number?: string;
  retur_sales_id?: string;
  delivery_note_id?: string;
  // Optional fields that aren't validated
  id?: ID;
  supplier_id?: string;
  customer_id?: string;
  received_date?: Date;
  delivery_type?: string;
  notes?: string;
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

interface DeliveryNoteOption {
  value: string;
  label: string;
  type: string;
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
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmData, setConfirmData] = useState<any | null>(null);
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState<
    {
      value: string;
      label: string;
      type: string;
      supplier_id: string;
      supplier_name: string;
      is_company_id: boolean;
    }[]
  >([]);
  const [warehouseOptions, setWarehouseOptions] = useState<
    { value: string; label: string }[]
  >([]);
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
  const [deliveryNoteOptions, setDeliveryNoteOptions] = useState<
    DeliveryNoteOption[]
  >([]);
  const [showDeliveryNoteField, setShowDeliveryNoteField] = useState(false);
  const [showNotesField, setShowNotesField] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    received_type: Yup.string().required("Jenis Pengiriman harus dipilih"),
    type: Yup.string().required("Tipe harus dipilih"),
    warehouse_id: Yup.string().required("Gudang harus dipilih"),
    purchase_order_number: Yup.string().when("received_type", {
      is: (val: string) => val === "Standard",
      then: (schema) => schema.required("Nomor Purchase Request harus dipilih"),
    }),
    retur_sales_id: Yup.string().when("received_type", {
      is: (val: string) => val === "Retur",
      then: (schema) => schema.required("Nomor Retur Penjualan harus dipilih"),
    }),
    delivery_note_id: Yup.string().when(
      ["received_type", "purchase_order_number"],
      {
        is: (received_type: string, purchase_order_number: string) => {
          if (received_type !== "Standard") return false;
          const selectedOrder = purchaseOrderOptions.find(
            (po) => po.value === purchase_order_number
          );
          return selectedOrder?.is_company_id;
        },
        then: (schema) => schema.required("Catatan Pengiriman harus dipilih"),
      }
    ),
  });

  // Then in your useForm hook:
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      type: "",
      supplier_id: "",
      customer_id: "",
      purchase_order_number: "",
      warehouse_id: "",
      delivery_type: "Standard",
      retur_sales_id: "",
      received_type: "",
      delivery_note_id: "",
    },
  });

  const type = watch("type");
  const received_type = watch("received_type");
  const purchaseOrderNumber = watch("purchase_order_number");
  const delivery_note_id = watch("delivery_note_id");

  useEffect(() => {
    if (mode === "edit" && id) {
      setIsLoading(true);
      const fetchReceivedNote = async () => {
        try {
          const response = await axiosInstance.get(
            `/inventory/submission/delivery-management/received-note/${id}`
          );
          const rn = response.data.data;
          const formData: FormData = {
            // id: rn.id,
            supplier_id: rn.supplier?.id,
            customer_id: rn.customer?.id,
            purchase_order_number: rn.purchase_order?.id,
            warehouse_id: rn.warehouse?.id,
            received_date: new Date(rn.received_date),
            type: rn.type,
            received_type: rn.received_type,
            delivery_type: rn.delivery_type,
            retur_sales_id: rn.retur_sales_id,
            delivery_note_id: rn.delivery_note?.id,
          };

          reset(formData);

          // Check if we need to show delivery note field
          if (rn.purchase_order?.supplier?.is_company_id) {
            setShowDeliveryNoteField(true);
            fetchDeliveryNotes(rn.purchase_order.id, "Standard");
          }
        } catch (error) {
          console.error("Failed to fetch received note:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReceivedNote();
    }
  }, [mode, id, reset]);

  const fetchDeliveryNotes = async (
    purchaseOrderId: string,
    deliveryType: string
  ) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/inventory/submission/delivery-management/delivery-note/select?purchase_order_id=${purchaseOrderId}&delivery_type=${deliveryType}`
      );
      console.log(response.data);
      const options = response.data.data.map((note: any) => ({
        value: note.id,
        label: note.no_delivery_note,
        type: note.type,
      }));
      setDeliveryNoteOptions(options);
    } catch (error) {
      console.error("Failed to fetch delivery notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data retur penjualan berdasarkan tipe
  useEffect(() => {
    const fetchReturSales = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/inventory/submission/delivery-management/retur-sales/select?type=${type}`
        );
        const returSalesData = response.data.data.map((item: any) => ({
          label: item.no_retur_sales,
          value: item.id,
          customer_id: item.sales_order?.customer?.id,
          customer_name: item.sales_order?.customer?.name,
        }));
        setReturSalesOptions(returSalesData);

        const customerOptions = returSalesData.map((item: any) => ({
          value: item.customer_id,
          label: item.customer_name,
        }));
        setCustomerOptions(customerOptions);
      } catch (error) {
        console.error("Gagal mengambil data retur penjualan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (received_type === "Retur") {
      fetchReturSales();
    }
  }, [type, received_type]);

  // Fetch data Purchase Request dan warehouse
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPurchaseOrderSelect();
        const options = response.data.data.map((po: any) => ({
          value: po.id,
          label: po.no_purchase_order,
          type: po.type,
          supplier_id: po.supplier.id,
          is_company_id: po.supplier.is_company_id,
          supplier_name: po.supplier.name,
        }));
        setPurchaseOrderOptions(options);
        const customerOptions = options.map((item: any) => ({
          value: item.supplier_id,
          label: item.supplier_name,
        }));
        setCustomerOptions(customerOptions);
      } catch (error) {
        console.error("Failed to fetch purchase orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchWarehouses = async () => {
      try {
        setIsLoading(true);
        const response = await getAllWarehouse();
        const options = response.data.warehouses.map((warehouse: any) => ({
          value: warehouse.id,
          label: warehouse.name,
        }));
        setWarehouseOptions(options);
      } catch (error) {
        console.error("Failed to fetch warehouses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchaseOrders();
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (mode === "edit" && id && purchaseOrderNumber) {
      const selectedOrder = purchaseOrderOptions.find(
        (po) => po.value === purchaseOrderNumber
      );
      if (selectedOrder) {
        setValue("type", selectedOrder.type);
        setValue("supplier_id", selectedOrder.supplier_id ?? "");
        setValue("customer_id", selectedOrder.supplier_id);

        // Check if supplier is company (is_company_id = true)
        if (selectedOrder.is_company_id) {
          setShowDeliveryNoteField(true);
          fetchDeliveryNotes(selectedOrder.value, "Standard");
        } else {
          setShowDeliveryNoteField(false);
        }
      }
    }
  }, [purchaseOrderNumber, purchaseOrderOptions, mode, id, setValue]);

  const handlePurchaseOrderChange = (value: string) => {
    const selectedOrder = purchaseOrderOptions.find((po) => po.value === value);
    if (selectedOrder) {
      setValue("type", selectedOrder.type);
      setValue("supplier_id", selectedOrder.supplier_id ?? "");
      setValue("customer_id", selectedOrder.supplier_id);

      // Check if supplier is company (is_company_id = true)
      if (selectedOrder.is_company_id) {
        setShowDeliveryNoteField(true);
        setShowNotesField(true);
        fetchDeliveryNotes(value, "Standard");
      } else {
        setShowDeliveryNoteField(false);
        setShowNotesField(false);
      }

      if (selectedOrder.type === "Warehouse") {
        setValue("warehouse_id", selectedOrder.supplier_id);
      }
    }
  };

  const handleReturSalesChange = (value: string) => {
    const selectedRetur = returSalesOptions.find((rs) => rs.value === value);
    if (selectedRetur) {
      setValue("customer_id", selectedRetur.customer_id);
    }
  };

  const onSubmit = (data: FormData) => {
    const payload: any = {
      received_type: data.received_type,
      warehouse_id: data.warehouse_id,
      type: data.type,
      purchase_order_id:
        received_type === "Standard" ? data.purchase_order_number : null,
      retur_sales_id: received_type === "Retur" ? data.retur_sales_id : null,
      customer_id: data.customer_id,
      supplier_id: data.received_type === "Standard" ? data.supplier_id : null,
      delivery_note_id: showDeliveryNoteField ? data.delivery_note_id : null,
    };

    setConfirmData(payload);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (confirmData) {
      setIsSubmitting(true);
      try {
        let response;
        if (mode === "edit" && id) {
          response = await axiosInstance.put(
            `/inventory/submission/delivery-management/received-note/${id}`,
            confirmData
          );
          if (response) {
            setIsSuccessModalVisible(true);
            navigate(`../detail/${id}`);
          }
        } else {
          const newId = await createReceivedNote(null, confirmData);
          if (newId) {
            setIsSuccessModalVisible(true);
            navigate(`../detail/${newId}`);
          }
        }
      } catch (error: any) {
        setFailedMessage(getErrorMessage(error));
        setIsFailedModalVisible(true);
      } finally {
        setIsSubmitting(false);
        setIsModalVisible(false);
      }
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      {!isLoading && !isSubmitting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-5 w-100 mb-8">
            <h3 className="mb-6">Catatan Penerimaan</h3>

            {/* Layout untuk Jenis Pengiriman Standard */}
            <div hidden={received_type !== "Standard" && received_type !== ""}>
              <div className="row">
                <div className="col-md-6">
                  <SelectField
                    placeholder="Pilih Jenis Pengiriman"
                    name="received_type"
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
                    placeholder="Pilih Nomor Purchase Request"
                    name="purchase_order_number"
                    label="Nomor Purchase Request"
                    control={control}
                    options={purchaseOrderOptions}
                    errors={errors}
                    onChange={handlePurchaseOrderChange}
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
                      { value: "Supplier", label: "External" },
                      { value: "Warehouse", label: "Internal" },
                    ]}
                    errors={errors}
                    disabled={!!purchaseOrderNumber}
                  />
                </div>
                <div className="col-md-6">
                  <SelectField
                    placeholder="Pilih Customer"
                    name="customer_id"
                    label="Customer"
                    control={control}
                    options={customerOptions}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
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
                {showDeliveryNoteField && (
                  <div className="col-md-6">
                    <SelectField
                      placeholder="Pilih Catatan Pengiriman"
                      name="delivery_note_id"
                      label="Catatan Pengiriman"
                      control={control}
                      options={deliveryNoteOptions}
                      errors={errors}
                    />
                  </div>
                )}
              </div>

              {/* Tambahan field untuk catatan pengiriman jika is_company_id true */}
            </div>

            {/* Layout untuk Jenis Pengiriman Retur */}
            <div hidden={received_type !== "Retur"}>
              <div className="row">
                <div className="col-md-6">
                  <SelectField
                    placeholder="Pilih Jenis Pengiriman"
                    name="received_type"
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
                      { value: "Customer", label: "Customer" },
                      { value: "Outlet", label: "Outlet" },
                    ]}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <SelectField
                    placeholder="Pilih Nomor Retur Penjualan"
                    name="retur_sales_id"
                    label="Nomor Retur Penjualan"
                    control={control}
                    options={returSalesOptions}
                    errors={errors}
                    onChange={handleReturSalesChange}
                  />
                </div>
                <div className="col-md-6">
                  <SelectField
                    placeholder="Pilih Customer"
                    name="customer_id"
                    label="Customer"
                    control={control}
                    options={customerOptions}
                    errors={errors}
                    disabled={true}
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
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default FormComponent;
