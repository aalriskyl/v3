import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from "../molecules/header/LayananSectionListHeader";
import { LayananDetailTableSection } from "./section/LayananDetailSection";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../service/axiosInstance";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const LayananDetailSectionLayout = ({
  status,
  purchase_order_id,
}: {
  status: string | undefined;
  purchase_order_id?: string;
}) => {
  const [serviceChoice, setServiceChoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getService = async () => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-service/purchase-order/${purchase_order_id}`,
        {
          params: {
            page: pagination.pageIndex,
            size: pagination.pageSize,
            search: searchTerm,
          },
        }
      );
      console.log({ service: response });
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setServiceChoice(response.data.data.purchase_order_services);
    } catch (error) {}
  };

  useEffect(() => {
    getService();
  }, [pagination.pageIndex, pagination.pageSize, purchase_order_id, searchTerm]);


  const Context = {
    serviceData: serviceChoice,
    setServiceData: setServiceChoice,
    refreshService: getService,
    status: status || "",
    setPagination,
    pagination,
    totalData,
    searchTerm, 
    setSearchTerm,
  };

  return (
    <ServiceSalesOrderProvider.Provider value={Context}>
      <div>
        <KTCard>
          <LayananSectionListHeader  />
          <LayananDetailTableSection />
        </KTCard>
      </div>
    </ServiceSalesOrderProvider.Provider>
  );
};

export default LayananDetailSectionLayout;

interface ContextProps {
  serviceData: never[];
  setServiceData: React.Dispatch<React.SetStateAction<never[]>>;
  refreshService: () => Promise<void>;
  status: string;
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

const ServiceSalesOrderProvider = createContext<ContextProps | null>(null);

export const useServiceSalesOrder = () => {
  const context = useContext(ServiceSalesOrderProvider);
  if (!context) {
    throw new Error(
      "useServiceSalesOrder must be wrapped in ServiceSalesOrderProvider"
    );
  }
  return context;
};
