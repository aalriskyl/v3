import { FC, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import {
  getAllMaterialRequest,
  getSingleMaterialRequest,
  createSingleMaterialRequest,
  getSupplierIsCompanyFalse,
  getSupplierIsCompanyTrue,
  createPurchaseOrderMaterial,
  createPurchaseOrder,
  getSinglePurchaseOrder,
  updatePo,
} from "../../core/_request";
import RichTextEditor from "@metronic/layout/components/form/molecules/RichTextEditor";
import DateInputField from "../molecules/field/DateInputField";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  purchase_order_number?: string;
  material_request?: string;
  is_a_company?: boolean;
  supplier?: string;
  type: string;
  warehouse?: string;
  term_of_condition?: string;
  posting_date?: Date;
}

interface FormProps {
  mode: "create" | "edit";
  successMessage?: string;
  formTitle?: string;
  headTitle: string;
  buttonTitle: string;
  submitButtonLabel?: string;
  message: string;
  defaultValues?: FormData;
}

const validationSchema = Yup.object().shape({
  purchase_order_number: Yup.string().optional(),
  material_request: Yup.string().optional(),
  type: Yup.string().required("Tipe wajib dipilih"),
  supplier: Yup.string().test(
    "supplier-required",
    "Supplier wajib dipilih",
    function (value) {
      const { type } = this.parent;
      return type === "Supplier" ? !!value : true;
    }
  ),
  warehouse: Yup.string().test(
    "warehouse-required",
    "Warehouse wajib dipilih",
    function (value) {
      const { type } = this.parent;
      return type === "Warehouse" ? !!value : true;
    }
  ),
  term_of_condition: Yup.string().optional(),
});

