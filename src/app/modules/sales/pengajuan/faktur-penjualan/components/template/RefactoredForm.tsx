import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import axiosInstance from "../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../core/_models";
import DateInputField from "../../../../../inventory/pengajuan/manajemen-pengiriman/catatan-penerimaan/components/molecules/field/DateInputField";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  sales_order_id: string;
  sales_payment_terms_id: string;
  invoice_type: "Standard" | "Retur" | "";
  retur_sales_id: string;
  type: "Outlet" | "Customer" | "";
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
  sales_payment_terms_id: Yup.string().required(
    "Sales Order Number is required"
  ),
  sales_order_id: Yup.string().required("Payment Terms is required"),
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
  const [salesOrderChoice, setSalesOrderChoice] = useState<
    SalesOrderChoiceType[]
  >([]);
  const [termsSoChoice, setTermsSoChoice] = useState<TermsSoChoiceType[]>([]);
  const [selectedSo, setSelectedSo] = useState<SalesOrderChoiceType | null>(
    null
  );

  const [returSalesChoice, setReturSalesChoice] = useState<
    ReturSalesChoiceType[] | null
  >(null);

  useEffect(() => {
    axiosInstance
      .get(`/sales/submission/sales-order/select?type=`)
      .then((res) => {
        console.log({ getSelectSo: res.data.data });
        setSalesOrderChoice(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedSo) {
      axiosInstance
        .get(
          `/accounting/management-transaction/account-receivable/sales-payment-terms/select/?sales_order_id=${selectedSo?.id}`
        )
        .then((res) => {
          console.log({ getSelectSoTerms: res.data.data });
          setTermsSoChoice(res.data.data);
        });
    }
  }, [selectedSo]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      sales_order_id: "",
      sales_payment_terms_id: "",
      invoice_type: "",
      retur_sales_id: "",
      type: "",
    },
  });

  const sales_order_id = watch("sales_order_id");
  const sales_payment_terms_id = watch("sales_payment_terms_id");
  const invoice_type = watch("invoice_type");
  const retur_sales_id = watch("retur_sales_id");
  const type = watch("type");

  useEffect(() => {
    if (type !== "") {
      axiosInstance
        .get(
          `/inventory/submission/delivery-management/retur-sales/select?retur_option=Dana&type=${type}`
        )
        .then((res) => {
          console.log({ getSelectReturSales: res.data.data });
          setReturSalesChoice(res.data.data);
        });
    }
  }, [type]);

  useEffect(() => {
    const findData = salesOrderChoice.find(
      (item) => item.id === sales_order_id
    );
    if (findData) {
      setSelectedSo(findData);
    }
  }, [sales_order_id, salesOrderChoice]);

  useEffect(() => {
    const findData = returSalesChoice?.find(
      (item) => item.id === retur_sales_id
    );
    if (findData) {
      setValue("sales_order_id", findData.sales_order.id);
    }
  }, [retur_sales_id, returSalesChoice]);

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/sales/submission/sales-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const { sales_order, sales_payment_terms, invoice_type, retur_sales } =
        res.data.data as DetailView;
      setValue(
        "type",
        sales_order.customer.is_a_company ? "Outlet" : "Customer"
      );
      setValue("sales_order_id", sales_order?.id);
      setValue("sales_payment_terms_id", sales_payment_terms?.id || "");
      setValue("retur_sales_id", retur_sales?.id || "");
      setValue("invoice_type", invoice_type as any);
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
        sales_order_id,
        sales_payment_terms_id:
          invoice_type === "Standard" ? sales_payment_terms_id : null,
        retur_sales_id: invoice_type === "Retur" ? retur_sales_id : null,
        invoice_type,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/sales/submission/sales-invoice/?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/sales/submission/sales-invoice/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        await getData();
      }
      setIsSuccessModalVisible(true);
    } catch (error: any) {
          setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      { label: "Outlet", value: "Outlet" },
                      { label: "Customer", value: "Customer" },
                    ]}
                    placeholder="Pilih tipe"
                  />
                </div>
              )}
            </div>
            <div className="row g-6">
              {invoice_type === "Retur" && type !== "" && (
                <div className="col-md-6">
                  <SelectField
                    name="retur_sales_id"
                    label="Retur Penjualan"
                    control={control}
                    errors={errors}
                    options={returSalesChoice?.map((item) => ({
                      label: item.no_retur_sales,
                      value: item.id,
                    }))}
                    placeholder="Pilih retur penjualan"
                  />
                </div>
              )}
              {invoice_type === "Retur" && type !== "" && (
                <div className="col-md-6">
                  <SelectField
                    disabled
                    name="sales_order_id"
                    label="Nomor Request Order"
                    control={control}
                    errors={errors}
                    options={salesOrderChoice.map((item) => ({
                      label: item.no_sales_order,
                      value: item.id,
                    }))}
                    placeholder="Pilih nomor request order"
                  />
                </div>
              )}
              {invoice_type === "Standard" && (
                <div className="col-md-6">
                  <SelectField
                    disabled={mode === "edit"}
                    name="sales_order_id"
                    label="Nomor Request Order"
                    control={control}
                    errors={errors}
                    options={salesOrderChoice.map((item) => ({
                      label: item.no_sales_order,
                      value: item.id,
                    }))}
                    placeholder="Pilih nomor request order"
                  />
                </div>
              )}
              {invoice_type === "Standard" && (
                <div className="col-md-6">
                  <SelectField
                    name="sales_payment_terms_id"
                    label="Nama Payment Terms"
                    control={control}
                    errors={errors}
                    options={termsSoChoice.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    placeholder="Pilih payment terms"
                  />
                </div>
              )}
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
  {failedMessage && (
          <FailedModal
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
          />
      )}
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

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              if (mode === "create") {
                navigate(`/sales/pengajuan/faktur-penjualan/detail/${newId}`);
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

type SalesOrderChoiceType = {
  customer: {
    id: string;
    name: string;
  };
  id: string;
  no_sales_order: string;
  status: string;
  supplier: {
    id: string;
    name: string;
    is_company_id: string | null;
  };
  type: string;
};

type TermsSoChoiceType = {
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

type ReturSalesChoiceType = {
  approved_date: string;
  delivery_note: null;
  id: string;
  no_retur_sales: string;
  retur_purchase: {
    id: string;
    no_retur_purchase: string;
  };
  sales_order: {
    customer: {
      id: string;
      is_a_company: boolean;
      is_company_id: string;
      name: string;
    };
    id: string;
    no_sales_order: string;
  };
  status: string;
};
