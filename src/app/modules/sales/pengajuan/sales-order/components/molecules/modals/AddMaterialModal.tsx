/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm, useWatch } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { watch } from "fs";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface MaterialFormData {
  id: string;
  material: string;
  jumlah: number;
  uom: string;
  harga: number;
}

interface MaterialData {
  id: string;
  material: {
    id: string;
    name: string;
  };
  jumlah: number;
  uom: {
    id: string;
    name: string;
  };
  harga: number;
}

interface AddMaterialModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const AddMaterialModal = ({
  show,
  handleClose,
  onSubmit,
}: AddMaterialModalProps) => {
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
    watch,
    setValue,
  } = useForm<MaterialFormData>({
    defaultValues: {
      id: "",
      material: "",
      jumlah: 0,
      uom: "",
      harga: 0,
    },
  });

  const material = watch("material");
  const uom = watch("uom");

  const selectMaterial: any = watch("material");

  useEffect(() => {
    if (selectMaterial) {
      const data = dataListMaterialSellable.find(
        (item: any) => item.id === selectMaterial
      );
      // console.log("data", data)
      const uomList = data.material_uom.map((item: any) => {
        return {
          value: item.id,
          label: item.uom_actual.name,
        };
      });
      console.log({ uomList });
      setUomOptions(uomList);
    }
  }, [selectMaterial]);

  useEffect(() => {
    if (material.length > 0 && uom.length > 0) {
      axiosInstance
        .get(`/inventory/master-data/material/uom/select/${material}`)
        .then((res) => {
          const data = res.data.data.uoms;
          const findData = data.find((item: any) => item.id === uom);
          console.log({ data, findData });
          if (findData) {
            setValue("harga", findData.avg_hpp || 0);
          }
        });
    }
  }, [uom, material]);

  console.log({ dataListMaterialSellable });

  const handleFormSubmit = async (data: MaterialFormData) => {
    setIsLoading(true);
    try {
      const selectedMaterial: any = materialOptions.find(
        (opt: any) => opt.value === data.material
      );
      const selectedMaterialUOM: any = uomOptions.find(
        (opt: any) => opt.value === data.uom
      ); // onSubmit?.(data);
      const processedMaterial: MaterialData = {
        ...data,
        material: {
          id: selectedMaterial.value,
          name: selectedMaterial.label,
        },
        uom: {
          id: selectedMaterialUOM.value,
          name: selectedMaterialUOM.label,
        },
      };

      await onSubmit(processedMaterial);
      reset();
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h2>Material</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Section Material */}
            <div className="mb-6">
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
                        placeholder="Pilih material"
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
                    rules={{
                      required: "Jumlah wajib diisi",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Hanya angka yang diperbolehkan",
                      },
                    }}
                    render={({ field }) => (
                      <InputField
                        label="Jumlah"
                        type="number"
                        placeholder="Masukkan jumlah"
                        control={control}
                        errors={errors}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Row>
            </div>

            {/* Section Satuan UOM and Barcode */}
            <div className="mb-6">
              <Row>
                <Col md={6}>
                  <Controller
                    name="uom"
                    control={control}
                    rules={{ required: "Satuan UOM wajib dipilih" }}
                    render={({ field }) => (
                      <SelectField
                        label="Satuan UOM"
                        options={uomOptions}
                        placeholder="Pilih satuan UOM"
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
            </div>

            {/* Buttons */}
            <div className="d-flex mt-4 g-4 justify-content-between">
              <Button variant="secondary" onClick={handleClose}>
                Batalkan
              </Button>
              <div className="d-flex gap-4">
                {/* <button
                  type="button"
                  className="btn border border-primary px-8 py-2 text-primary"
                >
                  Simpan & Tambah Baru
                </button> */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary border border-primary px-16 py-2"
                >
                  {isLoading ? "Loading...." : "Simpan"}
                </button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
