import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { KTCard } from "@metronic/helpers";
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { MaterialDetailTableSection } from "./section/MaterialDetailSection";
import { TermsOfPaymentSection } from "./section/TermsOfPaymentSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentTermsType } from "../../core/_models";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { TermsSectionListHeader } from "../molecules/header/TermsSectionListHeader";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const TermsOfPaymentLayout = () => {
  const params = useParams();
  const [isModal, setIsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<PaymentTermsType[]>([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();

  // Wrap getPaymentTerms in useCallback to memoize it
  const getPaymentTerms = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/accounting/management-transaction/account-payable/purchase-payment-terms/account-payable/${params.id}?search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      if(response.data.data.purchase_payment_terms.length === 0 && !searchTerm) {
        setIsModal(true);
      }
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setPaymentTerms(response.data.data.purchase_payment_terms);
    } catch (error) {
      console.error("Error fetching payment terms:", error);
    }
  }, [params.id, searchTerm, pagination.pageIndex, pagination.pageSize]);

  const handleCloseFailedModal = useCallback(() => {
    setIsModal(false);
    setTimeout(() => {
      navigate(`../edit/${params.id}`);
    }, 0); // Small delay to allow state update
  }, [navigate, params.id]);

  useEffect(() => {
    getPaymentTerms();
  }, [getPaymentTerms]);

  const Context = {
    paymentTerms,
    setPaymentTerms,
    refreshMaterial: getPaymentTerms, // Now this is memoized
    setPagination,
    pagination,
    totalData,
    searchTerm,
    setSearchTerm,
  };

  return (
    <PaymentTermsAccountPayableProvider.Provider value={Context}>
      <div>
        <TermsSectionListHeader />
        <TermsOfPaymentSection />
        {isModal && (
          <FailedModal
            closeModal={handleCloseFailedModal}
            message="Tambahkan Terms Of Payment terlebih dahulu"
          />
        )}
      </div>
    </PaymentTermsAccountPayableProvider.Provider>
  );
};

export default TermsOfPaymentLayout;

interface ContextProps {
  paymentTerms: PaymentTermsType[];
  setPaymentTerms: React.Dispatch<React.SetStateAction<PaymentTermsType[]>>;
  refreshMaterial: () => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
}

const PaymentTermsAccountPayableProvider = createContext<ContextProps | null>(null);

export const usePaymentTermsAccountPayable = () => {
  const context = useContext(PaymentTermsAccountPayableProvider);
  if (!context) {
    throw new Error(
      "usePaymentTermsAccountPayable must be wrapped in PaymentTermsAccountPayableProvider"
    );
  }
  return context;
};