import { FC, useState, useEffect } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import ImageField from "@metronic/layout/components/form/molecules/ImageField";
import { createBrand, getBrandById, updateBrand } from "../../core/_request";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

interface FormData {
  picture?: File | string | null;
  name: string;
  description?: string;
}

interface FormProps {
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  mode: "create" | "edit";
}

const schema = Yup.object().shape({
  picture: Yup.mixed()
    .nullable()
    .test("file-type", "Format file tidak valid", (value) => {
      if (value === undefined || value === null || typeof value === "string") {
        return true;
      }
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return false;
    }),
  name: Yup.string()
    .required("Nama brand wajib diisi")
    .max(255, "Nama brand maksimal 255 karakter")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Nama brand hanya boleh mengandung huruf, angka, dan spasi"
    ),
  description: Yup.string().optional(),
});

const BrandForm: FC<FormProps> = ({
  successMessage,
  headTitle,
  buttonTitle,
  message,
  mode,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [originalImagePath, setOriginalImagePath] = useState<string | null>(
    null
  );
  const [imageWasRemoved, setImageWasRemoved] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = API_BASE_URL;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    mode: "onTouched",
    defaultValues: {
      picture: undefined,
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchBrandData = async () => {
      if (mode === "edit" && id) {
        setLoading(true);
        try {
          const data = await getBrandById(id);
          reset({
            name: data.name,
            description: data.description,
            picture: data.picture || undefined,
          });
          if (data.picture) {
            const fullImageUrl = `${baseUrl}/${data.picture}`;
            setExistingImageUrl(fullImageUrl);
            setOriginalImagePath(data.picture);
          }
        } catch (error) {
          console.error("Error fetching brand data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBrandData();
  }, [mode, id, reset, baseUrl]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      // New file selected
      setValue("picture", file);
      setImageWasRemoved(false);
    } else {
      // Image was removed
      setValue("picture", undefined); // Changed from null to undefined
      setImageWasRemoved(true);
    }
  };

  const onSubmit = (data: FormData) => {
    setIsModalVisible(true);
  };

  const onConfirm = async () => {
    const data = watch();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);

      // Handle picture field
      if (data.picture instanceof File) {
        // New file uploaded
        formData.append("picture", data.picture);
      } else if (typeof data.picture === "string" && !imageWasRemoved) {
        // Existing image path and image was not removed
        formData.append("picture", data.picture);
      } else if (
        mode === "edit" &&
        (imageWasRemoved || data.picture === undefined)
      ) {
        // In edit mode when image is removed or empty, send empty string
        formData.append("picture", "");
      }
      // For create mode with no image, don't append anything

      // console.log("Data to be sent:", Object.fromEntries(formData));

      if (mode === "create") {
        await createBrand(formData);
      } else if (mode === "edit" && id) {
        await updateBrand(id, formData);
      }

      setIsSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsModalVisible(false);
      setLoading(false);
    }
  };

  return (
    <div className="font-secondary">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="card p-5 w-100 mb-4">
          <h2 className="mb-6">Brand</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                  <ImageField
                    name="picture"
                    label="Foto Brand"
                    onChange={(file) => handleImageChange(file)}
                    errors={errors.picture?.message}
                    defaultValue={existingImageUrl}
                    isRequired={false}
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <InputField
                  name="name"
                  label="Nama Brand"
                  control={control}
                  placeholder="Masukkan nama brand"
                  errors={errors}
                  type="text"
                />
              </div>
              <div className="mb-3">
                <TextareaField
                  name="description"
                  label="Deskripsi"
                  control={control}
                  placeholder="Masukkan deskripsi"
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn px-12 py-3 border border-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn btn-primary px-12 py-3 border border-primary"
            disabled={!isValid}
          >
            {buttonTitle}
          </button>
        </div>
      </form>

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={onConfirm}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          cancelButtonLabel="Kembali"
          message={message}
          isLoading={loading}
        />
      )}

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={"Tutup"}
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          successMessage={successMessage}
          closeModal={() => {
            setIsSuccessModalVisible(false);
            navigate(-1);
          }}
        />
      )}
    </div>
  );
};

export default BrandForm;
