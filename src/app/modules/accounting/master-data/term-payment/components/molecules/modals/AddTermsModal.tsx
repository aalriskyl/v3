import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { usePaymentTerms } from "../../template/SupplierTableLayout";

interface MaterialFormData {
  name: string;
  invoice_portion: number;
  due_date_based_on: string;
  credit_days: number; // Added credit_days for clarity
  description: string; // Added description for clarity
}

interface AddMaterialModalProps {
  show: boolean;
  handleClose: () => void;
}

// Options for "Due Date Based On"
const dueDateOptions = [
  {
    id: "1",
    value: "days_after_invoice_date",
    label: "Day(s) after invoice date",
  },
  {
    id: "2",
    value: "days_after_end_of_invoice_month",
    label: "Day(s) after the end of the invoice month",
  },
  {
    id: "3",
    value: "months_after_end_of_invoice_month",
    label: "Month(s) after the end of the invoice month",
  },
];

export const AddTermsModal = ({ show, handleClose }: AddMaterialModalProps) => {
  const { fetchPaymentTerms } = usePaymentTerms();
  const { id } = useParams<{ id: string }>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<MaterialFormData>({
    defaultValues: {
      name: "",
      invoice_portion: 0,
      due_date_based_on: "",
      credit_days: 0,
      description: "",
    },
  });

  const name = watch("name");
  const invoice_portion = watch("invoice_portion");
  const due_date_based_on = watch("due_date_based_on");
  const credit_days = watch("credit_days");
  const description = watch("description");

  const [selectedDueDate, setSelectedDueDate] = useState<string>(""); // State to track selected due date option

  useEffect(() => {
    if (show) {
      reset(); // Reset form each time the modal is opened
      setSelectedDueDate(""); // Reset selected due date
    }
  }, [show, reset]);

  const handleFormSubmit = async (data: MaterialFormData) => {
    if (!id) {
      setFailedMessage("ID is required to create a material.");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        name,
        invoice_portion: parseFloat(invoice_portion.toString()),
        due_date_based_on,
        credit_days: parseInt(credit_days.toString()),
        description,
      };
      console.log("Payload:", payload);
      const res = await axiosInstance.post(
        `/accounting/master-data/top/payment-terms/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        payload
      );
      console.log({ res });
      await fetchPaymentTerms();
      setSuccessMessage("Berhasil membuat payment terms");
    } catch (error) {
      setFailedMessage(
        (error as any)?.response?.data?.field?.body ||
          (error as any)?.response?.data?.field ||
          "Gagal membuat payment terms"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Modal
        show={successMessage || failedMessage ? false : show}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <h2>Tambah Payment Terms</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Section Material */}
            <div className="mb-6">
              <Row>
                <Col md={6}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Material wajib dipilih" }}
                    render={({ field }) => (
                      <InputField
                        label="Nama Payment Terms"
                        placeholder="Nama Payment Terms"
                        control={control}
                        errors={errors}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md={6}>
                  <Controller
                    name="invoice_portion"
                    control={control}
                    rules={{
                      required: "Jumlah wajib diisi",
                      min: {
                        value: 1,
                        message: "Isi invoice portion",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Hanya angka yang diperbolehkan",
                      },
                    }}
                    render={({ field }) => (
                      <InputField
                        label="Invoice Portion"
                        type="number"
                        placeholder="Masukkan invoice portion"
                        control={control}
                        errors={errors}
                        {...field}
                        withPercentage={true}
                      />
                    )}
                  />
                </Col>
              </Row>
            </div>

            {/* Section Due Date Based On */}
            <div className="mb-6">
              <Row>
                <Col md={6}>
                  <Controller
                    name="due_date_based_on"
                    control={control}
                    rules={{ required: "Due date based on wajib dipilih" }}
                    render={({ field }) => (
                      <SelectField
                        label="Due Date Based On"
                        options={dueDateOptions}
                        placeholder="Pilih due date based on"
                        control={control}
                        errors={errors}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Call the original onChange
                          setSelectedDueDate(e); // Update the selected due date state
                        }}
                      />
                    )}
                  />
                </Col>
                <Col md={6}>
                  <Controller
                    name="credit_days"
                    control={control}
                    rules={{
                      required: "Jumlah credit days wajib diisi",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Hanya angka yang diperbolehkan",
                      },
                    }}
                    render={({ field }) => (
                      <InputField
                        label={
                          selectedDueDate ===
                          "months_after_end_of_invoice_month"
                            ? "Credit Month(s)"
                            : "Credit Day(s)"
                        }
                        type="number"
                        placeholder={
                          selectedDueDate ===
                          "months_after_end_of_invoice _month"
                            ? "Masukkan credit month(s)"
                            : "Masukkan credit day(s)"
                        }
                        control={control}
                        errors={errors}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Row>
            </div>

            {/* Section Description */}
            <div className="mb-6">
              <Row>
                <Col md={6}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextareaField
                        label="Deskripsi"
                        placeholder="Masukkan deskripsi"
                        control={control}
                        errors={errors}
                        {...field}
                        required={false}
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
              <Button
                type="submit"
                className="btn btn-primary border border-primary px-16 py-2"
              >
                Simpan
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={"Tutup"}
        />
      )}
      {successMessage && (
        <SuccessModal
          closeModal={() => {
            handleClose();
            setFailedMessage(null);
          }}
          successMessage={successMessage}
        />
      )}
    </>
  );
};
