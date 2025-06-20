import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from "../molecules/header/LayananSectionListHeader";
import { LayananDetailTableSection } from "./section/LayananDetailSection";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { LayananProvider, useLayanan } from "../molecules/core/LayananContext";
import { LayananDetailSectionListHeader } from "../molecules/header/LayananDetailSectionListHeader";

const LayananDetailSectionLayout = ({
  status,
  sales_order_id,
}: {
  status: string | undefined;
  sales_order_id?: string;
}) => {
  return (
    <LayananProvider sales_order_id={sales_order_id}>
      <SetStatusComponent status={status || ""} />
      <div>
        <KTCard>
          <LayananDetailSectionListHeader />
          <LayananDetailTableSection />
        </KTCard>
      </div>
    </LayananProvider>
  );
};

export default LayananDetailSectionLayout;

const SetStatusComponent = ({ status }: { status: string }) => {
  const { setStatus } = useLayanan();
  useEffect(() => {
    if (status) setStatus(status);
  }, [status]);
  return <></>;
};
