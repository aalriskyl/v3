import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../../service/axiosInstance";

interface MaterialContextProps {
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

const MaterialContext = createContext<MaterialContextProps | undefined>(
  undefined
);

export const MaterialProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const fetchUrl =
    "/inventory/submission/delivery-management/retur-sales/retur-sales-material/retur-sales";
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
      const materials = response.data;
      console.log({ getMaterials: materials });
      setData(materials.data.retur_sales_materials);
      setTotalData(materials.data.total_page * pagination.pageSize);
      console.log("materials", materials.data.retur_sales_materials);
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
    <MaterialContext.Provider
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
    </MaterialContext.Provider>
  );
};

export const useMaterial = () => {
  const context = useContext(MaterialContext);
  if (!context) {
    throw new Error("useMaterial must be used within a MaterialProvider");
  }
  return context;
};
