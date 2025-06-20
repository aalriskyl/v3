import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { useState, useEffect } from "react";
import { ID } from "@metronic/helpers";
import { dummyMaterials } from "../../organisms/table/dummyUsers";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { getSingleMaterialSalesOrderById } from "../../../core/_request";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { useMaterialAp } from "../../../core/MaterialAccountPayableContext";

interface MaterialFormData {
  id: string;
  material: string;
  jumlah: number;
  uom: string;
  harga: number;
}

interface EditMaterialModalProps {
  show: boolean;
  handleClose: () => void;
  materialId?: string;
}

export const EditMaterialModal = ({
  show,
  handleClose,
  materialId,
}: EditMaterialModalProps) => {
  const { fetchData } = useMaterialAp();

  const [isEditSuccessModalVisible, setIsEditSuccessModalVisible] =
    useState(false);
  const [isEditFailedModalVisible, setIsEditFailedModalVisible] =
    useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const [dataListMaterialSellable, setDataListMaterialSellable] = useState(
    []
  ) as any;

  const [materialOptions, setMaterialOptions] = useState([]) as any;
  const [uomOptions, setUomOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/inventory/master-data/material/sellable")
      .then((res: any) => {
        console.log({ materialOption: res.data.data });
        setDataListMaterialSellable(res.data.data);
        setMaterialOptions(
          res.data.data.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MaterialFormData>({
    defaultValues: {
      id: "",
      material: "",
      jumlah: 0,
      uom: "",
      harga: 0,
    },
  });

  const selectMaterial = watch("material");
  const jumlah = watch("jumlah");
  const uom = watch("uom");
  const harga = watch("harga");

  useEffect(() => {
    if (selectMaterial) {
      const data = dataListMaterialSellable.find(
        (item: any) => item.id === selectMaterial
      );
      console.log("data", data);
      if (data) {
        const uomList: never[] = data.material_uom.map((item: any) => {
          return {
            value: item.id,
            label: item.uom_actual.name,
          };
        });
        setUomOptions(uomList);
      }
    }
  }, [selectMaterial, dataListMaterialSellable]);

  useEffect(() => {
    if (materialId) {
      getSingleMaterialSalesOrderById(materialId)
        .then((data) => {
          setValue("material", data.material_id);
          setValue("uom", data.material_uom.id);
          setValue("harga", data.price);
          setValue("jumlah", data.amount);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [materialId, reset]);

  const handleFormSubmit = async (data: MaterialFormData) => {
    console.log("Edited data:", data);
    setIsEditLoading(true);
    try {
      const payload = {
        price: parseFloat(data.harga.toString()),
        amount: parseInt(data.jumlah.toString()),
        material_id: data.material,
        material_uom_id: data.uom,
      };
      await axiosInstance.put(
        `/sales/submission/sales-order/sales-order-material/${materialId}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        payload
      );
      await fetchData();
      setIsEditSuccessModalVisible(true);
    } catch (error) {
      setIsEditFailedModalVisible(true);
    } finally {
      setIsEditLoading(false);
      reset(); // Reset form after submit
      handleClose(); // Close modal
    }
  };

  return (
    <>
      {isEditLoading && <OverlayLoader />}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h2>Ubah Material</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              <Col md={6}>
                <Controller
                  name="material"
                  control={control}
                  rules={{ required: "Material wajib dipilih" }}
                  render={({ field }) => (
                    <SelectField
                      label="Material"
                      options={materialOptions}
                      placeholder="Pilih Material"
                      control={control}
                      errors={errors}
                      {...field}
                    />
                  )}
                />
              </Col>
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
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Controller
                  name="uom"
                  control={control}
                  rules={{ required: "Satuan UOM wajib dipilih" }}
                  render={({ field }) => (
                    <SelectField
                      label="Satuan UOM"
                      options={uomOptions}
                      placeholder="Pilih Satuan UOM"
                      control={control}
                      errors={errors}
                      {...field}
                      disabled={!selectMaterial}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <Controller
                  name="harga"
                  control={control}
                  rules={{
                    required: "Harga wajib diisi",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Hanya angka yang diperbolehkan",
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      label="Harga"
                      type="number"
                      placeholder="Masukkan harga"
                      control={control}
                      errors={errors}
                      {...field}
                    />
                  )}
                />
              </Col>
            </Row>
            <div className="d-flex mt-4 justify-content-between">
              <Button variant="secondary" onClick={handleClose}>
                Kembali
              </Button>
              <div className="d-flex gap-4">
                <Button
                  variant="outline-primary border border-primary text-primary"
                  onClick={() => reset()}
                >
                  Simpan & Tambah Baru
                </Button>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {isEditSuccessModalVisible && (
        <SuccessModal
          title="Berhasil"
          successMessage="Data telah berhasil diedit!"
          closeModal={() => {
            setIsEditSuccessModalVisible(false);
          }}
        />
      )}

      {isEditFailedModalVisible && (
        <FailedModal
          title="Gagal"
          message="Terjadi kesalahan saat mengedit data."
          closeModal={() => setIsEditFailedModalVisible(false)}
        />
      )}
    </>
  );
};
