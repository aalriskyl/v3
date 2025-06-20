import { KTCard } from "@metronic/helpers";
import LinkButton from "@metronic/layout/components/buttons/LinkButton";
import { TableListHeader } from "../molecules/header/TableListHeader";
import { ServiceTable } from "../organism/table/ServiceTable";
import { HelperProvider } from "../core/useContext";

const TableLayout = () => {
  return (
    <HelperProvider>
      <div>
        <KTCard>
          <LinkButton
            to="new"
            title="Tambah Term of Payment"
            style={{ top: "-4.5rem" }}
          />
          <TableListHeader />
          <ServiceTable />
        </KTCard>
      </div>
    </HelperProvider>
  );
};

export default TableLayout;
