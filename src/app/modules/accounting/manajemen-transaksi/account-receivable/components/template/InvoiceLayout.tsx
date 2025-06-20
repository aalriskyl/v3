import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TermsOfPaymentSection } from "./section/TermsOfPaymentSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { PaymentTermsType } from "../../core/_models";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { InvoiceSection } from "./section/InvoiceSection";
import { InvoiceDetailSectionListHeader } from "../molecules/header/InvoiceDetailSectionListHeader";
import { InvoiceProvider } from "../molecules/core/InvoiceContext";

const InvoiceLayout = ({ sales_order_id }: { sales_order_id?: string }) => {
  return (
    <InvoiceProvider sales_order_id={sales_order_id}>
      <div>
        <InvoiceDetailSectionListHeader />
        <InvoiceSection />
      </div>
    </InvoiceProvider>
  );
};

export default InvoiceLayout;
