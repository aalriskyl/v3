import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { createGudang, updateGudang, getGudangById } from "../core/_request"; // Assuming you have these functions
import TextareaField from "../molecules/field/TextareaField";
import { Overlay } from "react-bootstrap";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  id?: string; // Ensure id is included for edit mode
  name: string;
  address: string;
}

interface FormProps {
  mode: "create" | "edit";
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  cancelButtonLabel?: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
      .required('Nama gudang wajib diisi')
      .max(255, 'Nama gudang maksimal 255 karakter')
      .matches(/^[A-Za-z0-9\s]+$/, 'Nama gudang hanya boleh mengandung huruf dan spasi'),
  address: Yup.string().required("Format deskripsi tidak valid"),
});

const GudangForm: FC<FormProps> = ({
  mode,
  successMessage,
  headTitle,
  buttonTitle,
  message,
  cancelButtonLabel,
}) => {
  const { id: id } = useParams<{ id: string }>(); // Retrieve uomId from URL for edit mode
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      address: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchUomData = async () => {
        try {
          const gudang = await getGudangById(id);
          reset({
            id: gudang.id,
            address: gudang.address,
            name: gudang.name,
          }); // Reset form with fetched data
        } catch (error) {
          console.error("Failed to fetch UOM data:", error);
        }
      };

      fetchUomData();
    }
  }, [id, reset]);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      setIsSubmitting(true);
      try {
        if (id) {
          // Edit mode: Update existing UOM
          await updateGudang(id, formData);
        } else {
          // Create mode: Create new UOM
          await createGudang(formData);
        }
        setIsSuccessModalVisible(true);
        setIsModalVisible(false);
        setFormData(null);
      } catch (error) {
        console.error("Error saat membuat/mengupdate UOM:", error);
        const field = (error as any)?.response?.data?.field;
        let errorMessage = null;
        Object.keys(field).forEach((key) => {
          errorMessage = key.length > 3 ? `${key} : ${field[key]}` : null;
        });

        setFailedMessage(errorMessage || field || "Gagal membuat gudang");
      } finally {
        setIsModalVisible(false);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="font-secondary">
      {isSubmitting && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-4">
          <div className="row g-6">
            <div className="col-md-6">
              <InputField
                name="name"
                label="Nama Gudang"
                control={control}
                placeholder="Masukkan nama Gudang"
                errors={errors}
                type="text"
              />
            </div>
            <div className="col-md-6">
              <TextareaField
                name="address"
                label="Alamat"
                control={control}
                placeholder="Masukkan alamat"
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn btn-primary px-12 py-3 border border-primary"
            disabled={!isValid || isSubmitting}
          >
            {buttonTitle}
          </button>
        </div>
      </form>

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          cancelButtonLabel="Kembali"
          buttonTitle={buttonTitle}
          message={message}
        />
      )}

      {failedMessage && (
        <FailedModal
          message={failedMessage}
          closeModal={() => setFailedMessage(null)}
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => {
            navigate("../");
            setIsSuccessModalVisible(false);
          }}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default GudangForm;
