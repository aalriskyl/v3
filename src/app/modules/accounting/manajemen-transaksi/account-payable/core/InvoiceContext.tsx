import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../service/axiosInstance";

interface InvoiceContextProps {
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

const InvoiceContext = createContext<InvoiceContextProps | undefined>(
  undefined
);

export const InvoiceProvider: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id }) => {
  const fetchUrl = "/procurement/submission/purchase-invoice/";
  // const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${fetchUrl}?status=Approved&id=${id}&search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex, // Add page parameter
            size: pagination.pageSize, // Add size parameter
          },
        }
      );
      const invoice = response.data;
      setData(invoice.data.purchase_invoices);
      setTotalData(invoice.data.total_page * pagination.pageSize);
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

  return (
    <InvoiceContext.Provider
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
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceProvider");
  }
  return context;
};
