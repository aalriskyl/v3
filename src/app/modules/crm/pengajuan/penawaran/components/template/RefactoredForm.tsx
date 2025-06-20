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
import axiosInstance from "../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import {
  getSupplierIsCompanyFalse,
  getSupplierIsCompanyTrue,
} from "../../core/_request";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface FormData {
  // plan_production: string;
  customer: string;
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
  // plan_production: Yup.string().optional(),
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
  const [newId, setNewId] = useState<string | null>(null);
  const [supplierOptions, setSupplierOptions] = useState([]) as any;
  const [materialRequestData, setMaterialRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [materialChoice, setMaterialChoice] = useState([]) as any;
  const [dataSelect, setDataSelect] = useState<any>(null);
  const [isTypeChangedManually, setIsTypeChangedManually] = useState(false);
  const [customerData, setCustomerData] = useState<any[]>([]); // Initialize as an empty array
  const [failedMessage, setFailedMessage] = useState<string | null>(null)

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
          const response = await axiosInstance.get(`/crm/submission/quotation/${id}`);
          const data = response.data.data;
          setValue("customer", data.customer.id);
          setValue("type", data.type);
        } catch (error) {
          console.error("Error fetching material request data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setIsLoading(false); // Ensure loading is false for create mode
    }
  }, [mode, id, setValue]);

  // Fetch suppliers based on selected type
  useEffect(() => {
    const fetchCustomers = async () => {
      if (selectedType === "Outlet") {
        try {
          const res = await axiosInstance.get(`/sales/master-data/customer/select?is_a_company=true`);
          console.log('is a company true', res)
          const mappedCustomers = res.data.data.map((customer: any) => ({
            value: customer.id,
            label: customer.name,
          }));
          setCustomerData(mappedCustomers);
        } catch (error) {
          console.error("Error fetching company true customers:", error);
          setCustomerData([]);
        }
      } else if (selectedType === "Customer") {
        try {
          const res = await axiosInstance.get(`/sales/master-data/customer/select?is_a_company=false`);
          const mappedCustomers = res.data.data.map((customer: any) => ({
            value: customer.id,
            label: customer.name,
          }));
          setCustomerData(mappedCustomers);
          console.log('Fetched Customer Suppliers:', mappedCustomers);
        } catch (error) {
          console.error("Error fetching company false customers:", error);
          setCustomerData([]);
        }
      }
    };

    fetchCustomers();
  }, [selectedType]); // Trigger the effect when selectedType changes

  // Watch for changes in the type field
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "type") {
        setIsTypeChangedManually(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const userId = JSON.parse(localStorage.getItem("userLogin") || "").user.id;
    try {
      const payload = {
        customer_id: data.customer, 
        type: data.type,
      };
      
      if (mode === "edit" && id) {
        await axiosInstance.put(`/crm/submission/quotation/${id}`, payload);
        return id; // Return the ID for consistency
      } else {
        const response = await axiosInstance.post(`/crm/submission/quotation`, payload);
        setNewId(response.data.data.id);
      }
    } catch (error: any) {
      throw error; // Re-throw the error to be caught by the calling function
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = () => {
    setIsModalVisible(true); // Show confirmation modal
  };
  
  const handleConfirm = async () => {
    setIsModalVisible(false); // Close confirmation modal
    try {
      await handleSubmit(async (data) => {
        try {
          const newId = await onSubmit(data);
          setIsSuccessModalVisible(true); // Show success modal
          return newId;
        } catch (error) {
          setFailedMessage(getErrorMessage(error));
          throw error; // Re-throw to be caught by the outer catch
        }
      })();
    } catch (error) {
      // This catches any errors from the form validation
      console.error("Form validation error:", error);
    }
  };


  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <div className="card p-5 w-100">
        <div className="row g-2">
          <h3 className="mb-6">Penawaran</h3>
        </div>
        <div className="row g-2">
          <div className="col-md-6">
            <SelectField
              placeholder="Pilih Tipe"
              name="type"
              label="Tipe"
              control={control}
              options={[
                { value: "Outlet", label: "Outlet" },
                { value: "Customer", label: "Customer" },
              ]}
              errors={errors}
            />
          </div>
            <div className="col-md-6">
              {selectedType === "Outlet" && (
                <SelectField
                  placeholder="Pilih Outlet"
                  name="customer"
                  label="Outlet"
                  control={control}
                  options={customerData} // Use customerData for options
                  errors={errors}
                />
              )}
              {selectedType === "Customer" && (
                <SelectField
                  placeholder="Pilih Customer"
                  name="customer"
                  label="Customer"
                  control={control}
                  options={customerData} // Use customerData for options
                  errors={errors}
                />
              )}
            </div>
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
            className="btn btn-primary px-12 py-3 border border-primary me-2"
          >
            {mode === "edit" ? "Ubah" : "Simpan Draft"}
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
          closeModal={() => {
            setIsSuccessModalVisible(false);
            if (mode === "create") {
              navigate(
                `../detail/${newId}`
              );
            }
            if (mode === "edit") {
              navigate(
                `../detail/${id}`
              );
            }
          }}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default Form;