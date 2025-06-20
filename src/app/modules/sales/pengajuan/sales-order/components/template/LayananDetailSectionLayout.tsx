import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from "../molecules/header/LayananSectionListHeader";
import { LayananDetailTableSection } from "./section/LayananDetailSection";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../../service/axiosInstance";

const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const LayananDetailSectionLayout = ({
  status,
  isPreOrder,
}: {
  status: string | undefined;
  isPreOrder: boolean;
}) => {
  const params = useParams();
  const [serviceChoice, setServiceChoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getService = async () => {
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/sales-order-service/sales-order/${params.id}`,
        {
          params: {
            search: searchTerm,
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      console.log({ service: response });
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setServiceChoice(response.data.data.sales_order_services);
    } catch (error) {}
  };

  useEffect(() => {
    getService();
  }, [pagination.pageIndex, pagination.pageSize, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term
  };

  const Context = {
    serviceData: serviceChoice,
    setServiceData: setServiceChoice,
    refreshService: getService,
    status: status || "",
    isPreOrder,
    setPagination,
    pagination,
    totalData,
    searchTerm,
    handleSearch
  };

  return (
    <ServiceSalesOrderProvider.Provider value={Context}>
      <div>
        <KTCard>
          <LayananSectionListHeader />
          <LayananDetailTableSection
            serviceChoice={serviceChoice}
            setServiceChoice={setServiceChoice}
            refresh={getService}
            status={status}
          />
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
  isPreOrder: boolean;
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
  handleSearch: (term: string) => void;
  searchTerm: string;

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
