import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { useState, useEffect } from "react";
import { ID } from "@metronic/helpers";
import { dummyLayanan } from "../../organisms/table/dummyUsers";
import { getSingleServiceSalesOrderById } from "../../../core/_request";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useServiceSalesOrder } from "../../template/LayananDetailSectionLayout";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";

interface LayananFormData {
  service: string;
  harga: number;
}

interface EditLayananModalProps {
  show: boolean;
  handleClose: () => void;
  layananId?: string;
}

export const EditLayananModal = ({
  show,
  handleClose,
  layananId,
}: EditLayananModalProps) => {
  const { refreshService } = useServiceSalesOrder();

  const [isEditSuccessModalVisible, setIsEditSuccessModalVisible] =
    useState(false);
  const [isEditFailedModalVisible, setIsEditFailedModalVisible] =
    useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const [serviceOptions, setServiceOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [supplierOptions, setSupplierOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LayananFormData>({
    defaultValues: {
      service: "",
      harga: 0,
    },
  });

  const service = watch("service");
  const harga = watch("harga");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get(
          "/inventory/master-data/service/select"
        );
        if (response.data.status === 200) {
          const formattedServices = response.data.data.services.map(
            (service: any) => ({
              value: service.id,
              label: service.name,
            })
          );
          setServiceOptions(formattedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (layananId) {
      getSingleServiceSalesOrderById(layananId)
        .then((data) => {
          setValue("service", data.service.id);
          setValue("harga", data.price);
          // setValue("harga", data.price);
          // setValue("jumlah", data.amount);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [layananId, reset]);

  const handleFormSubmit = async (data: LayananFormData) => {
    console.log("Edited data:", data);
    setIsEditLoading(true);
    try {
      const payload = {
        service_id: data.service,
        price: parseInt(data.harga.toString()),
      };
      await axiosInstance.put(
        `/sales/submission/sales-order/sales-order-service/${layananId}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        payload
      );
      await refreshService();
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
          <h2>Ubah Layanan</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              <Col md={6}>
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: "Layanan wajib dipilih" }}
                  render={({ field }) => (
                    <SelectField
                      label="service"
                      options={serviceOptions}
                      placeholder="Pilih Layanan"
                      control={control}
                      errors={errors}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <Controller
                  name="harga"
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
