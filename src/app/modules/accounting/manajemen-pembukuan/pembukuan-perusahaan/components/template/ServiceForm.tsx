import { FC, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceSection } from "./section/ServiceSection";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { DetailView } from "../../core/_models";

// Yup schema
const schema = Yup.object().shape({
  float: Yup.string().required("Required"),
  income_tax: Yup.string().required("Required"),
  coa_material_id: Yup.string().required("Required"),
  coa_service_id: Yup.string().required("Required"),
  coa_sell_tax_id: Yup.string().required("Required"),
  coa_buy_tax_id: Yup.string().required("Required"),
  coa_ceil_id: Yup.string().required("Required"),
  coa_debt_id: Yup.string().required("Required"),
  coa_receivable_id: Yup.string().required("Required"),
  coa_payment_method_id: Yup.string().required("Required"),
  coa_retur_purchase_id: Yup.string().required("Required"),
  coa_retur_sales_id: Yup.string().required("Required"),
  coa_buy_income_tax_id: Yup.string().required("Required"),
  coa_sell_income_tax_id: Yup.string().required("Required"),
});

type FormData = {
  float: string;
  coa_material_id: string;
  coa_service_id: string;
  coa_sell_tax_id: string;
  coa_buy_tax_id: string;
  coa_ceil_id: string;
  coa_debt_id: string;
  coa_receivable_id: string;
  coa_payment_method_id: string;
  coa_retur_purchase_id: string;
  coa_retur_sales_id: string;
  income_tax: string;
  coa_buy_income_tax_id: string;
  coa_sell_income_tax_id: string;
};

type ServiceFormProps = {
  mode: "create" | "edit";
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
};

const ServiceForm: FC<ServiceFormProps> = ({
  mode,
  successMessage,
  headTitle,
  buttonTitle,
  message,
  confirmButtonLabel,
  cancelButtonLabel,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const handleConfirmData = useRef<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [newId, setNewId] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      float: "",
      coa_material_id: "",
      coa_service_id: "",
      coa_sell_tax_id: "",
      coa_buy_tax_id: "",
      coa_ceil_id: "",
      coa_debt_id: "",
      coa_receivable_id: "",
      coa_payment_method_id: "",
      coa_retur_purchase_id: "",
      coa_retur_sales_id: "",
      income_tax: "",
      coa_buy_income_tax_id: "",
      coa_sell_income_tax_id: "",
    },
  });

  const float = watch("float");
  const coa_material_id = watch("coa_material_id");
  const coa_service_id = watch("coa_service_id");
  const coa_sell_tax_id = watch("coa_sell_tax_id");
  const coa_buy_tax_id = watch("coa_buy_tax_id");
  const coa_ceil_id = watch("coa_ceil_id");
  const coa_debt_id = watch("coa_debt_id");
  const coa_receivable_id = watch("coa_receivable_id");
  const coa_payment_method_id = watch("coa_payment_method_id");
  const coa_retur_purchase_id = watch("coa_payment_method_id");
  const coa_retur_sales_id = watch("coa_payment_method_id");
  const income_tax = watch("income_tax");
  const coa_buy_income_tax_id = watch("coa_buy_income_tax_id");
  const coa_sell_income_tax_id = watch("coa_sell_income_tax_id");

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/accounting/management-accounting/company-coa/`
      );
      console.log({ getData: response.data.data });
      const data: DetailView | null = response.data.data;
      setValue("float", data?.tax.toString() || "");
      setValue("coa_material_id", data?.coa_material_id || "");
      setValue("coa_service_id", data?.coa_service_id || "");
      setValue("coa_buy_tax_id", data?.coa_buy_tax_id || "");
      setValue("coa_sell_tax_id", data?.coa_sell_tax_id || "");
      setValue("coa_ceil_id", data?.coa_ceil_id || "");
      setValue("coa_debt_id", data?.coa_debt_id || "");
      setValue("coa_receivable_id", data?.coa_receivable_id || "");
      setValue("coa_payment_method_id", data?.coa_payment_method_id || "");
      setValue("coa_retur_sales_id", data?.coa_retur_sales_id || "");
      setValue("coa_retur_purchase_id", data?.coa_retur_purchase_id || "");
      setValue("income_tax", data?.income_tax.toString() || "");
      setValue("coa_buy_income_tax_id", data?.coa_buy_income_tax.id || "");
      setValue("coa_sell_income_tax_id", data?.coa_sell_income_tax.id || "");
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      getData();
    }
  }, [mode, id, reset]);

  const onSubmit = (data: FormData) => {
    handleConfirmData.current = data;
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const payload = {
        tax: parseFloat(float),
        coa_material_id,
        coa_service_id,
        coa_sell_tax_id,
        coa_buy_tax_id,
        coa_ceil_id,
        coa_debt_id,
        coa_receivable_id,
        coa_payment_method_id,
        coa_retur_purchase_id,
        coa_retur_sales_id,
        income_tax: parseFloat(float),
        coa_buy_income_tax_id,
        coa_sell_income_tax_id,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/accounting/master-data/top?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit") {
        response = await axiosInstance.put(
          `/accounting/management-accounting/company-coa`,
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
          errorMessage = key.length > 2 ? `${key} : ${field[key]}` : null;
        });
        setFailedMessage(
          errorMessage !== null
            ? errorMessage
            : field || "Gagal membuat payment terms"
        );
        console.log({ errorMessage });
      }
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {(loading || isLoading) && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ServiceSection control={control} errors={errors}>
          {({ handleUpdateAction }) => (
            <div className="d-flex justify-content-end mb-8 mt-4">
              <button
                onClick={() => navigate("../")}
                type="button"
                className="btn border border-gray-500 px-12 py-2 me-4"
              >
                {cancelButtonLabel}
              </button>
              <button
                type="submit"
                className="btn btn-primary px-12 py-4"
                onClick={() => setIsModalVisible(true)}
                // disabled={!isValid}
              >
                {confirmButtonLabel}
              </button>
            </div>
          )}
        </ServiceSection>
      </form>

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          buttonTitle={confirmButtonLabel}
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
            if (mode === "edit") {
              navigate(`/accounting/manajemen-pembukuan/pembukuan-perusahaan`);
            }
            setIsSuccessModalVisible(false);
          }}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default ServiceForm;
