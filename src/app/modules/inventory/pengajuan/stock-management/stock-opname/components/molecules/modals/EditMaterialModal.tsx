import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextareaField from "../field/TextareaField";
import axiosInstance from "../../../../../../../../../service/axiosInstance";

import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { useMaterialOpname } from "../../template/MaterialTableLayout";
import { getSingleMaterialOpnameById } from "../../../core/_request";

interface MaterialFormData {
  material: string;
  material_id: string;
  material_uom_id: string;
  uom: string;
  jumlah: number;
  harga: number;
  barcode: string | ""; // Tambahkan field barcode
  catatan: string;
}

interface EditMaterialModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit?: (data: MaterialFormData) => void;
  id: string;
}

export const EditMaterialModal = ({
  show,
  handleClose,
  onSubmit,
  id,
}: EditMaterialModalProps) => {
  console.log({ materialId3: id });
  const { refreshMaterial } = useMaterialOpname();
  //   const { id } = useParams<{ id: string }>();
  const [IsFetching, setIsFetching] = useState<boolean>(false);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<MaterialFormData>({
    defaultValues: {
      material: "",
      material_id: "",
      material_uom_id: "",
      uom: "",
      jumlah: 0,
      harga: 0,
      barcode: "", // Default value untuk barcode
      catatan: "",
    },
  });

  useEffect(() => {
    if (id) {
      console.log({ idMaterial: id });
      setIsFetching(true);
      getSingleMaterialOpnameById(id)
        .then((data) => {
          setValue("material", data.material.name);
          setValue("material_id", data.id);
          setValue("material_uom_id", data.material_uom_id);
          setValue("jumlah", data.amount);
          setValue("harga", data.amount);
          setValue("uom", data.material_uom.uom_actual.name);
          setValue("barcode", data.material_uom.barcode);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [id]);

  const handleFormSubmit = useCallback(
    async (data: MaterialFormData) => {
      if (!id) {
        setSubmitError("ID is required to create a material.");
        return;
      }
      setIsLoading(true);

      const payload = {
        amount: parseInt(data.jumlah.toString()),
        material_id: "4e765be9-4d5f-44ac-af71-edf94ce79fa1",
        material_uom_id: "4054b4de-ae02-41e2-87d3-ff1095ec6922",
      };

      try {
        // Simulasikan proses penyimpanan data
        console.log("Payload:", payload);
        const response = await axiosInstance.put(
          `/inventory/submission/stock-management/stock-opname/stock-opname-material/${id}?company_id=${localStorage.getItem(
            "company_id"
          )}`,
          payload
        );
        console.log({ response });
        setSuccessMessage("Material berhasil disimpan!");
        refreshMaterial();
        reset();
        handleClose();
      } catch (error) {
        setSubmitError("Gagal menyimpan material. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    },
    [id, reset, handleClose]
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      {IsLoading && <OverlayLoader />}
      <Modal.Header closeButton>
        <h2>Ubah Material</h2>
      </Modal.Header>
      <Modal.Body>
        {IsFetching && "Loading...."}
        {!IsFetching && (
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              {/* Sebelah Kiri: Material, Satuan UOM, Harga */}
              <Col md={6}>
                <Controller
                  name="material"
                  control={control}
                  rules={{ required: "Material wajib diisi" }}
                  render={({ field }) => (
                    <InputField
                      label="Material"
                      placeholder="Material"
                      control={control}
                      errors={errors}
                      {...field}
                      disabled
                    />
                  )}
                />
                <Controller
                  name="uom"
                  control={control}
                  rules={{ required: "Satuan UOM wajib diisi" }}
                  render={({ field }) => (
                    <InputField
                      label="Satuan UOM"
                      placeholder="Satuan UOM"
                      control={control}
                      errors={errors}
                      {...field}
                      disabled
                    />
                  )}
                />
                <Controller
                  name="harga"
                  control={control}
                  rules={{ required: "Harga wajib diisi" }}
                  render={({ field }) => (
                    <InputField
                      label="Harga"
                      type="number"
                      placeholder="Masukkan Harga"
                      control={control}
                      errors={errors}
                      {...field}
                      disabled
                    />
                  )}
                />
              </Col>

              {/* Sebelah Kanan: Jumlah, Barcode, Catatan */}
              <Col md={6}>
                <Controller
                  name="jumlah"
                  control={control}
                  rules={{ required: "Jumlah wajib diisi" }}
                  render={({ field }) => (
                    <InputField
                      label="Jumlah"
                      type="number"
                      placeholder="Masukkan Jumlah"
                      control={control}
                      errors={errors}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="barcode"
                  control={control}
                  // rules={{ required: "Barcode wajib diisi" }}
                  render={({ field }) => (
                    <InputField
                      label="Barcode"
                      type="text"
                      placeholder="Masukkan Barcode"
                      control={control}
                      errors={errors}
                      {...field}
                      disabled
                    />
                  )}
                />
                {/* <Controller
               name="catatan"
               control={control}
               rules={{ required: "Catatan wajib diisi" }}
               render={({ field }) => (
                 <TextareaField
                   label="Catatan"
                   placeholder="Masukkan Catatan"
                   control={control}
                   errors={errors}
                   {...field}
                   rows={4}
                 />
               )}
             /> */}
              </Col>
            </Row>
            {submitError && (
              <div className="text-danger mt-3">{submitError}</div>
            )}
            {successMessage && (
              <div className="text-success mt-3">{successMessage}</div>
            )}
            <div className="d-flex mt-4 justify-content-between">
              <Button variant="secondary" onClick={handleClose}>
                Kembali
              </Button>
              <div className="d-flex gap-4">
                <Button variant="primary" type="submit" disabled={IsLoading}>
                  Ubah
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};
