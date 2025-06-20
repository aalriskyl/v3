// TableLayout.tsx (Context Provider)
import React, { createContext, useContext, useState, useEffect } from "react";
import { KTCard } from "@metronic/helpers";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ModuleTable } from "../organisms/table/ModuleTable";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { getAllWarehouse } from "../../core/_request";

interface TableLayoutStockBalanceType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  data: any[];
  isLoading: boolean;
  totalData: number;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  warehouseOptions: { id: string; name: string }[];
  selectedWarehouse: string;
  setSelectedWarehouse: React.Dispatch<React.SetStateAction<string>>;
}

const TableLayoutStockBalanceContext =
  createContext<TableLayoutStockBalanceType | null>(null);

const TableLayout = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const [warehouseOptions, setWarehouseOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");

  // Fetch warehouse options
  useEffect(() => {
    getAllWarehouse().then((data: any) => {
      setWarehouseOptions(data);
    });
  }, []);

  // Fetch data when dependencies change
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedWarehouse) {
        setData([]);
        setTotalData(0);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/inventory/submission/stock-management/stock-history/stock-balance?warehouse_id=${selectedWarehouse}&company_id=${localStorage.getItem(
            "company_id"
          )}`,
          {
            params: {
              page: pagination.pageIndex,
              size: pagination.pageSize,
              search: searchTerm, // Added search term to API params
            },
          }
        );

        setTotalData(response.data.data.total_page * pagination.pageSize);
        setData(response.data.data.stock_histories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    selectedWarehouse,
    searchTerm,
  ]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const contextValue = {
    searchTerm,
    setSearchTerm,
    data,
    isLoading,
    totalData,
    pagination,
    setPagination,
    warehouseOptions,
    selectedWarehouse,
    setSelectedWarehouse,
  };

  return (
    <TableLayoutStockBalanceContext.Provider value={contextValue}>
      <div>
        <KTCard>
          <TableListHeader onSearch={handleSearch} />
          <ModuleTable searchTerm={searchTerm} />
        </KTCard>
      </div>
    </TableLayoutStockBalanceContext.Provider>
  );
};

export default TableLayout;

export const useTableLayoutStockBalance = () => {
  const context = useContext(TableLayoutStockBalanceContext);
  if (!context) {
    throw new Error(
      "useTableLayoutStockBalance must be used within a TableLayoutStockBalanceContext"
    );
  }
  return context;
};
