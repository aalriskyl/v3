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

// Yup schema
const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nama Terms of Payment Wajib diisi")
    .max(50, "Nama Terms of Payment maksimal 50 karakter")
    .test(
      "not-only-special-chars",
      "Nama harus mengandung huruf alfabet",
      (value) => {
        if (!value) return true; // Let required validation handle empty values
        return /[a-zA-Z]/.test(value); // Must contain at least one letter
      }
    )
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Hanya boleh mengandung huruf, angka, dan spasi"
    ),
});

type FormData = {
  name: string;
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
      name: "",
    },
  });

  const name = watch("name");

  const getData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/accounting/master-data/top/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const { name } = res.data.data;
      setValue("name", name);
      console.log({ getData: res.data.data });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "edit" && id) {
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
        name,
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
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/accounting/master-data/top/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        navigate(`../detail/${id}`);
        await getData();
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(
        (error as any).response.data.field ||
          (mode === "create" ? "Gagal menambahkan COA" : "Gagal mengupdate COA")
      );
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
          <ServiceSection control={control} errors={errors} />
        </div>
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
              navigate(`/accounting/masterdata/payment-term/detail/${newId}`);
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
