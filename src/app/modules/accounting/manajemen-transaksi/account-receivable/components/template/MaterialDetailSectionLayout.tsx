import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialDetailTableSection } from "./section/MaterialDetailSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";
import {
  MaterialProvider,
  useMaterial,
} from "../molecules/core/MaterialContext";
import { MaterialDetailSectionListHeader } from "../molecules/header/MaterialDetailSectionListHeader";
const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const MaterialDetailSectionLayout = ({
  status,
  sales_order_id,
}: {
  status: string | undefined;
  sales_order_id?: string;
}) => {
  return (
    <MaterialProvider sales_order_id={sales_order_id}>
      <SetStatusComponent status={status || ""} />
      <div>
        <KTCard>
          <MaterialDetailSectionListHeader />
          <MaterialDetailTableSection />
        </KTCard>
      </div>
    </MaterialProvider>
  );
};

export default MaterialDetailSectionLayout;

const SetStatusComponent = ({ status }: { status: string }) => {
  const { setStatus } = useMaterial();
  useEffect(() => {
    if (status) setStatus(status);
  }, [status]);
  return <></>;
};
