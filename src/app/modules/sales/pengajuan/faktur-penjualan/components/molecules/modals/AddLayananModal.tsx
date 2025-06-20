/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

interface AddLayananModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const AddLayananModal = ({
  show,
  handleClose,
  onSubmit,
}: AddLayananModalProps) => {
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
    watch,
  } = useForm<any>({
    defaultValues: {
      service: "",
      price: 0,
    },
  });

  const selectedServiceId = watch("service");

  // Fetch services data
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

  // Fetch suppliers when service changes
  //   useEffect(() => {
  //     const fetchSuppliers = async () => {
  //       if (selectedServiceId) {
  //         try {
  //           const response = await axiosInstance.get(
  //             `/inventory/master-data/service/service-supplier/select/${selectedServiceId}`
  //           );
  //           if (response.data.status === 200) {
  //             const formattedSuppliers = response.data.data.supplier_services.map(
  //               (supplier: any) => ({
  //                 value: supplier.id,
  //                 label: supplier.name,
  //               })
  //             );
  //             setSupplierOptions(formattedSuppliers);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching suppliers:", error);
  //           setSupplierOptions([]);
  //         }
  //       } else {
  //         setSupplierOptions([]);
  //       }
  //     };
  //     fetchSuppliers();
  //   }, [selectedServiceId]);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      console.log(data);
      // Temukan nama dari opsi yang dipilih
      const selectedService = serviceOptions.find(
        (opt) => opt.value === data.service
      ) || { value: "", label: "" };
      const selectedSupplier = supplierOptions.find(
        (opt) => opt.value === data.supplier
      ) || { value: "", label: "" };

      console.log("serviceOptions", serviceOptions);
      console.log("supplierOptions", supplierOptions);

      const processedData: any = {
        price: data.price,
        service: {
          id: selectedService.value,
          name: selectedService.label,
        },
        supplier: {
          id: selectedSupplier.value,
          name: selectedSupplier.label,
        },
      };
      await onSubmit(processedData);
      reset();
      handleClose();
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <OverlayLoader />
      </>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <h2>Layanan</h2>
      </Modal.Header>
      <Modal.Body>
        {/* Section Layanan */}
        <div className="mb-6">
          <Row>
            <Col md={6}>
              <Controller
                name="service"
                control={control}
                rules={{ required: "Layanan wajib dipilih" }}
                render={({ field }) => (
                  <SelectField
                    label="Service"
                    options={serviceOptions}
                    placeholder="Pilih layanan"
                    control={control}
                    errors={errors}
                    {...field}
                  />
                )}
              />
            </Col>

            <Col md={6}>
              <Controller
                name="price"
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

        {/* Buttons */}
        <div className="d-flex mt-4 g-4 justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Batalkan
          </Button>
          <div className="d-flex gap-4">
            <button
              type="button"
              className="btn border border-primary px-8 py-2 text-primary"
            >
              Simpan & Tambah Baru
            </button>
            <button
              type="submit"
              className="btn btn-primary border border-primary px-16 py-2"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
