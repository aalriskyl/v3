// StockOpnameContext.tsx (File terpisah)
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getAllStockOpname } from "../../../core/_request";
import { useParams } from "react-router-dom";

interface StockOpnameContextProps {
  data: any[];
  searchTerm: string;
  status: string;
  setStatus: (term: string) => void;
  setSearchTerm: (term: string) => void;
  // category: string; // Renamed from `status`
  // setCategory: (category: string) => void; // Renamed from `setStatus`
  totalData: number;
  isLoading: boolean;
  error: string | null;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  submittedDate: string;
  setSubmittedDate: (date: string) => void;
  submittedDateTo: string;
  setSubmittedDateTo: (date: string) => void;
  approvedDate: string;
  setApprovedDate: (date: string) => void;
  approvedDateTo: string;
  setApprovedDateTo: (date: string) => void;
}

const StockOpnameContext = createContext<StockOpnameContextProps | undefined>(
  undefined
);

export const StockOpnameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [submittedDateTo, setSubmittedDateTo] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [approvedDateTo, setApprovedDateTo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllStockOpname(
          searchTerm,
          status,
          pagination.pageIndex + 1,
          pagination.pageSize,
          submittedDate,
          submittedDateTo,
          approvedDate,
          approvedDateTo
        );
        if (response.data) {
          console.log({ getAll: response.data });
          setData(response.data.stock_opnames || []);
          setTotalData(response.data.total_page * pagination.pageSize);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    searchTerm,
    pagination.pageIndex,
    pagination.pageSize,
    submittedDate,
    submittedDateTo,
    approvedDate,
    approvedDateTo,
    status,
  ]);

  return (
    <StockOpnameContext.Provider
      value={{
        searchTerm,
        status,
        setStatus,
        data,
        isLoading,
        submittedDate,
        setSubmittedDate,
        submittedDateTo,
        setSubmittedDateTo,
        approvedDate,
        setApprovedDate,
        approvedDateTo,
        setApprovedDateTo,
        error,
        setSearchTerm,
        totalData,
        pagination,
        setPagination,
      }}
    >
      {children}
    </StockOpnameContext.Provider>
  );
};

export const useStockOpnames = () => {
  const context = useContext(StockOpnameContext);
  if (!context) {
    throw new Error(
      "useStockOpnames must be used within a StockOpnameProvider"
    );
  }
  return context;
};
