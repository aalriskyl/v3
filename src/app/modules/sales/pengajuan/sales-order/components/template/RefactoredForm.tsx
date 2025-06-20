/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form"; // Removed `watch` from import
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import MaterialSectionLayout from "./MaterialSectionLayout";
import LayananSectionLayout from "./LayananSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { getSingleSalesOrderById } from "../../core/_request";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import DateInputField from "../../../../../procurement/pengajuan/purchase-order/components/molecules/field/DateInputField";

interface FormData {
  purchase_order_number?: string;
  sales_order_number?: string;
  type: string;
  customer?: string;
  outlet?: string;
  posting_date: Date;
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
  purchase_order_number: Yup.string(),
  sales_order_number: Yup.string(),
  type: Yup.string().required("Tipe wajib dipilih"),
  customer: Yup.string().when("type", {
    is: "Customer",
    then: (schema) => schema.required("Customer wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
  outlet: Yup.string().when("type", {
    is: "Outlet",
    then: (schema) => schema.required("Outlet wajib dipilih"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// Mapping for material requests to purchase order numbers

const Form: FC<FormProps> = ({
  defaultValues,
  successMessage,
  headTitle,
  buttonTitle,
  message,
  mode,
}) => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [materialChoice, setMaterialChoice] = useState([]);
  const [layananChoice, setLayananChoice] = useState([]);
  const [customerChoice, setCustomerChoice] = useState([]);
  const [outletChoice, setOutletChoice] = useState([]);

  const [detailId, setDetailId] = useState<string>("");

  const [optionsPo, setOptionPo] = useState<
    { value: string; label: string; customerId: string }[]
  >([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: defaultValues || {
      purchase_order_number: "",
      sales_order_number: "",
      type: "",
      customer: "",
      outlet: "",
    },
  });

  const purchase_order_number = watch("purchase_order_number") || "";
  const sales_order_number = watch("sales_order_number");
  const type = watch("type");
  const customer = watch("customer");
  const outlet = watch("outlet");

  useEffect(() => {
    if (id) {
      getSingleSalesOrderById(id).then((data) => {
        setValue(
          "purchase_order_number",
          data.purchase_order ? data.purchase_order.id.id : ""
        );
        setValue("sales_order_number", data.no_sales_order);
        setValue("type", data.type);
        if (data.type === "Outlet") {
          setValue("outlet", data.customer.id);
        }
        if (data.type === "Customer") {
          setValue("customer", data.customer.id);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    axiosInstance
      .get(
        `/procurement/submission/purchase-order/select?is_company_id=${localStorage.getItem(
          "company_id"
        )}`
      )
      .then((res) => {
        setOptionPo(
          res.data.data.map((item: any) => ({
            value: item.id,
            label: item.no_purchase_order,
            customerId: item.customer.id,
          }))
        );
      });
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        type: watch("type"),
        customer_id: watch("customer") || watch("outlet"),
        purchase_order_id:
          (watch("purchase_order_number") || "").length > 0
            ? watch("purchase_order_number")
            : undefined,
        posting_date: data.posting_date
          ? new Date(data.posting_date).toISOString()
          : "", // Convert to ISO string
      };
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/sales/submission/sales-order?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setDetailId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/sales/submission/sales-order/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
      }
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
  }, []);

  useEffect(() => {
    if (purchase_order_number.length > 0) {
      setValue("type", "Outlet");
      const findData = optionsPo.find(
        (item) => item.value === purchase_order_number
      );
      if (findData) {
        setValue("outlet", findData.customerId);
      }
    }
  }, [purchase_order_number, optionsPo]);

  useEffect(() => {
    if (outletChoice.length > 0 && purchase_order_number.length > 0) {
      const findData = optionsPo.find(
        (item) => item.value === purchase_order_number
      );
      if (findData) {
        setValue("customer", findData.customerId);
      }
    }
  }, [outletChoice, purchase_order_number]);

  const handleConfirm = async () => {
    navigate(`/sales/pengajuan/sales-order/${detailId}`);
  };

  return (
    <div className="font-secondary">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100">
          <div className="row g-2">
            <h3 className="mb-6">Request Order</h3>
            <div className="col-md-6">
              <SelectField
                placeholder="Pilih Tipe"
                name="type"
                label="Tipe"
                disabled={purchase_order_number.length > 0}
                control={control}
                options={[
                  { value: "Customer", label: "Customer" },
                  { value: "Outlet", label: "Outlet" },
                ]}
                errors={errors}
              />
              {watch("type") !== "Customer" && (
                <SelectField
                  placeholder="Pilih Nomor Purchase Request"
                  name="purchase_order_number"
                  label="Nomor Purchase Request"
                  disabled={mode === "edit"}
                  control={control}
                  options={optionsPo.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  errors={errors}
                  isRequired={false}
                />
              )}

              {/* <Controller
                name="posting_date"
                control={control}
                render={({ field: dateField }) => (
                  <DateInputField
                    label="Tanggal Posting"
                    value={dateField.value}
                    onChange={(value) => dateField.onChange(value)} // Pass the value directly
                    error={errors.posting_date?.message}
                  />
                )}
              /> */}
            </div>
            <div className="col-md-6">
              {mode === "edit" && (
                <InputField
                  disabled
                  placeholder="Pilih Nomor Request Order"
                  name="sales_order_number"
                  label="Nomor Request Order"
                  control={control}
                  errors={errors}
                  isRequired={false}
                />
              )}

              {watch("type") === "Customer" && (
                <SelectField
                  placeholder="Pilih Customer"
                  name="customer"
                  label="Customer"
                  control={control}
                  options={customerChoice}
                  errors={errors}
                />
              )}

              {watch("type") === "Outlet" && (
                <SelectField
                  placeholder="Pilih Outlet"
                  name="outlet"
                  label="Outlet"
                  disabled={purchase_order_number.length > 0}
                  control={control}
                  options={outletChoice}
                  errors={errors}
                />
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
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : buttonTitle}
            </button>
          </div>
        </div>
        {isModalVisible && (
          <ConfirmModal
            buttonTitle={buttonTitle}
            handleSubmit={handleConfirm}
            closeModal={() => setIsModalVisible(false)}
            headTitle={headTitle}
            confirmButtonLabel={buttonTitle}
            cancelButtonLabel="Kembali"
            message={message}
          />
        )}
        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              reset();
              if (mode === "create") {
                navigate(`/sales/pengajuan/request-order/detail/${detailId}`);
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
