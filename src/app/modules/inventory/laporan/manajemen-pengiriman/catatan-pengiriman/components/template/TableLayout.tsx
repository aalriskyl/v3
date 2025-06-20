import React, { useState } from "react";
import { KTCard } from "@metronic/helpers";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ModuleTable } from "../organisms/table/ModuleTable";
import { HelperProvider } from "../molecules/core/HelperContext";

const TableLayout = () => {
  return (
    <HelperProvider>
      <div>
        <KTCard>
          <TableListHeader />
          <ModuleTable />
        </KTCard>
      </div>
    </HelperProvider>
  );
};

export default TableLayout;
