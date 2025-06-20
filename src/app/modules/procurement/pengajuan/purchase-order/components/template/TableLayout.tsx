import React from "react";
import { KTCard } from "@metronic/helpers";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ModuleTable } from "../organisms/table/ModuleTable";
import { PurchaseOrderProvider } from "../molecules/core/PurchaseOrderContext";

const TableLayout: React.FC<{}> = () => {
  return (
    <PurchaseOrderProvider>
      <div>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Purchase Request"
            style={{ top: "-5.5rem" }}
          />

          <TableListHeader />
          <ModuleTable />
        </KTCard>
      </div>
    </PurchaseOrderProvider>
  );
};

export default TableLayout;
