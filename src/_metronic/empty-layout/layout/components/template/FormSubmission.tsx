import { FC, useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import { DetailDataType } from "../core/_model";

// Yup schema
const schema = Yup.object().shape({

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

const FormSubmission: FC<ServiceFormProps> = ({
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
    // resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
    },
  });

  const name = watch("name");
  const no_account = watch("no_account");
  const parent_account_id = watch("parent_account_id") || null;
  const type = watch("type");

  // 

  return (
    <div className="font-secondary">
      {loading && <OverlayLoader />}
     

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={buttonTitle}
        />
      )}

      {/* {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          buttonTitle={confirmButtonLabel}
          cancelButtonLabel="Batalkan"
          message={message}
        />
      )} */}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => {
            if (mode === "create") {
              navigate(
                ``
              );
            }
            setIsSuccessModalVisible(false);
          }}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default FormSubmission;
