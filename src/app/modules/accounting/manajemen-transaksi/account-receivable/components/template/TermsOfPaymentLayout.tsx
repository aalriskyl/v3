import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { TermsOfPaymentSection } from "./section/TermsOfPaymentSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { PaymentTermsType } from "../../core/_models";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { PaymentTermsProvider } from "../molecules/core/PaymentTermsContext";
import { PaymentTermsSectionListHeader } from "../molecules/header/PaymentTermsSectionListHeader";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const TermsOfPaymentLayout = () => {
  return (
    <PaymentTermsProvider>
      <div>
        <PaymentTermsSectionListHeader />
        <TermsOfPaymentSection />
      </div>
    </PaymentTermsProvider>
  );
};

export default TermsOfPaymentLayout;
