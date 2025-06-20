import { FC, useState, useEffect } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import ImageField from "@metronic/layout/components/form/molecules/ImageField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import {
  getMaterialsCategory,
  getActiveBrands,
  createMaterials,
  getMaterialsById,
  updateMaterials,
  getActiveUoms,
} from "../core/_request";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

type FormData = {
  name: string;
  category_id: string;
  brand_id: string;
  picture?: File | string | null;
  description?: string;
  uom_default_id?: string;
};

interface Option {
  value: string;
  label: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nama material wajib diisi")
    .max(255, "Nama material maksimal 255 karakter")
    .matches(
      /^[A-Za-z\s]+$/,
      "Nama material hanya boleh mengandung huruf dan spasi"
    ),
  category_id: Yup.string().required("Kategori wajib dipilih"),
  brand_id: Yup.string().required("Brand wajib dipilih"),
  uom_default_id: Yup.string().required("Wajib Diisi"),
});
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const MaterialsForm: FC<{
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  mode: "create" | "edit";
}> = ({
  successMessage,
  headTitle,
  buttonTitle,
  message,
  confirmButtonLabel,
  cancelButtonLabel,
  mode,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [uoms, setUoms] = useState<Option[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingUoms, setLoadingUoms] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [originalImagePath, setOriginalImagePath] = useState<string | null>(
    null
  );
  const [imageWasRemoved, setImageWasRemoved] = useState(false);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const baseUrl = API_BASE_URL;
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    mode: "onTouched",
    defaultValues: {
      name: "",
      category_id: "",
      brand_id: "",
      picture: undefined,
      uom_default_id: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, brandsRes, uomsRes] = await Promise.all([
          getMaterialsCategory(),
          getActiveBrands(),
          getActiveUoms(),
        ]);

        setCategories(
          categoriesRes.map((c: any) => ({ value: c.id, label: c.name }))
        );
        setBrands(brandsRes.map((b: any) => ({ value: b.id, label: b.name })));
        setUoms(uomsRes.map((u: any) => ({ value: u.id, label: u.name })));

        if (mode === "edit" && id) {
          const materialData = await getMaterialsById(id);
          if (materialData) {
            reset({
              name: materialData.name,
              category_id: materialData.category.id,
              brand_id: materialData.brand.id,
              description: materialData.description,
              uom_default_id: materialData.uom_default.id,
              picture: materialData.picture ? materialData.picture : undefined,
            });
            if (materialData.picture) {
              const fullImageUrl = `${baseUrl}/${materialData.picture}`;
              setExistingImageUrl(fullImageUrl);
              setOriginalImagePath(materialData.picture);
              // Set the initial picture value to the path
              setValue("picture", materialData.picture);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing form:", error);
      } finally {
        setLoadingCategories(false);
        setLoadingBrands(false);
        setLoadingUoms(false);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [mode, id, reset, baseUrl, setValue]);

  const handleCloseFailedModal = () => setIsFailedModalVisible(false);
  const handleCloseSuccessModal = () => {
    navigate(`../detailmaterial/${id}`);
    setIsSuccessModalVisible(false);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // New file selected
      setValue("picture", file);
      setImageWasRemoved(false);
    } else {
      // Image was removed
      setValue("picture", null);
      setImageWasRemoved(true);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form data before modal:", data);
    setIsModalVisible(true);
  };

  const onConfirm = async () => {
    const data = watch();
    let materialId: string = "";
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category_id", data.category_id);
      formData.append("brand_id", data.brand_id);

      if (data.description) formData.append("description", data.description);
      if (data.uom_default_id)
        formData.append("default_uom", data.uom_default_id);

      // Handle picture field based on its type
      if (data.picture instanceof File) {
        // New file uploaded
        formData.append("picture", data.picture);
      } else if (typeof data.picture === "string" && !imageWasRemoved) {
        // Existing image path and image was not removed
        formData.append("picture", data.picture);
      } else if (imageWasRemoved) {
        // Image was explicitly removed
        formData.append("picture", "");
      }

      console.log("Data to be sent:", Object.fromEntries(formData));

      const submitData = {
        name: data.name,
        category_id: data.category_id,
        brand_id: data.brand_id,
        description: data.description,
        uom_default_id: data.uom_default_id,
        picture: data.picture,
      };

      if (mode === "create") {
        materialId = await createMaterials(submitData);
      } else if (mode === "edit" && id) {
        await updateMaterials(id, submitData);
        materialId = id;
      }

      if (materialId) {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
          navigate(
            `/inventory/masterdata/materials/detailmaterial/${materialId}`
          );
        }, 2000);
      } else {
        setIsModalVisible(false);
        console.error("Material ID is not available for navigation.");
      }
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
      setIsModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const goingBack = () => navigate("../");

  return (
    <div className="font-secondary">
      {loading && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="card p-5 w-100 mb-4">
          <h2 className="mb-6">Material</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                  <ImageField
                    name="picture"
                    label="Foto Material"
                    onChange={(file) => handleImageChange(file)}
                    errors={errors.picture?.message}
                    defaultValue={existingImageUrl}
                  />
                )}
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <InputField
                  name="name"
                  label="Nama Material"
                  control={control}
                  placeholder="Masukkan nama material"
                  errors={errors}
                  type="text"
                />
              </div>
              <div className="mb-3">
                <SelectField
                  name="category_id"
                  placeholder={
                    loadingCategories
                      ? "Loading categories..."
                      : "Pilih kategori material"
                  }
                  label="Kategori Material"
                  control={control}
                  options={categories}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <SelectField
                  name="brand_id"
                  placeholder={
                    loadingBrands ? "Loading brands..." : "Pilih brand"
                  }
                  label="Brand"
                  control={control}
                  options={brands}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <Controller
                  name="uom_default_id"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      name="uom_default_id"
                      placeholder={
                        loadingUoms ? "Loading UOMs..." : "Pilih default UOM"
                      }
                      label="UOM Terkecil"
                      control={control}
                      options={uoms}
                      errors={errors}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <TextareaField
              name="description"
              label="Deskripsi"
              control={control}
              placeholder="Masukkan deskripsi"
              errors={errors}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mb-8 mt-4">
          <button
            onClick={goingBack}
            type="button"
            className="btn border border-gray-500 px-12 py-2 me-4"
          >
            {cancelButtonLabel}
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="btn btn-primary px-12 py-4"
          >
            {confirmButtonLabel}
          </button>
        </div>
      </form>

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={"Tutup"}
        />
      )}

      {isFailedModalVisible && (
        <FailedModal
          closeModal={handleCloseFailedModal}
          message="Material gagal ditambahkan"
          confirmLabel={buttonTitle}
        />
      )}

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={() => onConfirm()}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          cancelButtonLabel={cancelButtonLabel}
          message={message}
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={handleCloseSuccessModal}
          message={successMessage || "Material berhasil ditambahkan!"}
        />
      )}
    </div>
  );
};

export default MaterialsForm;
