import { KTCard } from "@metronic/helpers";
import { BrandTable } from "../organism/table/BrandTable";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { Brand } from "../molecules/core/_models";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getBrands } from "../../core/_request";

interface BrandContextProps {
  brand: Brand[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dateCreated: string;
  setDate: (date: string) => void;
  totalData: number;
  isLoading: boolean;
  error: string | null;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const BrandContext = createContext<BrandContextProps | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};

const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brand, setBrand] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateCreated, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getBrands(
          searchTerm, // Pass searchTerm as a string
          pagination.pageIndex + 1, // Pass page as a number
          pagination.pageSize, // Pass size as a number
          dateCreated // Pass dateCreated as a string
        );
        setBrand(response.data.brands || []);
        setTotalData(response.data.total_page * pagination.pageSize);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setBrand([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrand();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    searchTerm,
    dateCreated,
    category,
  ]);

  return (
    <BrandContext.Provider
      value={{
        brand,
        searchTerm,
        setSearchTerm,
        dateCreated,
        setDate,
        totalData,
        isLoading,
        error,
        pagination,
        setPagination,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

const BrandTableLayout = () => {
  return (
    <BrandProvider>
      <div>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Brand"
            style={{ top: "-5.5rem" }}
          />
          <TableListHeader />
          <BrandTable />
        </KTCard>
      </div>
    </BrandProvider>
  );
};

export default BrandTableLayout;
