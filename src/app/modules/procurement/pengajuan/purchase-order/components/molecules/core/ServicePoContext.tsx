import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAllServicePo } from "../../../core/_request";
import { useParams } from "react-router-dom";

interface ServicesPurchaseOrderContextProps {
  data: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalData: number;
  isLoading: boolean;
  error: string | null;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  fetchData: () => Promise<void>;
  quotationId: string | null; // New state for quotation ID
}

const ServicesPurchaseOrderContext = createContext<
  ServicesPurchaseOrderContextProps | undefined
>(undefined);

export const ServicesPurchaseOrderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quotationId, setQuotationId] = useState<string | null>(null); // New state for quotation ID

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllServicePo(
        id || "",
        searchTerm,
        pagination.pageIndex + 1,
        pagination.pageSize
      );
      setData(res.data.purchase_order_services);
      setTotalData(res.data.total_page * pagination.pageSize);
      setQuotationId(res.data.quotation?.id || null); // Set quotation ID based on response
      console.log("materials", res);
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
    <ServicesPurchaseOrderContext.Provider
      value={{
        data,
        searchTerm,
        setSearchTerm,
        totalData,
        isLoading,
        error,
        pagination,
        setPagination,
        fetchData,
        quotationId, // Provide the quotation ID in the context
      }}
    >
      {children}
    </ServicesPurchaseOrderContext.Provider>
  );
};

export const useServicesPurchaseOrders = () => {
  const context = useContext(ServicesPurchaseOrderContext);
  if (!context) {
    throw new Error(
      "usePurchaseOrders must be used within a PurchaseOrderProvider"
    );
  }
  return context;
};
