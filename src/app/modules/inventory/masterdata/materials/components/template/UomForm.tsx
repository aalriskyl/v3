/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  createUoms,
  getActiveUoms,
  getMaterialsById,
  updateUomFromMaterial,
  getMaterialUomById,
  getHpp,
} from "../core/_request";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

const schema = Yup.object().shape({
  uom_actual_id: Yup.string().required("Satuan UOM wajib dipilih"),
  uom_conversion_id: Yup.string().required("Satuan konversi wajib dipilih"),
  conversion: Yup.number()
    .required("Konversi UOM wajib diisi")
    .positive("Harus angka positif")
    .min(0, "Konversi harus angka positif")
    .max(999999999999999, "Nilai Konversi maksimal 9999999"),
  sell_price: Yup.number()
    .typeError("Harga Jual harus berupa angka")
    .min(0, "Harga Jual tidak boleh negatif")
    .max(999999999999999.99, "Harga Jual maksimal 999999999999999.99")
    .test(
      "decimal-check",
      "Harga Jual maksimal 15 angka di depan dan 2 angka di belakang koma",
      (value) => {
        if (value === undefined) return false;
        const [integerPart, decimalPart] = value.toString().split(".");
        return (
          integerPart.length <= 15 && (!decimalPart || decimalPart.length <= 2)
        );
      }
    )
    .required("Harga Jual wajib diisi"),
  sku: Yup.string().required("SKU wajib diisi"),
  barcode: Yup.number()
    .required("Konversi UOM wajib diisi")
    .positive("Harus angka positif")
    .min(0, "Konversi harus angka positif")
    .max(9999999, "Nilai Konversi maksimal 9999999"),

  uom_default: Yup.boolean().default(false),
  uom_default_buy: Yup.boolean().default(false),
  uom_default_sell: Yup.boolean().default(false),
  uom_sellable: Yup.boolean().default(false),
  margin: Yup.number()
    .typeError("Margin harus berupa angka")
    .min(0, "Margin tidak boleh negatif")
    .max(999.99, "Margin maksimal 999.99")
    .test(
      "decimal-check",
      "Margin maksimal 3 angka di depan dan 2 angka di belakang koma",
      (value) =>
        value === undefined || /^\d{1,5}(\.\d{1,2})?$/.test(value.toString())
    )
    .required("Margin wajib diisi"),
});

type UomFormData = {
  uom_actual_id: string;
  uom_conversion_id: string;
  conversion: number;
  sell_price: number;
  sku: string;
  barcode: number;
  uom_default: boolean;
  uom_default_buy: boolean;
  uom_default_sell: boolean;
  uom_sellable: boolean;
  margin: number;
};

interface FormProps {
  successMessage?: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  mode: "create" | "edit";
}

