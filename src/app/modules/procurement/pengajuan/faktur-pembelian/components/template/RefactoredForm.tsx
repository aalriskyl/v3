import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import MaterialDetailSectionLayout from "./MaterialDetailSectionLayout";
import LayananDetailSectionLayout from "./LayananDetailSectionLayout";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import axiosInstance from "../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../core/_models";
import DateInputField from "../../../purchase-order/components/molecules/field/DateInputField";
import clsx from "clsx";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  purchase_order_id: string;
  sales_invoice_id: string;
  purchase_payment_terms_id: string;
  createdBy: string;
  invoice_type: "Standard" | "Retur" | "";
  retur_purchase_id: string;
  type: "Warehouse" | "Supplier" | "";
}

interface FormProps {
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  formTitle?: string;
  headTitle: string;
  buttonTitle: string;
  submitButtonLabel?: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  purchase_order_id: Yup.string().required("Purchase Order Number is required"),
  sales_invoice_id: Yup.string().required("Sales Invoice is required"),
  purchase_payment_terms_id: Yup.string().required("Payment Terms is required"),
  invoice_type: Yup.string()
    .oneOf(["Standard", "Retur", ""])
    .required("Invoice Type is required"),
  createdBy: Yup.string().required("Created By is required"),
});

const Form: FC<FormProps> = ({
  defaultValues,
  successMessage,
  formTitle,
  headTitle,
  buttonTitle,
  submitButtonLabel,
  message,
  mode,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newId, setNewId] = useState("");
  const navigate = useNavigate();

  // const [createBy, setCreateBy] = useState<
  //   "Sales Invoice" | "Payment Terms" | ""
  // >("");

  const [preOrderChoice, setPreOrderChoice] = useState<preOrderChoiceType[]>(
    []
  );
  const [termsPoChoice, setTermsPoChoice] = useState<TermsPoChoiceType[]>([]);
  const [salesInvoiceChoice, setSalesInvoiceChoice] = useState<
    SalesInvoiceChoiceType[]
  >([]);

  const [selectedPo, setSelectedPo] = useState<preOrderChoiceType | null>(null);
  const [returPurchaseChoice, setReturPurchaseChoice] = useState<
    ReturPurchaseChoiceType[] | null
  >(null);

  // console.log({ createBy });

  // console.log({ selectedPo });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      purchase_order_id: "",
      sales_invoice_id: "",
      purchase_payment_terms_id: "",
      invoice_type: "",
      createdBy: "",
      retur_purchase_id: "",
      type: "",
    },
  });

  const purchase_order_id = watch("purchase_order_id");
  const sales_invoice_id = watch("sales_invoice_id");
  const purchase_payment_terms_id = watch("purchase_payment_terms_id");
  const invoice_type = watch("invoice_type");
  const retur_purchase_id = watch("retur_purchase_id");
  const createdBy = watch("createdBy");
  const type = watch("type");

  // /inventory/submission/delivery-management/retur-purchase/select?company_id=29fd249a-fe14-4ec9-a000-4f707710078c&retur_option=Dana

  useEffect(() => {
    if (type !== "") {
      axiosInstance
        .get(
          `/inventory/submission/delivery-management/retur-purchase/select?retur_option=Dana&type=${type}`
        )
        .then((res) => {
          console.log({ getSelectReturPurchase: res.data.data });
          setReturPurchaseChoice(res.data.data);
        });
    }
  }, [type]);

  useEffect(() => {
    if (selectedPo && !selectedPo.supplier.is_company_id) {
      setValue("createdBy", "Payment Terms");
    } else if (selectedPo && selectedPo.supplier.is_company_id) {
      setValue("createdBy", "Sales Invoice");
    }
  }, [selectedPo]);

  useEffect(() => {
    axiosInstance
      .get(
        `/procurement/submission/purchase-order/select?company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        console.log({ getSelectPo: res.data.data });
        setPreOrderChoice(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedPo) {
      axiosInstance
        .get(
          `/accounting/management-transaction/account-payable/purchase-payment-terms/select?purchase_order_id=${selectedPo?.id}`
        )
        .then((res) => {
          console.log({ getSelectPoTerms: res.data.data });
          setTermsPoChoice(res.data.data);
        });
    }
    if (selectedPo) {
      axiosInstance
        .get(
          `/sales/submission/sales-invoice/select?purchase_order_id=${selectedPo?.id}`
        )
        .then((res) => {
          console.log({ getSelectSalesInvoice: res.data.data });
          setSalesInvoiceChoice(res.data.data);
        });
    }
  }, [selectedPo, createdBy, id]);

  console.log({ createdBy });

  useEffect(() => {
    const findData = preOrderChoice.find(
      (item) => item.id === purchase_order_id
    );
    if (findData) {
      setSelectedPo(findData);
    }
  }, [purchase_order_id, preOrderChoice]);

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/procurement/submission/purchase-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const {
        purchase_order,
        purchase_payment_terms,
        sales_invoice,
        invoice_type,
        retur_purchase,
      } = res.data.data as DetailView;
      setValue("purchase_order_id", purchase_order?.id);
      setValue(
        "type",
        purchase_order.supplier.is_a_company ? "Warehouse" : "Supplier"
      );
      setValue("retur_purchase_id", retur_purchase?.id || "");
      setValue("purchase_payment_terms_id", purchase_payment_terms?.id || "");
      setValue("sales_invoice_id", sales_invoice?.id || "");
      setValue("invoice_type", invoice_type as any);
      console.log({ sales_invoice });
      if (sales_invoice) {
        setValue("createdBy", "Sales Invoice");
      } else {
        setValue("createdBy", "Payment Terms");
      }
      // setValue("top_id", top_id);
      console.log({ getData: res.data.data });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        purchase_order_id,
        sales_invoice_id:
          sales_invoice_id.length > 0 && invoice_type === "Standard"
            ? sales_invoice_id
            : null,
        purchase_payment_terms_id:
          purchase_payment_terms_id.length > 0 && invoice_type === "Standard"
            ? purchase_payment_terms_id
            : null,
        retur_purchase_id:
          invoice_type === "Retur" && invoice_type.length > 0
            ? retur_purchase_id
            : null,
        invoice_type,
      };
      // console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/procurement/submission/purchase-invoice/?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/procurement/submission/purchase-invoice/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        await getData();
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error) {
      setIsModalVisible(false);
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="w-100">
          <div className="card p-5">
            <div className="row g-6">
              <h3 className="mb-2">{formTitle}</h3>
              <div
                className={`col-md-${invoice_type === "Retur" ? "6" : "12"}`}
              >
                <SelectField
                  name="invoice_type"
                  label="Tipe Pembelian"
                  control={control}
                  errors={errors}
                  options={[
                    { label: "Standard", value: "Standard" },
                    { label: "Retur", value: "Retur" },
                  ]}
                  placeholder="Pilih tipe pembelian"
                />
              </div>
              {invoice_type === "Retur" && (
                <div className="col-md-6">
                  <SelectField
                    name="type"
                    label="Tipe"
                    control={control}
                    errors={errors}
                    options={[
                      { label: "Internal", value: "Warehouse" },
                      { label: "External", value: "Supplier" },
                    ]}
                    placeholder="Pilih tipe"
                  />
                </div>
              )}
            </div>

            {invoice_type !== "" && (
              <div className="row g-6">
                <div
                  className={`col-md-${invoice_type === "Retur" ? "12" : "6"}`}
                >
                  <SelectField
                    disabled={mode === "edit"}
                    name="purchase_order_id"
                    label="Nomor Purchase Request"
                    control={control}
                    errors={errors}
                    options={preOrderChoice.map((item) => ({
                      label: item.no_purchase_order,
                      value: item.id,
                    }))}
                    placeholder="Pilih nomor purchase request"
                  />
                </div>
                {invoice_type === "Standard" && (
                  <div className="col-md-6">
                    <SelectField
                      disabled
                      name="createdBy"
                      label="Buat Berdasarkan"
                      control={control}
                      errors={errors}
                      options={[
                        { label: "Sales Invoice", value: "Sales Invoice" },
                        { label: "Account Payable", value: "Payment Terms" },
                      ]}
                      placeholder="Buat Berdasarkan"
                    />
                  </div>
                )}
              </div>
            )}
            {invoice_type === "Standard" && (
              <div className="row g-6">
                {createdBy === "Payment Terms" && (
                  <div className="col-md-12">
                    <SelectField
                      name="purchase_payment_terms_id"
                      label="Nama Payment Terms"
                      control={control}
                      errors={errors}
                      options={termsPoChoice.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      placeholder="Pilih payment terms"
                    />
                  </div>
                )}
                {createdBy === "Sales Invoice" && (
                  <div className="col-md-12">
                    <SelectField
                      name="sales_invoice_id"
                      label="Sales Invoice"
                      control={control}
                      errors={errors}
                      options={salesInvoiceChoice.map((item) => ({
                        label: item.no_sales_invoice,
                        value: item.id,
                      }))}
                      placeholder="Pilih sales invoice"
                    />
                  </div>
                )}
              </div>
            )}
            {invoice_type === "Retur" && type !== "" && (
              <div className="row g-6">
                <div className="col-md-12">
                  <SelectField
                    name="retur_purchase_id"
                    label="Retur Pembelian"
                    control={control}
                    errors={errors}
                    options={returPurchaseChoice?.map((item) => ({
                      label: item.no_retur_purchase,
                      value: item.id,
                    }))}
                    placeholder="Pilih retur pembelian"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={isLoading}
            >
              {submitButtonLabel || buttonTitle}
            </button>
          </div>
        </div>

        {isModalVisible && (
          <ConfirmModal
            handleSubmit={onSubmit}
            closeModal={() => setIsModalVisible(false)}
            headTitle={headTitle}
            confirmButtonLabel={buttonTitle}
            buttonTitle={"Submit"}
            cancelButtonLabel="Batalkan"
            message={message}
          />
        )}

        {failedMessage && (
          <FailedModal
            closeModal={() => setFailedMessage(null)}
            message={failedMessage}
            confirmLabel={buttonTitle}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              if (mode === "create") {
                navigate(
                  `/procurement/pengajuan/faktur-pembelian/detail/${newId}`
                );
              }
            }}
            successMessage={successMessage || "Form submitted successfully!"}
          />
        )}
      </form>
    </div>
  );
};

export default Form;

type preOrderChoiceType = {
  customer: {
    id: string;
    name: string;
  };
  id: string;
  no_purchase_order: string;
  status: string;
  supplier: {
    id: string;
    is_company_id: null | any;
    name: string;
  };
  type: string;
};

type TermsPoChoiceType = {
  id: string;
  name: string;
  invoice_portion: number;
  due_date: string;
  credit: number;
  description: string | null;
  account_receivable_id: string;
  company_id: string;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
};

type SalesInvoiceChoiceType = {
  due_date: string;
  grand_total: number;
  id: string;
  no_sales_invoice: string;
  sales_order: {
    id: string;
    no_sales_order: string;
    purchase_order_id: null;
  };
  status: string;
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
  retur_option: string;
  retur_sales: never[];
  status: string;
};
