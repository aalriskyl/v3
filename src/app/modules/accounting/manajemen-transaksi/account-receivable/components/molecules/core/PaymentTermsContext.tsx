import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

interface PaymentTermsContextProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalData: number;
  isLoading: boolean;
  error: string | null;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  fetchData: () => Promise<void>;
}

const PaymentTermsContext = createContext<PaymentTermsContextProps | undefined>(
  undefined
);

export const PaymentTermsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const fetchUrl =
    "/accounting/management-transaction/account-receivable/sales-payment-terms/account-receivable";
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${fetchUrl}/${id}?search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex, // Add page parameter
            size: pagination.pageSize, // Add size parameter
          },
        }
      );
      const paymentTerms = response.data;
      console.log({ getPaymentTerms: paymentTerms });
      setData(paymentTerms.data.sales_payment_terms);
      setTotalData(paymentTerms.data.total_page * pagination.pageSize);
    } catch (err) {
      setError("Failed to fetch materials");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id, pagination.pageIndex, pagination.pageSize, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [firstView, setFirstView] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      searchTerm.length === 0 &&
      data.length === 0 &&
      !isLoading &&
      !firstView
    ) {
      setShowModal(true);
    }
    if (!isLoading) {
      setFirstView(true);
    }
  }, [data, searchTerm, isLoading, firstView]);

  return (
    <PaymentTermsContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        totalData,
        isLoading,
        error,
        status,
        setStatus,
        pagination,
        setPagination,
        fetchData,
      }}
    >
      {showModal && (
        <FailedModal
          title="Warning"
          message="Harap Tambahkan Payment Terms Terlebih Dahulu"
          closeModal={() => {
            setShowModal(false);
            navigate(`../edit/${id}`);
          }}
        />
      )}
      {children}
    </PaymentTermsContext.Provider>
  );
};

export const usePaymentTerms = () => {
  const context = useContext(PaymentTermsContext);
  if (!context) {
    throw new Error(
      "usePaymentTerms must be used within a PaymentTermsProvider"
    );
  }
  return context;
};
