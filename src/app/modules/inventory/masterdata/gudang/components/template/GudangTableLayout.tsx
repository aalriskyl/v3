import { KTCard } from "@metronic/helpers";
import { GudangTable } from "../organism/table/GudangTable";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Gudang } from "../molecules/core/_models";
import { getAllGudang } from "../core/_request";

interface GudangContextProps {
  gudang: Gudang[];
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

const GudangContext = createContext<GudangContextProps | undefined>(undefined);

export const useGudang = () => {
  const context = useContext(GudangContext);
  if (!context) {
    throw new Error("useGudang must be used within a GudangProvider");
  }
  return context;
};

const GudangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gudang, setGudang] = useState<Gudang[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateCreated, setDate] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });

  useEffect(() => {
    const fetchGudang = async () => {
      setIsLoading(true); // Set loading state before fetching
      try {
        const response = await getAllGudang(
          searchTerm,
          pagination.pageIndex,
          pagination.pageSize,
          dateCreated
        );
        console.log({ getAll: response.data });
        setGudang(response.data.warehouses || []);
        setTotalData(response.data.total_page * pagination.pageSize);
      } catch (error) {
        console.error(error);
        setGudang([]); // Clear the gudang state on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchGudang();
  }, [pagination.pageIndex, pagination.pageSize, searchTerm, dateCreated]);

  return (
    <GudangContext.Provider
      value={{
        gudang,
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
    </GudangContext.Provider>
  );
};

const GudangTableLayout: React.FC = () => {
  return (
    <GudangProvider>
      <div>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Gudang"
            style={{ top: "-4.5rem" }}
          />
          <TableListHeader />
          <GudangTable />
        </KTCard>
      </div>
    </GudangProvider>
  );
};

export default GudangTableLayout;
