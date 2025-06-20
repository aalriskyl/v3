import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { MaterialDetailTableSection } from "./section/MaterialDetailSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";

const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const MaterialDetailSectionLayout = ({
  status,
  isPreOrder,
}: {
  status: string | undefined;
  isPreOrder: boolean;
}) => {
  const params = useParams();
  const [materialChoice, setMaterialChoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getMaterial = async () => {
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/sales-order-material/sales-order/${params.id}`,
        {
          params: {
            search: searchTerm,
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      // console.log({ material: response });
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setMaterialChoice(response.data.data.sales_order_materials);
    } catch (error) {}
  };

  useEffect(() => {
    getMaterial();
  }, [pagination.pageIndex, pagination.pageSize, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term
  };

  const Context = {
    materialData: materialChoice,
    setMaterialData: setMaterialChoice,
    refreshMaterial: getMaterial,
    status: status || "",
    isPreOrder,
    setPagination,
    pagination,
    totalData,
    searchTerm,
    handleSearch
  };

  return (
    <MaterialSalesOrderProvider.Provider value={Context}>
      <div>
        <KTCard>
          <MaterialSectionListHeader />
          <MaterialDetailTableSection
            materialChoice={materialChoice}
            setMaterialChoice={setMaterialChoice}
          />
        </KTCard>
      </div>
    </MaterialSalesOrderProvider.Provider>
  );
};

export default MaterialDetailSectionLayout;

interface ContextProps {
  materialData: never[];
  setMaterialData: React.Dispatch<React.SetStateAction<never[]>>;
  refreshMaterial: () => Promise<void>;
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
const MaterialSalesOrderProvider = createContext<ContextProps | null>(null);

export const useMaterialSalesOrder = () => {
  const context = useContext(MaterialSalesOrderProvider);
  if (!context) {
    throw new Error(
      "useMaterialSalesOrder must be wrapped in MaterialSalesOrderProvider"
    );
  }
  return context;
};
