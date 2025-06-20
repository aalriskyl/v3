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
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../core/_models";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";

interface FormData {
  // amount: string;
  // coa_payment_id: string;
  purchase_invoice_id: string;
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
  purchase_invoice_id: Yup.string().required("Purchase Invoice is required"),
  // amount: Yup.string().required(
  //   "Harus berupa angka tanpa koma dan tanpa satuan mata uang"
  // ),
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

  const [purchaseInvoiceChoice, setPurchaseInvoiceChoice] = useState<
    PurchaseInvoiceChoiceType[]
  >([]);

  const [coaChoice, setCoaChoice] = useState<CoaChoiceType[]>([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/procurement/submission/purchase-invoice/select?company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        console.log({ getSelectPoInvoice: res.data.data });
        setPurchaseInvoiceChoice(res.data.data);
      });

    axiosInstance
      .get(`/accounting/master-data/coa/select?payment=true`)
      .then((res) => {
        console.log({ getSelectCoa: res.data.data });
        const data = res.data.data;
        setCoaChoice(data);
      });
  }, []);

  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      // amount: "",
      // coa_payment_id: "",
      purchase_invoice_id: "",
    },
  });

  // const amount = watch("amount");
  // const coa_payment_id = watch("coa_payment_id");
  const purchase_invoice_id = watch("purchase_invoice_id");

  useEffect(() => {
    if (purchase_invoice_id.length > 0) {
      axiosInstance
        .get(`/procurement/submission/purchase-invoice/${purchase_invoice_id}`)
        .then((response) => {
          console.log({ getDetail: response.data.data });

          setData(response.data.data);
        });
    }
  }, [purchase_invoice_id]);

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/procurement/submission/payment-purchase-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const { coa_payment, amount, purchase_invoice } = res.data
        .data as DetailView;
      // setValue(
      //   "posting_date",
      //   new Date(posting_date).toISOString().split("T")[0]
      // );
      // setValue("coa_payment_id", coa_payment?.id);
      // setValue("amount", amount.toString());
      setValue("purchase_invoice_id", purchase_invoice.id);
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
        // amount: parseFloat(amount),
        // coa_payment_id,
        purchase_invoice_id,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/procurement/submission/payment-purchase-invoice/?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/procurement/submission/payment-purchase-invoice/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        await getData();
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
              <SelectField
                name="purchase_invoice_id"
                label="Nomor Purchase Invoice"
                control={control}
                errors={errors}
                options={purchaseInvoiceChoice.map((item) => ({
                  label: item.no_purchase_invoice,
                  value: item.id,
                }))}
                placeholder="Pilih nomor purchase invoice"
              />
              {/* <div className="col-md-6">
                {mode === "edit" && posting_date && (
                  <DateInputField
                    label="Tanggal Posting"
                    value={posting_date}
                    onChange={(date) =>
                      setValue("posting_date", date, { shouldValidate: true })
                    }
                  />
                )}
                {mode === "create" && (
                  <DateInputField
                    label="Tanggal Posting"
                    value={posting_date}
                    onChange={(date) =>
                      setValue("posting_date", date, { shouldValidate: true })
                    }
                  />
                )}
              </div> */}
            </div>
            {/* <div className="row g-6">
              <div className="col-md-6">
                <InputField
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
            {/* <div className="row g-6">
              <div className="col-md-6">
                <InputField
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
        {/* 
        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Payment Terms</h4>
          <div className="row">
            <div className="col-md-6">
              <div>
                <h6>Nama Payment Terms</h6>
              </div>
              <span>{data?.purchase_payment_terms?.name || "-"}</span>
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
              <div className="row">
                <div className="col-md-6">
                  <InputField
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
                  `/procurement/pengajuan/pembayaran-faktur-pembelian/detail/${newId}`
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
  no_purchase_invoice: string;
  nominal_tax: number;
  percent_tax: number;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  purchase_payment_terms: {
    id: string;
    name: string;
  };
  requested_by: {
    id: string;
    name: string;
  };
  sales_invoice: null | any;
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

type PurchaseInvoiceChoiceType = {
  due_date: string;
  grand_total: number;
  id: string;
  no_purchase_invoice: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  purchase_payment_terms: null | any;
  sales_invoice: {
    id: string;
    no_sales_invoice: string;
  };
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
