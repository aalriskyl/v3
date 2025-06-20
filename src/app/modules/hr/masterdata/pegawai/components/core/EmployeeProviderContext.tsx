// EmployeeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPegawai } from "./_request";

interface EmployeeContextProps {
  data: any[];
  searchTerm: string;
  status: string;
  setStatus: (term: string) => void;
  setSearchTerm: (term: string) => void;
  totalData: number;
  isLoading: boolean;
  error: string | null;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  contractType: string;
  setContractType: (type: string) => void;
  positionId: string;
  setPositionId: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
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
  const [contractType, setContractType] = useState("");
  const [positionId, setPositionId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getPegawai(
          searchTerm,
          status,
          pagination.pageIndex + 1,
          pagination.pageSize,
          contractType,
          positionId
        );
        if (response.data) {
          setData(response.data.employees || []);
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
    status,
    contractType,
    positionId,
  ]);

  return (
    <EmployeeContext.Provider
      value={{
        searchTerm,
        status,
        setStatus,
        data,
        isLoading,
        error,
        setSearchTerm,
        totalData,
        pagination,
        setPagination,
        contractType,
        setContractType,
        positionId,
        setPositionId,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within a EmployeeProvider");
  }
  return context;
};