const Form: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  formTitle,
  headTitle,
  submitButtonLabel,
  buttonTitle,
  message,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isTypeChangedManually, setIsTypeChangedManually] = useState(false);
  const [dataSelect, setDataSelect] = useState<any>(null);
  const [suppliersIsCompanyTrue, setSuppliersIsCompanyTrue] = useState<any[]>(
    []
  );
  const [suppliersIsCompanyFalse, setSuppliersIsCompanyFalse] = useState<any[]>(
    []
  );
  const [termOfCondition, setTermOfCondition] = useState<string>(""); // State for term of condition
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const isEditModeLocked = mode === "edit" && id;
  const selectedMaterialRequest = watch("material_request");
  const selectedType = watch("type");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "type") {
        setIsTypeChangedManually(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMaterialRequest();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch material requests:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      if (!selectedMaterialRequest) {
        // kalau material request kosong, fetch berdasarkan type yang dipilih
        if (selectedType === "Warehouse") {
          try {
            const suppliers = await getSupplierIsCompanyTrue();
            setSuppliersIsCompanyTrue(suppliers ?? []);
            setSuppliersIsCompanyFalse([]); // pastikan yang false dikosongin
          } catch (error) {
            console.error("Error fetching company true suppliers:", error);
            setSuppliersIsCompanyTrue([]);
          }
        } else if (selectedType === "Supplier") {
          try {
            const suppliers = await getSupplierIsCompanyFalse();
            setSuppliersIsCompanyFalse(suppliers ?? []);
            setSuppliersIsCompanyTrue([]); // pastikan yang true dikosongin
          } catch (error) {
            console.error("Error fetching company false suppliers:", error);
            setSuppliersIsCompanyFalse([]);
          }
        }
      }
    };

    fetchSuppliers();
  }, [selectedType, selectedMaterialRequest]);

  useEffect(() => {
    const fetchPurchaseOrderDetails = async () => {
      if (mode === "edit" && id && !selectedMaterialRequest) {
        try {
          setLoading(true);
          const response = await getSinglePurchaseOrder(id);
          const poData = response.data;

          // Set basic fields
          setValue("purchase_order_number", poData.purchase_order_number);
          setValue("material_request", poData.material_request?.id || "");
          setValue("type", poData.type);

          // Handle term_of_condition (ensure it's never null)
          const initialTerm = poData.term_of_condition || "";
          setValue("term_of_condition", initialTerm);
          setTermOfCondition(initialTerm);

          // Handle posting date if exists
          if (poData.posting_date) {
            setValue("posting_date", new Date(poData.posting_date));
          }

          // Set supplier/warehouse based on type
          if (poData.type === "Supplier") {
            setValue("supplier", poData.supplier.id);
            setValue("warehouse", "");
          } else {
            setValue("warehouse", poData.supplier.id);
            setValue("supplier", "");
          }

          await trigger();
        } catch (error) {
          console.error("Failed to fetch purchase order details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPurchaseOrderDetails();
  }, [mode, id, setValue, trigger, selectedMaterialRequest]);

  useEffect(() => {
    const fetchMaterialRequestDetails = async () => {
      if (selectedMaterialRequest) {
        try {
          setLoading(true);
          const response = await getSingleMaterialRequest(
            selectedMaterialRequest
          );
          const type = response.supplier.is_a_company
            ? "Warehouse"
            : "Supplier";

          // Set fields from material request
          setValue("type", type);

          if (type === "Supplier") {
            setValue("supplier", response.supplier.id);
            setValue("warehouse", "");
          } else {
            setValue("warehouse", response.supplier.id);
            setValue("supplier", "");
          }

          setDataSelect(response);
        } catch (error) {
          console.error("Failed to fetch material request details:", error);
        } finally {
          setLoading(false);
        }
      } else if (!selectedMaterialRequest && mode === "create") {
        // Reset fields when material request is cleared in create mode
        reset({
          ...defaultValues,
          material_request: "",
          type: "",
          supplier: "",
          warehouse: "",
        });
        setTermOfCondition("");
        setDataSelect(null);
      }
    };

    fetchMaterialRequestDetails();
  }, [selectedMaterialRequest, setValue, reset, mode, defaultValues]);

  const onSubmit = (data: FormData) => {
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const formData = watch();
      const supplier_id =
        formData.type === "Supplier" ? formData.supplier : formData.warehouse;

      // Format posting_date as a string in ISO format
      const postingDateString = formData.posting_date
        ? new Date(formData.posting_date).toISOString()
        : "";

      const payload = {
        purchase_order_number: formData.purchase_order_number,
        ...(formData.material_request && {
          material_request_id: formData.material_request,
        }),
        type: formData.type,
        supplier_id,
        term_of_condition: termOfCondition, // Use the state value for term_of_condition
        posting_date: postingDateString, // Add posting_date as a string in ISO format
      };

      let poId;
      if (mode === "edit" && id) {
        await updatePo(id, payload);
        poId = id;
      } else {
        poId = await createPurchaseOrder(payload);
      }

      setIsModalVisible(false);
      setIsSuccessModalVisible(true);

      setTimeout(() => {
        setIsSuccessModalVisible(false);
        navigate(`/procurement/pengajuan/purchase-request/detail/${poId}`);
      });
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-5 w-100">
            <div className="row g-2">
              <h3 className="mb-6">Purchase Request</h3>
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Material Request"
                  name="material_request"
                  label="Material Request"
                  control={control}
                  options={[
                    { value: "", label: "Tidak ada" }, // opsi default untuk null
                    ...data.map((item: any) => ({
                      value: item.id,
                      label: item.no_material_request,
                    })),
                  ]}
                  errors={errors}
                  isRequired={false}
                  disabled={isEditModeLocked || !!selectedMaterialRequest}
                />

                {watch("type") === "Supplier" &&
                  (dataSelect?.supplier ? (
                    <SelectField
                      placeholder="Pilih External"
                      name="supplier"
                      label="External"
                      control={control}
                      options={[
                        {
                          value: dataSelect.supplier.id,
                          label: dataSelect.supplier.name,
                        },
                      ]}
                      errors={errors}
                      disabled={isEditModeLocked || !!selectedMaterialRequest} // Disabled when material request is selected
                    />
                  ) : (
                    <SelectField
                      placeholder="Pilih External"
                      name="supplier"
                      label="External"
                      control={control}
                      options={suppliersIsCompanyFalse.map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                      }))}
                      errors={errors}
                      disabled={isEditModeLocked || !!selectedMaterialRequest} // Disabled when material request is selected
                    />
                  ))}
                {watch("type") === "Warehouse" &&
                  (dataSelect?.supplier ? (
                    <SelectField
                      placeholder="Pilih Internal"
                      name="warehouse"
                      label="Internal"
                      control={control}
                      options={[
                        {
                          value: dataSelect.supplier.id,
                          label: dataSelect.supplier.name,
                        },
                      ]}
                      errors={errors}
                      disabled={isEditModeLocked || !!selectedMaterialRequest} // Disabled when material request is selected
                    />
                  ) : (
                    <SelectField
                      placeholder="Pilih Internal"
                      name="warehouse"
                      label="Internal"
                      control={control}
                      options={suppliersIsCompanyTrue.map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                      }))}
                      errors={errors}
                      disabled={isEditModeLocked || !!selectedMaterialRequest} // Disabled when material request is selected
                    />
                  ))}
              </div>
              <div className="col-md-6">
                <SelectField
                  placeholder="Pilih Tipe"
                  name="type"
                  label="Tipe"
                  control={control}
                  options={[
                    { value: "Supplier", label: "External" },
                    { value: "Warehouse", label: "Internal" },
                  ]}
                  errors={errors}
                  disabled={isEditModeLocked || !!selectedMaterialRequest} // Disabled when material request is selected
                />
                {/* <Controller
                                name="posting_date"
                                control={control}
                                render={({ field: dateField }) => (
                                    <DateInputField
                                        label="Tanggal Posting"
                                        value={dateField.value}
                                        onChange={(value) => dateField.onChange(value)} // Pass the value directly
                                        error={errors.posting_date?.message}
                                    />
                                )}
                            /> */}
              </div>
            </div>
            <div className="card p-5 w-100 mt-8">
              <h4 className="mb-8">Term of Condition</h4>
              <RichTextEditor
                value={termOfCondition || ""} // Ensure never null
                onChange={(content) => {
                  const safeContent = content || ""; // Convert null/undefined to empty string
                  setTermOfCondition(safeContent);
                  setValue("term_of_condition", safeContent);
                }}
                placeholder="Tulis deskripsi di sini..."
              />
              {errors.term_of_condition && (
                <p className="text-danger mt-2">
                  {errors.term_of_condition.message}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end row">
            <div className="col-12 text-end my-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn px-12 py-3 border border-gray-500 me-2"
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary px-12 py-3 border border-primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Mengirim..." : buttonTitle}
              </button>
            </div>
          </div>
          {failedMessage && (
            <FailedModal
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
            />
          )}
          {isModalVisible && (
            <ConfirmModal
              buttonTitle={buttonTitle}
              handleSubmit={handleConfirm}
              closeModal={() => setIsModalVisible(false)}
              headTitle={headTitle}
              confirmButtonLabel={buttonTitle}
              cancelButtonLabel="Kembali"
              message={message}
              isLoading={isSubmitting}
            />
          )}
          {isSuccessModalVisible && (
            <SuccessModal
              closeModal={() => setIsSuccessModalVisible(false)}
              successMessage={successMessage || "Form submitted successfully!"}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default Form;
