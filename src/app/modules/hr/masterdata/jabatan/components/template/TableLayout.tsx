import { KTCard } from "@metronic/helpers";
import { Table } from "../organism/table/Table";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { HelperProvider } from "../molecules/core/HelperContext";

const TableLayout = () => {
  return (
    <HelperProvider>
      <div style={{ maxWidth: "1050px" }}>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Jabatan"
            style={{ top: "-4.5rem" }}
          />
          <TableListHeader />
          <Table />
        </KTCard>
      </div>
    </HelperProvider>
  );
};

export default TableLayout;
