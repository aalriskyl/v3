import React, { createContext, useContext, useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { MaterialDetailTableSection } from "./section/MaterialDetailSection";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";

interface MaterialDetail {
  id: string;
  // Add other material properties as needed
}

interface ContextProps {
  materialData: MaterialDetail[];
  setMaterialData: React.Dispatch<React.SetStateAction<MaterialDetail[]>>;
  refreshMaterial: () => Promise<void>;
  status: string;
  returPresent: string | undefined | null;
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

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const MaterialSalesOrderFakturProvider = createContext<ContextProps | null>(
  null
);

const MaterialDetailSectionLayout = ({
  status,
  sales_order_id,
  returPresent,
}: {
  status: string | undefined;
  returPresent: string | undefined | null;
  sales_order_id?: string;
}) => {
  const [materialChoice, setMaterialChoice] = useState<MaterialDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getMaterial = async () => {
    try {
      if (!sales_order_id && !returPresent) return;

      const endpoint = returPresent
        ? `/inventory/submission/delivery-management/retur-sales/retur-sales-material/retur-sales/${returPresent}`
        : `/sales/submission/sales-order/sales-order-material/sales-order/${sales_order_id}`;

      const response = await axiosInstance.get(endpoint, {
        params: {
          search: searchTerm,
          page: pagination.pageIndex,
          size: pagination.pageSize,
        },
      });

      console.log({ getMaterial: response.data.data });

      // Handle different response structures
      const materials = returPresent
        ? response.data.data.retur_sales_materials
        : response.data.data.sales_order_materials;

      setTotalData(response.data.data.total_page * pagination.pageSize);
      setMaterialChoice(materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterialChoice([]);
    }
  };

  useEffect(() => {
    getMaterial();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sales_order_id,
    searchTerm,
    returPresent,
  ]);

  const Context = {
    materialData: materialChoice,
    setMaterialData: setMaterialChoice,
    refreshMaterial: getMaterial,
    status: status || "",
    returPresent,
    setPagination,
    pagination,
    totalData,
    searchTerm,
    setSearchTerm,
  };

  return (
    <MaterialSalesOrderFakturProvider.Provider value={Context}>
      <div>
        <KTCard>
          <MaterialSectionListHeader />
          <MaterialDetailTableSection returPresent={returPresent} />
        </KTCard>
      </div>
    </MaterialSalesOrderFakturProvider.Provider>
  );
};

export default MaterialDetailSectionLayout;

export const useMaterialSalesOrderFaktur = () => {
  const context = useContext(MaterialSalesOrderFakturProvider);
  if (!context) {
    throw new Error(
      "useMaterialSalesOrderFaktur must be wrapped in MaterialSalesOrderFakturProvider"
    );
  }
  return context;
};
