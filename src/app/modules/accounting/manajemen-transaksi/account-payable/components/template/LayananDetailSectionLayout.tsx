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
  preOrderId,
}: {
  status: string | undefined;
  preOrderId?: string;
}) => {
  const [serviceChoice, setServiceChoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getService = async () => {
    try {
      if (!preOrderId) return;
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-service/purchase-order/${preOrderId}?search=${searchTerm}`,
        {
          params: {
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      console.log({ service: response.data.data.purchase_order_services });
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setServiceChoice(response.data.data.purchase_order_services);
    } catch (error) {}
  };

  useEffect(() => {
    getService();
  }, [pagination.pageIndex, pagination.pageSize, preOrderId, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term
  };

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
    <ServiceAccountPayableProvider.Provider value={Context}>
      <div>
        <KTCard>
          <LayananSectionListHeader onSearch={handleSearch} />
          <LayananDetailTableSection
            serviceChoice={serviceChoice}
            setServiceChoice={setServiceChoice}
            refresh={getService}
            status={status}
          />
        </KTCard>
      </div>
    </ServiceAccountPayableProvider.Provider>
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

const ServiceAccountPayableProvider = createContext<ContextProps | null>(null);

export const useServicePayableProvider = () => {
  const context = useContext(ServiceAccountPayableProvider);
  if (!context) {
    throw new Error(
      "useServicePayableProvider must be wrapped in ServiceAccountPayableProvider"
    );
  }
  return context;
};
