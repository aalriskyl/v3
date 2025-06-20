import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllDetailLedger } from "./_request";
import { useParams } from "react-router-dom";

interface DetailLedgerContextProps {
  data: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  status: string;
  setStatus: (term: string) => void;
  totalData: number;
  isLoading: boolean;
  error: string | null;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  createdDate: string;
  setCreatedDate: (date: string) => void;
  createdDateTo: string;
  setCreatedDateTo: (date: string) => void;
}

const DetailLedgerContext = createContext<DetailLedgerContextProps | undefined>(
  undefined
);

export const DetailLedgerProvider: React.FC<{ children: React.ReactNode }> = ({
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
  const [createdDate, setCreatedDate] = useState("");
  const [createdDateTo, setCreatedDateTo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllDetailLedger(
          id,
          searchTerm,
          status,
          pagination.pageIndex + 1,
          pagination.pageSize,
          createdDate,
          createdDateTo
        );
        if (response.data) {
          setData(response.data.coa_transactions || []);
          setTotalData(response.data.total_page * pagination.pageSize);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    id,
    searchTerm,
    status,
    pagination.pageIndex,
    pagination.pageSize,
    createdDate,
    createdDateTo,
  ]);

  return (
    <DetailLedgerContext.Provider
      value={{
        searchTerm,
        status,
        setStatus,
        data,
        isLoading,
        createdDate,
        setCreatedDate,
        createdDateTo,
        setCreatedDateTo,
        error,
        setSearchTerm,
        totalData,
        pagination,
        setPagination,
      }}
    >
      {children}
    </DetailLedgerContext.Provider>
  );
};

export const useDetailLedgers = () => {
  const context = useContext(DetailLedgerContext);
  if (!context) {
    throw new Error(
      "useDetailLedgers must be used within a DetailLedgerProvider"
    );
  }
  return context;
};
