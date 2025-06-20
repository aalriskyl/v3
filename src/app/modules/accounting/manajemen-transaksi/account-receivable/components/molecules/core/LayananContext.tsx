import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../service/axiosInstance";

interface LayananContextProps {
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

const LayananContext = createContext<LayananContextProps | undefined>(
  undefined
);

export const LayananProvider: React.FC<{
  children: React.ReactNode;
  sales_order_id?: string;
}> = ({ children, sales_order_id }) => {
  const fetchUrl =
    "/sales/submission/sales-order/sales-order-service/sales-order";
  // const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = useCallback(async () => {
    if (!sales_order_id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${fetchUrl}/${sales_order_id}?search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex, // Add page parameter
            size: pagination.pageSize, // Add size parameter
          },
        }
      );
      const layanans = response.data;
      console.log({ getLayanan: layanans });
      setData(layanans.data.sales_order_services);
      setTotalData(layanans.data.total_page * pagination.pageSize);
      console.log("materials", layanans.data.sales_order_services);
    } catch (err) {
      setError("Failed to fetch materials");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [sales_order_id, pagination.pageIndex, pagination.pageSize, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <LayananContext.Provider
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
    </LayananContext.Provider>
  );
};

export const useLayanan = () => {
  const context = useContext(LayananContext);
  if (!context) {
    throw new Error("useLayanan must be used within a LayananProvider");
  }
  return context;
};
