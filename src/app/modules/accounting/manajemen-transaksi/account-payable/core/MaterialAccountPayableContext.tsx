import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../service/axiosInstance";

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
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  fetchData: () => Promise<void>;
}

const MaterialContext = createContext<MaterialContextProps | undefined>(
  undefined
);

export const MaterialProviderAp: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id }) => {
  const fetchUrl =
    "/procurement/submission/purchase-order/purchase-order-material/purchase-order";
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
        `${fetchUrl}/${id}?search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex + 1, // Add page parameter
            size: pagination.pageSize, // Add size parameter
          },
        }
      );
      const materials = response.data;
      console.log({ getMaterials: materials });
      setData(materials.data.purchase_order_materials);
      setTotalData(materials.data.total_page * pagination.pageSize);
      // console.log("materials", materials.data.sales_order_materials);
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

export const useMaterialAp = () => {
  const context = useContext(MaterialContext);
  console.log('Context value:', context); // Should show your context values
  if (!context) {
    throw new Error("useMaterial must be used within a MaterialProvider");
  }
  return context;
};
