import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import MaterialDetailSectionLayout from "./MaterialDetailSectionLayout";
import LayananDetailSectionLayout from "./LayananDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../core/_models";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

interface FormData {
  // amount: string;
  // coa_payment_id: string;
  sales_invoice_id: string;
  payment_purchase_invoice_id?: string | null;
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
  sales_invoice_id: Yup.string().required("Sales Invoice is required"),
  payment_purchase_invoice_id: Yup.string().optional().nullable(),
  // amount: Yup.string().required("Amount is required"),
  // coa_payment_id: Yup.string().required("Payment is required"),
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
  const [data, setData] = useState<null | DataType>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newId, setNewId] = useState("");
  const navigate = useNavigate();

  const [salesInvoiceChoice, setSalesInvoiceChoice] = useState<
    SalesInvoiceChoiceType[]
  >([]);
  const [paymentPurchaseChoice, setPaymentPurchaseChoice] = useState<
    PaymentPurchaseChoiceType[]
  >([]);

  const [selectedSalesInvoice, setSelectedSalesInvoice] =
    useState<SalesInvoiceChoiceType | null>(null);

  useEffect(() => {
    axiosInstance
      .get(
        `/sales/submission/sales-invoice/select?company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        console.log({ getSelectSalesInvoice: res.data.data });
        setSalesInvoiceChoice(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedSalesInvoice) {
      axiosInstance
        .get(
          `/procurement/submission/payment-purchase-invoice/select?company_id=${localStorage.getItem(
            "company_id"
          )}&sales_invoice_id=${selectedSalesInvoice?.id}`
        )
        .then((res) => {
          console.log({ getSelectPOInvoice: res.data.data });
          setPaymentPurchaseChoice(res.data.data);
        });
    }
  }, [selectedSalesInvoice]);

  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      // coa_payment_id: "",
      // amount: "",
      sales_invoice_id: "",
    },
  });

  // const coa_payment_id = watch("coa_payment_id");
  // const amount = watch("amount");
  const sales_invoice_id = watch("sales_invoice_id");
  const payment_purchase_invoice_id = watch("payment_purchase_invoice_id");

  useEffect(() => {
    const findData = salesInvoiceChoice.find(
      (item) => item.id === sales_invoice_id
    );
    if (findData) {
      setSelectedSalesInvoice(findData);
    }
  }, [sales_invoice_id]);

  useEffect(() => {
    const findData = paymentPurchaseChoice.find(
      (item) => item.id === payment_purchase_invoice_id
    );
    console.log({ payment_purchase_invoice_id, findData });
    // if (findData) {
    //   setValue("amount", findData.amount.toString());
    // } else {
    //   if (!id) {
    //     setValue("amount", "");
    //   }
    // }
  }, [payment_purchase_invoice_id]);

  useEffect(() => {
    if (sales_invoice_id.length > 0) {
      axiosInstance
        .get(`/sales/submission/sales-invoice/${sales_invoice_id}`)
        .then((response) => {
          console.log({ getDetail: response.data.data });

          setData(response.data.data);
        });
    }
  }, [sales_invoice_id]);

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/sales/submission/payment-sales-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const { coa_payment, amount, sales_invoice, payment_purchase_invoice } =
        res.data.data as DetailView;
      // setValue("coa_payment_id", coa_payment?.id);
      // setValue("amount", amount.toString());
      setValue("sales_invoice_id", sales_invoice.id);
      setValue("payment_purchase_invoice_id", payment_purchase_invoice?.id);
      console.log({ getData: res.data.data });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        // coa_payment_id: coa_payment_id,
        // amount: parseFloat(amount),
        sales_invoice_id,
        payment_purchase_invoice_id:
          payment_purchase_invoice_id && payment_purchase_invoice_id?.length > 0
            ? payment_purchase_invoice_id
            : null,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/sales/submission/payment-sales-invoice/?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/sales/submission/payment-sales-invoice/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        await getData();
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

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsModalVisible(true);
        }}
      >
        <div className="w-100">
          <div className="card p-5">
            <div className="row g-6">
              <h3 className="mb-2">{formTitle}</h3>
              <div
                className={`col-md-${
                  selectedSalesInvoice?.sales_order?.purchase_order_id
                    ? "6"
                    : "12"
                }`}
              >
                <SelectField
                  name="sales_invoice_id"
                  label="Nomor Sales Invoice"
                  control={control}
                  errors={errors}
                  options={salesInvoiceChoice.map((item) => ({
                    label: item.no_sales_invoice,
                    value: item.id,
                  }))}
                  placeholder="Pilih nomor sales invoice"
                />
              </div>
              {selectedSalesInvoice?.sales_order?.purchase_order_id && (
                <div className="col-md-6">
                  <SelectField
                    name="payment_purchase_invoice_id"
                    label="Payment Purchase Invoice"
                    control={control}
                    errors={errors}
                    isRequired={false}
                    options={paymentPurchaseChoice.map((item) => ({
                      label: item.no_payment_purchase_invoice,
                      value: item.id,
                    }))}
                    placeholder="Pilih payment purchase invoice"
                  />
                </div>
              )}
            </div>
            {/* <div className="row g-6">
              <div className="col-md-6">
                <InputField
                  disabled={
                    payment_purchase_invoice_id &&
                    payment_purchase_invoice_id?.length > 0
                  }
                  name="amount"
                  label="Amount"
                  type="number"
                  control={control}
                  errors={errors}
                  placeholder="Masukkan amount"
                />
              </div>
              <div className="col-md-6">
                <SelectField
                  name="coa_payment_id"
                  label="Metode pembayaran"
                  control={control}
                  errors={errors}
                  options={coaChoice.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="Pilih metode pembayaran"
                />
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Payment Terms</h4>
          <div className="row">
            <div className="col-md-6">
              <div>
                <h6>Nama Payment Terms</h6>
              </div>
              <span>{data?.sales_payment_terms.name}</span>
            </div>
            <div className="col-md-6">
              <div>
                <h6>Invoice Portion</h6>
              </div>
              <span>{data?.invoice_portion}%</span>
            </div>
          </div>
          <div className="row mt-8">
            <div className="col-md-6">
              <div>
                <h6>Due Date</h6>
              </div>
              <span>
                {data?.due_date ? formatDateToMonthYear(data?.due_date) : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Pajak</h4>
          <div className="row">
            <div className="col-md-6">
              <div>
                <h6>Presentase Pajak</h6>
              </div>
              <span>{data?.percent_tax}%</span>
            </div>
            <div className="col-md-6">
              <div>
                <h6>Nominal Pajak</h6>
              </div>
              <span>Rp.{formatDecimal(data?.nominal_tax)}</span>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Harga Keseluruhan</h4>
          <div className="row">
            <div className="col-md-12 align-items-center">
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Harga Material</span>
                </div>
                <h6>
                  Rp.
                  {formatDecimal(data?.total_purchase_material)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Harga Layanan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_purchase_service)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Material</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_material)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Layanan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_service)}</h6>
              </div>

              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total</span>
                </div>
                <h6>
                  Rp.
                  {formatDecimal(data?.sub_total)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Dengan Pajak</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_tax)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Nominal Pembulatan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_ceil)}</h6>
              </div>
              <hr className="my-6 border-top border-gray-500" />
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div>
                  <h4>Grand Total</h4>
                </div>
                <h4 className="fw-bolder">
                  Rp.{formatDecimal(data?.grand_total)}
                </h4>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Sudah Di bayar</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_paid)}</h6>
              </div>

              <div className="d-flex col-md-12">
                <div className="text-black"></div>
              </div>
              <div
                className="position-relative"
                style={{ bottom: "5px", fontSize: "10px" }}
              ></div>
              <hr className="mb-6 border-top border-gray-500" />
              <div className="g-2 mb-2 d-flex justify-content-between align-items-center">
                <div>
                  <h6>Sisa Pembayaran</h6>
                </div>
                <h5 className="fw-bolder">
                  Rp.
                  {formatDecimal(
                    (data?.grand_total || 0) - (data?.total_paid || 0)
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div> */}

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
              disabled={!isValid || isLoading}
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
                  `/sales/pengajuan/pembayaran-faktur-penjualan/detail/${newId}`
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

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};

type DataType = {
  approved_by: {
    id: string;
    name: string;
  };
  approved_date: string;
  created_at: string;
  due_date: string;
  grand_total: number;
  id: string;
  invoice_portion: number;
  no_sales_invoice: string;
  nominal_tax: number;
  percent_tax: number;
  requested_by: {
    id: string;
    name: string;
  };
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  sales_payment_terms: {
    id: string;
    name: string;
  };
  status: string;
  status_payment: string;
  sub_total: number;
  sub_total_material: number;
  sub_total_service: number;
  sub_total_tax: number;
  total_ceil: number;
  total_paid: number;
  total_purchase_material: number;
  total_purchase_service: number;
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

type PaymentPurchaseChoiceType = {
  amount: number;
  id: string;
  no_payment_purchase_invoice: string;
  status: string;
};

type CoaChoiceType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: null | any;
  status: boolean;
  type: string;
};
