/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import TextareaField from "../molecules/field/TextareaField";
import { dummyUsers } from "../organisms/table/dummyUsers";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import React from "react";
import { getSelectWirehouseOpname, getSingleOpname } from "../../core/_request";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { getSelectWirehouseOpnameType } from "../../core/_models";
import DateInputField from "../../../../manajemen-pengiriman/catatan-penerimaan/components/molecules/field/DateInputField";

interface FormData {
  remarks?: string;
  warehouse_id: string;
  status?: string;
  posting_date: Date;
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
  remarks: Yup.string().optional(),
  warehouse_id: Yup.string().required("Pilih wirehouse"),
});

const Form: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  headTitle,
  buttonTitle,
  confirmButtonLabel,
  cancelButtonLabel,
  message,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmData, setConfirmData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  const [isLoadData, setIsLoadData] = useState(false);

  const [docTypeChoice, setDocTypeChoice] = useState<any[]>([
    {
      value: "Kredit",
      label: "Kredit",
    },
    {
      value: "Debit",
      label: "Debit",
    },
  ]);
  const [warehouseChoice, setWarehouseChoice] =
    useState<getSelectWirehouseOpnameType>([]);

  const [newId, setNewId] = useState("");

  useEffect(() => {
    getSelectWirehouseOpname().then((data) => {
      setWarehouseChoice(data);
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
    defaultValues: defaultValues
  });

  // const doc_type = watch("doc_type");
  const remarks = watch("remarks");
  const warehouse_id = watch("warehouse_id");
  const status = watch("status");
  const posting_date = watch("posting_date");

  useEffect(() => {
    if (id) {
      setIsLoadData(true);
      getSingleOpname(id)
        .then((data) => {
          // setValue("doc_type", data.doc_type);
          setValue("remarks", data.remarks);
          setValue("status", data.status);
          setValue("warehouse_id", data.warehouse.id);
          setValue("posting_date", data.posting_date)
        })
        .finally(() => {
          setIsLoadData(false);
        });
    }
  }, [mode, id, reset]);

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
          remarks: remarks,
          posting_date: posting_date ? new Date(posting_date).toISOString() : '',
        };
        console.log({ payload });
        let response;
        if (mode === "create") {
          response = await axiosInstance.post(
            `/inventory/submission/stock-management/stock-opname?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            payload
          );
          setNewId(response.data.data.id);
        } else if (mode === "edit" && id) {
          response = await axiosInstance.put(
            `/inventory/submission/stock-management/stock-opname/${id}?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            payload
          );
          getSingleOpname(id).then((data) => {
            // setValue("doc_type", data.doc_type);
            setValue("remarks", data.remarks);
            setValue("warehouse_id", data.warehouse.id);
            setValue("status", data.status);
            setValue("posting_date", data.posting_date)
          });
        }
        console.log({ response });
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

  if (mode === "edit" && status !== "Draft" && isLoadData)
    return <OverlayLoader />;

  if (mode === "edit" && status !== "Draft" && !isLoadData) return null;

  return (
    <div className="font-secondary">
      {isSubmitting && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-8">
          <div className="row">
            <h3 className="mb-6">Stock Opname</h3>
            {/* <div className="col-md-6">
              <SelectField
                placeholder="Pilih Doc Type"
                name="doc_type"
                label="Doc Type"
                control={control}
                options={docTypeChoice.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
                errors={errors}
              />
            </div> */}
            <div className="col-md-12">
              <SelectField
                placeholder="Pilih Warehouse"
                name="warehouse_id"
                label="Warehouse"
                control={control}
                options={warehouseChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                errors={errors}
              />
            </div>
          </div>
          {/* <div className="col-md-12">
            <Controller
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
            />
          </div> */}
          <div className="row">
            <TextareaField
              placeholder="Catatan"
              name="remarks"
              label="Catatan"
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={!isValid || isSubmitting}
            >
              {buttonTitle}
            </button>
          </div>
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
                  `/inventory/pengajuan/manajemen-stok/stock-opname/detail/${newId}`
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

export default Form;
