import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import DateInputField from "@metronic/layout/components/form/molecules/DateInputField";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import MaterialDetailSectionLayout from "./MaterialDetailSectionLayout";
import LayananDetailSectionLayout from "./LayananDetailSectionLayout";
import MaterialSectionLayout from "./MaterialSectionLayout";
import TermsOfPaymentLayout from "./TermsOfPaymentLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import axiosInstancePar from "../../../../../../../service/axiosInstanceNoCompany";

interface DataType {
  approved_by: any;
  customer: {
    id: string;
    name: string;
    is_company?: {
      id: string;
      name: string;
    };
  };
  id: string;
  no_sales_order: string;
  purchase_order: {
    id: {
      id: "9fde4110-7ade-4d38-a141-c59a08781bda";
      no_purchase_order: "PO-1";
    };
    no_purchase_order: "PO-1";
  } | null;
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  type: string;
}

interface FormData {
  top_id: string;
  purchase_order_id: string;
}

interface FormProps {
  mode: "create" | "edit";
  defaultValues?: FormData;
  successMessage?: string;
  formTitle?: string;
  headTitle: string;
  buttonTitle: string;
  submitButtonLabel?: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  top_id: Yup.string().required("Purchase Request Number is required"),
  purchase_order_id: Yup.string().required("Terms of Payment is required"),
});

const Form: FC<FormProps> = ({
  defaultValues,
  successMessage,
  formTitle,
  headTitle,
  buttonTitle,
  submitButtonLabel,
  message,
  mode,
}) => {
  const { id } = useParams<{ id: string }>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newId, setNewId] = useState("");

  const navigate = useNavigate();

  const [preOrderChoice, setPreOrderChoice] = useState<PreOrderChoiceType[]>([]);
  const [selectedPo, setSelectedPo] = useState<PreOrderChoiceType | null>(null);
  const [topChoice, setTopChoice] = useState<TopChoiceType[]>([]);
  const [data, setData] = useState<undefined | DataType>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {
      purchase_order_id: "",
      top_id: "",
    },
  });

  const getData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/accounting/management-transaction/account-payable/${id}`
      );
      const { purchase_order } = res.data.data;

      // Set the fetched purchase_order_id in the form
      setValue("purchase_order_id", purchase_order?.id);

      // Find the corresponding preOrderChoice and set it as selected
      const foundPo = preOrderChoice.find(item => item.id === purchase_order?.id);
      if (foundPo) {
        setSelectedPo(foundPo);
      }

      console.log({ getData: res.data.data });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const poResponse = await axiosInstance.get(
          `/procurement/submission/purchase-order/select?company_id=${localStorage.getItem("company_id")}&status=Waiting`
        );
        console.log({ getSelectPo: poResponse.data.data });
        setPreOrderChoice(poResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const purchase_order_id = watch("purchase_order_id");
  const top_id = watch("top_id");

  useEffect(() => {
    const findData = preOrderChoice.find(
      (item) => item.id === purchase_order_id
    );
    if (findData) {
      setSelectedPo(findData);
    } else {
      setSelectedPo(null); // Reset selectedPo if no match is found
    }
  }, [purchase_order_id, preOrderChoice]);

  useEffect(() => {
    const fetchTopChoice = async () => {
      if (!selectedPo) return; // Only fetch if selectedPo is set
      setIsLoading(true);
      try {
        const topResponse = await axiosInstancePar.get(
          `/accounting/master-data/top/select?company_id=${selectedPo.type === "Warehouse"
            ? selectedPo.supplier.is_company_id
            : localStorage.getItem("company_id")
          }`
        );
        console.log({ getSelectTop: topResponse.data.data });
        setTopChoice(topResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopChoice();
  }, [selectedPo]); // Fetch topChoice when selectedPo changes

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        purchase_order_id,
        top_id,
      };
      let response;
      if (mode === "create") {
        response = await axiosInstance.post(
          `/accounting/management-transaction/account-payable?company_id=${localStorage.getItem("company_id")}`,
          payload
        );
        setNewId(response.data.data.id);
      } else if (mode === "edit" && id) {
        response = await axiosInstance.put(
          `/accounting/management-transaction/account-payable/${id}`,
          payload
        );
        await getData();
      }
      setIsSuccessModalVisible(true);
      reset();
    } catch (error) {
      setFailedMessage(
        (error as any).response.data.field ||
        (mode === "create" ? "Gagal menambahkan COA" : "Gagal mengupdate COA")
      );
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      {!isLoading && (
        <form
          onSubmit={handleSubmit(() => {
            setIsModalVisible(true);
          })}
        >
          <div className="w-100">
            <div className="card p-5">
              <div className="row g-2">
                <h3 className="mb-6">Purchase Order</h3>
                <div className="col-md-6">
                  <SelectField
                    name="purchase_order_id"
                    label="Nomor Purchase Request"
                    control={control}
                    errors={errors}
                    options={[
                      { value: '', label: 'Tidak ada' }, // opsi default untuk null
                      ...preOrderChoice.map((item: any) => ({
                        value: item.id,
                        label: item.no_purchase_order,
                      }))
                    ]}
                    placeholder="Pilih nomor Purchase Request"
                  />
                </div>
                <div className="col-md-6">
                  <SelectField
                    name="top_id"
                    label="Terms of Payment"
                    control={control}
                    errors={errors}
                    options={topChoice.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder="Pilih terms of payment"
                  />
                </div>
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
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-12 py-3 border border-primary"
                disabled={!isValid || isLoading}
              >
                {submitButtonLabel || buttonTitle}
              </button>
            </div>
          </div>

          {isModalVisible && (
            <ConfirmModal
              handleSubmit={onSubmit}
              closeModal={() => setIsModalVisible(false)}
              headTitle={headTitle}
              confirmButtonLabel={buttonTitle}
              buttonTitle={"Submit"}
              cancelButtonLabel="Batalkan"
              message={message}
            />
          )}

          {isSuccessModalVisible && (
            <SuccessModal
              closeModal={() => {
                setIsSuccessModalVisible(false);
                if (mode === "create") {
                  navigate(
                    `/accounting/manajemen-transaksi/purchase-order/detail/${newId}`
                  );
                }
                if (mode === "edit") {
                  navigate(
                    `/accounting/manajemen-transaksi/purchase-order/detail/${id}`
                  )
                }
              }}
              successMessage={successMessage || "Form submitted successfully!"}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default Form;

type PreOrderChoiceType = {
  customer: {
    id: string;
    name: string;
  };
  id: string;
  no_purchase_order: string;
  status: string;
  supplier: {
    id: string;
    name: string;
    is_company_id: string | null;
  };
  type: string;
};

type TopChoiceType = {
  created_at: string;
  id: string;
  name: string;
  status: boolean;
};