import { KTCard } from "@metronic/helpers";
import { TableListSupplierHeader } from "../molecules/header/TableListHeader";
// import { SupplierTable } from '../organism/table/SupplierTable'
import { TermsTable } from "../organism/table/TermsTable";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { PaymentTermsType } from "../core/_models";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const SupplierTableLayout = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTermsType[]>([]);

  const fetchPaymentTerms = async () => {
    if (!id) return;
    setIsLoading(true); // Set loading to true before fetching
    try {
      const res = await axiosInstance.get(
        `/accounting/master-data/top/payment-terms/top/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      console.log({ fetchPaymentTerms: res.data.data });
      setPaymentTerms(res.data.data);
    } catch (error) {
      console.error("Error fetching payment terms:", error);
      // Optionally, you can set an error state here to show an error message
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPaymentTerms();
  }, []);

  const Context = {
    fetchPaymentTerms,
    paymentTerms,
    setPaymentTerms,
    isLoading, // Provide loading state to context
  };

  return (
    <PaymentTermsProvider.Provider value={Context}>
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-2">Payment Terms</h2>
        <div className="text-danger d-flex align-items-center text-gray-500 mb-4">
          <span className="bi bi-exclamation-circle me-2 fs-normal"></span>
          Invoice Portion tidak boleh kurang atau lebih dari 100%
        </div>

        {isLoading ? ( // Show loading indicator while fetching
          <OverlayLoader />
        ) : (
          <>
            <TableListSupplierHeader />
            <TermsTable />
          </>
        )}
      </div>
    </PaymentTermsProvider.Provider>
  );
};

export default SupplierTableLayout;

export const PaymentTermsProvider = createContext<{
  fetchPaymentTerms: () => Promise<void>;
  paymentTerms: PaymentTermsType[];
  setPaymentTerms: React.Dispatch<React.SetStateAction<PaymentTermsType[]>>;
  isLoading: boolean; // Add loading state to context
} | null>(null);

export const usePaymentTerms = () => {
  const context = useContext(PaymentTermsProvider);
  if (!context) {
    throw new Error("usePaymentTerms must be in PaymentTermsProvider");
  }
  return context;
};