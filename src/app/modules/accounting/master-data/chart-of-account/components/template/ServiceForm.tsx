import { FC, useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceSection } from "./section/ServiceSection";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import axiosInstance from "../../../../../../../service/axiosInstance";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import { DetailDataType } from "../core/_model";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

// Yup schema
const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nama COA wajib diisi")
    .max(255, "Nama COA maksimal 255 karakter"),
  no_account: Yup.string().required("Nomor akun wajib diisi"),
  type: Yup.string().required("Tipe Wajib diisi"),
  parent_account_id: Yup.string().nullable().notRequired().optional(),
});

type FormData = {
  name: string;
  no_account: string;
  type: string;
  parent_account_id?: string | null;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const handleConfirmData = useRef<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [newId, setNewId] = useState("");

  const [accountChoice, setAccountChoice] = useState<DetailDataType[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      no_account: "",
      type: "",
      parent_account_id: null,
    },
  });

  const name = watch("name");
  const no_account = watch("no_account");
  const parent_account_id = watch("parent_account_id") || null;
  const type = watch("type");

  const getData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/accounting/master-data/coa/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const { name, parent_account, no_account, type } = res.data.data;
      setValue("name", name);
      setValue("no_account", no_account);
      setValue("parent_account_id", parent_account?.id);
      setValue("type", type);
      console.log({ getData: res.data.data });
    } finally {
      setLoading(false);
    }
  };
  const getSelectAccount = async () => {
    try {
      const res = await axiosInstance.get(
        `/accounting/master-data/coa/select?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      setAccountChoice(res.data.data);
      console.log({ getSelectAccount: res.data.data });
    } catch (error) {}
  };

  useEffect(() => {
    if (mode === "edit" && id) {
      getData();
    }
    getSelectAccount();
  }, [mode, id, reset]);

  const onSubmit = (data: FormData) => {
    handleConfirmData.current = data;
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const payload = {
        name,
        parent_account_id,
        no_account,
        type,
      };
      console.log({ payload });
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/accounting/master-data/coa?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/accounting/master-data/coa/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        await getData();
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {loading && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="font-secondary">
            <div className="card p-5 w-100 mb-4">
              <h2 className="mb-6">Chart of Account</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="Nama"
                        control={control}
                        placeholder="Masukkan nama Chart of Account"
                        errors={errors}
                        type="text"
                      />
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <Controller
                    name="no_account"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="Nomor Akun"
                        control={control}
                        placeholder="Masukkan nomor akun"
                        errors={errors}
                        type="text"
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  {/* <Controller
                    name="parent_account_id"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        {...field}
                        value={field.value || ""}
                        label="Akun Induk"
                        control={control}
                        placeholder="Pilih akun induk"
                        options={accountChoice.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        errors={errors}
                      />
                    )}
                  /> */}
                  <SelectField
                    name="parent_account_id"
                    value={parent_account_id || ""}
                    label="Akun Induk"
                    control={control}
                    placeholder="Pilih akun induk"
                    options={accountChoice.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    errors={errors}
                  />
                </div>
                <div className="col-md-6 mb-8">
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        {...field}
                        label="Tipe"
                        control={control}
                        placeholder="Pilih tipe"
                        options={[
                          { label: "Liability", value: "Liability" },
                          { label: "Equity", value: "Equity" },
                          { label: "Asset", value: "Asset" },
                          { label: "Income", value: "Income" },
                          { label: "Expense", value: "Expense" },
                        ]}
                        errors={errors}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-8 mt-4">
          <button
            onClick={() => {
              navigate("../");
            }}
            type="button"
            className="btn border border-gray-500 px-12 py-2 me-4"
          >
            {cancelButtonLabel}
          </button>
          <button
            type="submit"
            className="btn btn-primary px-12 py-4"
            disabled={!isValid}
          >
            {confirmButtonLabel}
          </button>
        </div>
      </form>

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={buttonTitle}
        />
      )}

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

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => {
            if (mode === "create") {
              navigate(
                `/accounting/masterdata/chart-of-account/detail/${newId}`
              );
            }
            if (mode === "edit") {
              navigate(`/accounting/masterdata/chart-of-account/detail/${id}`);
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