const UomForm: React.FC<FormProps> = ({
  successMessage,
  headTitle,
  buttonTitle,
  message,
  confirmButtonLabel,
  cancelButtonLabel,
  mode,
}) => {
  const { materialId, uomId } = useParams<{
    materialId: string;
    uomId: string;
  }>();
  const [materialID, setMaterialID] = useState(materialId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [satuanUOMOptions, setSatuanUOMOptions] = useState([]);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [satuanKonversiOptions, setSatuanKonversiOptions] = useState([]);
  const [defaultUom, setDefaultUom] = useState<string | null>(null);
  const navigate = useNavigate();
  const [uomDefaultOption, setUOMDefaultOption] = useState([]) as any;
  const [loading, setLoading] = useState(true);
  const [hpp, setHpp] = useState<number>(0);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [createdUomId, setCreatedUomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UomFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      barcode: undefined,
    },
  });

  const margin = watch("margin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uoms = await getActiveUoms();
        const uomOptions = uoms.map((uom: any) => ({
          value: uom.id,
          label: uom.name,
        }));
        setSatuanUOMOptions(uomOptions);
        setSatuanKonversiOptions(uomOptions);

        if (materialId) {
          const material = await getMaterialsById(materialId);
          if (material?.uom_default) {
            setDefaultUom(material.uom_default.name);
          }

          const hppData = await getHpp(materialId);
          if (hppData) {
            setHpp(hppData);
            setValue("sell_price", hppData);
          }
        }

        if (mode === "edit" && uomId) {
          const uomData = await getMaterialUomById(uomId);
          const data: any = await getMaterialsById(uomData.material_id || "");
          const uomDefault = [
            {
              value: data.uom_default.id,
              label: data.uom_default.name,
            },
          ];

          setMaterialID(data.id);
          setUOMDefaultOption(uomDefault);

          if (uomData) {
            reset({
              uom_actual_id: uomData.uom_actual.id,
              conversion: uomData.conversion,
              sell_price: uomData.sell_price,
              sku: uomData.sku,
              barcode: uomData.barcode,
              uom_default: uomData.uom_default,
              uom_default_buy: uomData.uom_default_buy,
              uom_default_sell: uomData.uom_default_sell,
              uom_sellable: uomData.uom_sellable,
              margin: uomData.margin,
            });

            if (data.uom_default) {
              setValue("uom_conversion_id", data.uom_default.id);
            }
          }
        } else if (materialID) {
          const data: any = await getMaterialsById(materialID);
          const uomDefault = [
            {
              value: data.uom_default.id,
              label: data.uom_default.name,
            },
          ];
          setUOMDefaultOption(uomDefault);

          if (data.uom_default) {
            setValue("uom_conversion_id", data.uom_default.id);
          }
        }
      } catch (error: any) {
        setFailedMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [materialId, uomId, mode, reset, materialID]);

  const handleFetchError = (error: unknown) => {
    setError(error);
    setIsFailedModalVisible(true);
  };

  const handleCloseFailedModal = () => setIsFailedModalVisible(false);

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
    if (mode === "create" && createdUomId) {
      navigate(`/inventory/masterdata/materials/detailuom/${createdUomId}`);
    } else {
      navigate(-1);
    }
  };

  const goingBack = () => navigate(-1);

  const onSubmit = async (data: UomFormData) => {
    setIsModalVisible(true);
  };

  const getPayload = () => {
    const data = watch();
    return {
      uom_actual_id: data.uom_actual_id,
      uom_conversion_id: data.uom_conversion_id,
      conversion: Number(data.conversion),
      sku: data.sku,
      sell_price: Number(data.sell_price),
      barcode: Number(data.barcode),
      uom_default: data.uom_default,
      uom_default_buy: data.uom_default_buy,
      uom_default_sell: data.uom_default_sell,
      uom_sellable: data.uom_sellable,
      margin: Number(data.margin),
    };
  };

  const handleCreateSubmit = async () => {
    setLoading(true);
    setIsFailedModalVisible(false);
    try {
      const payload = getPayload();
      if (!materialID) throw new Error("Material ID tidak ditemukan");

      const response = await createUoms(materialID, payload);
      if (response?.data?.data) {
        setCreatedUomId(response.data.data.id);
        setIsSuccessModalVisible(true);
      } else {
        throw new Error("Format respons tidak valid");
      }
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    setIsFailedModalVisible(false); // Reset failed modal state
    try {
      const payload = getPayload();
      if (!uomId) throw new Error("UOM ID tidak ditemukan");

      const response = await updateUomFromMaterial(uomId, payload);
      setIsSuccessModalVisible(true); // Show success modal
    } catch (error: unknown) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleSubmitConfirmation = () => {
    if (mode === "create") {
      handleCreateSubmit();
    } else {
      handleEditSubmit();
    }
  };

  return (
    <div className="font-secondary">
      {loading && <OverlayLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-5 w-100 mb-4">
          <h2 className="mb-6">UOM</h2>
          {/* {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )} */}
          <div className="row g-4">
            <div className="col-md-6">
              <SelectField
                name="uom_actual_id"
                label="Satuan UOM"
                control={control}
                placeholder="Pilih Satuan UOM"
                options={satuanUOMOptions}
                errors={errors}
              />
              <InputField
                name="barcode"
                label="Barcode"
                control={control}
                placeholder="Masukkan barcode"
                errors={errors}
                type="text"
              />
              <InputField
                name="margin"
                label="Margin (dalam persentase)"
                control={control}
                placeholder="Masukkan margin"
                errors={errors}
                type="number"
                min={0}
                onChange={(e: any) => {
                  const newMargin = parseFloat(e.target.value);
                  if (!isNaN(newMargin) && hpp > 0) {
                    const newSellPrice = hpp + hpp * (newMargin / 100);
                    setValue("sell_price", newSellPrice);
                  } else {
                    setValue("sell_price", 0);
                  }
                }}
              />
              <label className="form-label">Akses</label>
              <Controller
                name="uom_sellable"
                control={control}
                render={({ field }) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="uom_sellable"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="uom_default_sell"
                    >
                      Bisa Dijual
                    </label>
                  </div>
                )}
              />
            </div>

            <div className="col-md-6">
              <InputField
                name="conversion"
                label="Nilai Konversi"
                control={control}
                placeholder="Masukkan nilai konversi"
                errors={errors}
                type="number"
              />
              <InputField
                name="sku"
                label="SKU"
                control={control}
                placeholder="Masukkan SKU"
                errors={errors}
                type="text"
              />
              <InputField
                name="sell_price"
                label="Harga Jual"
                control={control}
                placeholder={hpp ? hpp.toString() : "0"}
                errors={errors}
                type="number"
              />
              <div>
                <label className="form-label">Set Default</label>
                <div className="d-flex gap-4">
                  <Controller
                    name="uom_default_sell"
                    control={control}
                    render={({ field }) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="uom_default_sell"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="uom_default_sell"
                        >
                          Penjualan
                        </label>
                      </div>
                    )}
                  />
                  <Controller
                    name="uom_default_buy"
                    control={control}
                    render={({ field }) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="uom_default_buy"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="uom_default_buy"
                        >
                          Pembelian
                        </label>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-8 mt-4">
          <Button
            variant="secondary"
            onClick={goingBack}
            className="btn border border-gray-500 px-12 py-2 me-4"
          >
            {cancelButtonLabel}
          </Button>
          <button
            onClick={() => handleSubmit(onSubmit)()}
            type="submit"
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
      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleSubmitConfirmation}
          closeModal={() => setIsModalVisible(false)}
          headTitle={headTitle}
          confirmButtonLabel={buttonTitle}
          cancelButtonLabel="Batalkan"
          message={message}
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => {
            handleCloseSuccessModal();
            navigate(`../detailmaterial/${materialID}`);
          }}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default UomForm;
