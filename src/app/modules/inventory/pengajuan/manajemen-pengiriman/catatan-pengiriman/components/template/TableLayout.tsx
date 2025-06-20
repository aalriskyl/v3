import React, { useState } from "react";
import { KTCard } from "@metronic/helpers";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ModuleTable } from "../organisms/table/ModuleTable";
import { HelperProvider } from "../molecules/core/HelperContext";

const TableLayout = () => {
  return (
    <HelperProvider>
      <div>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Catatan Pengiriman"
            style={{ top: "-5.5rem" }}
          />
          <TableListHeader />
          <ModuleTable />
        </KTCard>
      </div>
    </HelperProvider>
  );
};

export default TableLayout;
