/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import MaterialSectionLayout from "./MaterialSectionLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import {
  getSupplierIsCompanyFalse,
  getSupplierIsCompanyTrue,
} from "../../core/_request";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  plan_production: string;
  supplier: string;
  type: string;
}

interface FormProps {
  mode: "create" | "edit"; // Add mode prop
  defaultValues?: FormData;
  successMessage?: string;
  formTitle?: string;
  headTitle: string;
  buttonTitle: string;
  submitButtonLabel?: string;
  message: string;
}

interface MaterialRequestPayload {
  amount: Number;
  material_id: string;
  material_uom_id: string;
  material_supplier_id: string;
}

const validationSchema = Yup.object().shape({
  plan_production: Yup.string().optional(),
  supplier: Yup.string().required("Supplier wajib dipilih"),
  type: Yup.string().required("Supplier wajib dipilih"),
});

const Form: FC<FormProps> = ({
  mode,
  defaultValues,
  successMessage,
  headTitle,
  buttonTitle,
  message,
}) => {
  const { id } = useParams<{ id: string }>(); // Get id from URL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const navigate = useNavigate();
  const [supplierOptions, setSupplierOptions] = useState([]) as any;
  const [materialRequestData, setMaterialRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [materialChoice, setMaterialChoice] = useState([]) as any;
  const [dataSelect, setDataSelect] = useState<any>(null);
  const [isTypeChangedManually, setIsTypeChangedManually] = useState(false);
  const [suppliersIsCompanyTrue, setSuppliersIsCompanyTrue] = useState<any[]>(
    []
  );
  const [suppliersIsCompanyFalse, setSuppliersIsCompanyFalse] = useState<any[]>(
    []
  );
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Add setValue from useForm
  } = useForm<any>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      plan_production: "",
      supplier: "",
      type: "",
    },
  });

  const selectedType = watch("type");

  // Fetch data for edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/inventory/submission/delivery-management/material-request/${id}`
          );
          const data = response.data.data;

          // Set default values for the form
          setValue("plan_production", data.plan_production || "");
          setValue("supplier", data.supplier.id);
          setValue("type", data.type);
        } catch (error) {
          console.error("Error fetching material request data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [mode, id, setValue]);

  // Fetch suppliers based on selected type
  useEffect(() => {
    const fetchSuppliers = async () => {
      if (selectedType === "Warehouse") {
        try {
          const suppliers = await getSupplierIsCompanyTrue();
          setSuppliersIsCompanyTrue(suppliers ?? []);
          console.log("walah", suppliers);
        } catch (error) {
          console.error("Error fetching company true suppliers:", error);
          setSuppliersIsCompanyTrue([]);
        }
      } else if (selectedType === "Supplier") {
        try {
          const suppliers = await getSupplierIsCompanyFalse();
          setSuppliersIsCompanyFalse(suppliers ?? []);
        } catch (error) {
          console.error("Error fetching company false suppliers:", error);
          setSuppliersIsCompanyFalse([]);
        }
      }
    };

    fetchSuppliers();
  }, [selectedType]);

  // Watch for changes in the type field
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "type") {
        setIsTypeChangedManually(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Fetch supplier options
  useEffect(() => {
    axiosInstance
      .get("/procurement/master-data/supplier/select")
      .then((res) => {
        setSupplierOptions(
          res.data.data.map((c: any) => ({ value: c.id, label: c.name }))
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const userId = JSON.parse(localStorage.getItem("userLogin") || "").user.id;
    try {
      const payload = {
        doc_type: "",
        supplier_id: data.supplier, // Always include supplier_id
        type: data.type,
        requested_by_id: userId,
      };

      let newId: string;

      if (mode === "edit" && id) {
        // Update existing material request
        await axiosInstance.put(
          `/inventory/submission/delivery-management/material-request/${id}`,
          payload
        );
        newId = id; // Use the existing ID for navigation
      } else {
        // Create new material request
        const reqMaterial = await axiosInstance.post(
          `/inventory/submission/delivery-management/material-request`,
          payload
        );
        newId = reqMaterial.data.data.id; // Extract the new ID from the response

        // Handle material choices
        materialChoice.forEach((data: any) => {
          const materialPayload: MaterialRequestPayload = {
            amount: Number(data.quantity),
            material_id: data.material.id,
            material_supplier_id: data.material_supplier.id,
            material_uom_id: data.uom.id,
          };
          axiosInstance.post(
            `/inventory/submission/delivery-management/material-request/material-request-material/${newId}`,
            materialPayload
          );
        });
      }

      // Navigate to the new or updated material request
      navigate(
        `/inventory/pengajuan/manajemen-pengiriman/material-request/detail/${newId}`
      );
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const selectSupplier = watch("supplier");

  // Fetch material request data based on selected supplier
  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/inventory/master-data/material/select-supplier/${selectSupplier}`)
      .then((res) => {
        const filteredMaterialRequest = res.data.data.map((material: any) => ({
          ...material,
          material_uom: material.material_uom.map((uom: any) => ({
            ...uom,
            material_suppliers: uom.material_suppliers.filter(
              (supplier: any) => supplier.supplier_id === selectSupplier
            ),
          })),
        }));
        setMaterialRequestData(filteredMaterialRequest);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectSupplier]);

  const handleSave = async () => {
    handleSubmit(async (data) => {
      await onSubmit(data);
    })();
  };

  const handleConfirm = () => {};

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <div className="card p-5 w-100">
        <div className="row g-2">
          <h3 className="mb-6">Material Request</h3>
          <div className="col-md-6">
            <SelectField
              placeholder="Tipe rencana produksi"
              name="plan_production"
              label="Plan Production"
              control={control}
              options={[
                { value: "Tidak Ada", label: "Tidak Ada" },
                { value: "Lorem1", label: "Lorem1" },
                { value: "Lorem2", label: "Lorem2" },
              ]}
              errors={errors}
              disabled={true}
            />
          </div>
        </div>
        <div className="row g-2">
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
            />
          </div>
          {watch("type") === "Supplier" &&
            (dataSelect?.id ? (
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
              />
            ))}
          {watch("type") === "Warehouse" &&
            (dataSelect?.id ? (
              <SelectField
                placeholder="Pilih Internal"
                name="supplier" // Corrected: Use "supplier" as the name
                label="Internal"
                control={control}
                options={[
                  {
                    value: dataSelect.supplier.id,
                    label: dataSelect.supplier.name,
                  },
                ]}
                errors={errors}
              />
            ) : (
              <SelectField
                placeholder="Pilih Internal"
                name="supplier" // Corrected: Use "supplier" as the name
                label="Internal"
                control={control}
                options={suppliersIsCompanyTrue.map((supplier) => ({
                  value: supplier.id,
                  label: supplier.name,
                }))}
                errors={errors}
              />
            ))}
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
            type="button"
            onClick={handleSave}
            className="btn btn-primary px-12 py-3 border border-gray-500 me-2"
          >
            {mode === "edit" ? "Update" : "Simpan Draft"}
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
        />
      )}
      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => setIsSuccessModalVisible(false)}
          successMessage={successMessage || "Form submitted successfully!"}
        />
      )}
    </div>
  );
};

export default Form;
