import React, { createContext, useContext, useState } from "react";
import { KTCard } from "@metronic/helpers";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ModuleTable } from "../organisms/table/ModuleTable";
import { StockLedgerProvider } from "../../core/useContext";

const TableLayout = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <StockLedgerProvider>
      <div>
        <KTCard>
          <TableListHeader />
          <ModuleTable />
        </KTCard>
      </div>
      </StockLedgerProvider>
  );
};

export default TableLayout;
