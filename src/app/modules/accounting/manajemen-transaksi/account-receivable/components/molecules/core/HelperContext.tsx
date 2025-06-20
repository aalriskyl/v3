// HelperContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../../service/axiosInstance";

interface HelperContextProps {
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
  submittedDate: string;
  setSubmittedDate: (date: string) => void;
  submittedDateTo: string;
  setSubmittedDateTo: (date: string) => void;
  approvedDate: string;
  setApprovedDate: (date: string) => void;
  approvedDateTo: string;
  setApprovedDateTo: (date: string) => void;
  quotationData: any; // New state for quotation data
  setQuotationData: (data: any) => void; // Setter for quotation data
}

const HelperContext = createContext<HelperContextProps | undefined>(undefined);

export const HelperProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fetchUrl = "/accounting/management-transaction/account-receivable/";
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [submittedDateTo, setSubmittedDateTo] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [approvedDateTo, setApprovedDateTo] = useState("");
  const [quotationData, setQuotationData] = useState<any>(null); // Initialize quotationData

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(fetchUrl, {
        params: {
          page: pagination.pageIndex,
          size: pagination.pageSize,
          search: searchTerm,
          status: status,
          submitted_from: submittedDate,
          submitted_to: submittedDateTo,
          approved_from: approvedDate,
          approved_to: approvedDateTo,
        },
      });
      const responseData = response?.data?.data;
      console.log({ getAll: responseData });
      if (responseData) {
        setData(responseData.account_payables || []);
        setTotalData(responseData.total_page * pagination.pageSize);

        // Check if quotation.id is not null and set quotationData
        if (response.data.quotation && response.data.quotation.id !== null) {
          setQuotationData(response.data.quotation);
        } else {
          setQuotationData(null); // Reset if no valid quotation
        }
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

  useEffect(() => {
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

  console.log({ data });

  return (
    <HelperContext.Provider
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
        quotationData, // Provide quotationData
        setQuotationData, // Provide setter for quotationData
      }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export const useHelper = () => {
  const context = useContext(HelperContext);
  if (!context) {
    throw new Error("useHelper must be used within a HelperProvider");
  }
  return context;
};
