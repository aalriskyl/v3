import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { TermsOfPaymentSection } from "./section/TermsOfPaymentSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { PaymentTermsType } from "../../core/_models";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { InvoiceSection } from "./section/InvoiceSection";
import { InvoiceSectionListHeader } from "../molecules/header/InvoiceListHeader";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const InvoiceLayout = ({
  purchase_order_id,
}: {
  purchase_order_id?: string;
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<PaymentTermsType[]>([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoized search handler
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, pageIndex: 1 })); // Reset to first page on new search
  }, []);

  // Memoized data fetcher
  const getData = useCallback(async () => {
    if (!purchase_order_id) return;
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-invoice/`, 
        {
          params: {
            status: "Approved",
            purchase_order_id: purchase_order_id,
            search: searchTerm, // Added search term to API params
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      
      console.log({
        getInvoice: response.data.data.purchase_invoices,
      });
      
      setPaymentTerms(response.data.data.purchase_invoices || []);
      setTotalData(response.data.data.total_page * pagination.pageSize);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  }, [purchase_order_id, searchTerm, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleModalButtonClick = useCallback(() => {
    // Add your modal button click logic here
  }, []);

  const Context = {
    paymentTerms,
    setPaymentTerms,
    refreshMaterial: getData,
    setPagination,
    pagination,
    totalData,
    searchTerm,
    setSearchTerm,
    loading,
  };

  return (
    <InvoiceProvider.Provider value={Context}>
      <div>
        <InvoiceSectionListHeader />
        <InvoiceSection />
      </div>
    </InvoiceProvider.Provider>
  );
};

export default InvoiceLayout;

interface ContextProps {
  paymentTerms: PaymentTermsType[];
  setPaymentTerms: React.Dispatch<React.SetStateAction<PaymentTermsType[]>>;
  refreshMaterial: () => Promise<void>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  totalData: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

const InvoiceProvider = createContext<ContextProps | null>(null);

export const useInvoice = () => {
  const context = useContext(InvoiceProvider);
  if (!context) {
    throw new Error("useInvoice must be wrapped in InvoiceProvider");
  }
  return context;
};