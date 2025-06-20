import { KTCard } from "@metronic/helpers";
import { TableListMaterialHeader } from "../molecules/header/TableListHeader";
import { MaterialTable } from "../organisms/table/MaterialTable";
import { MaterialDetailTable } from "../organisms/table/MaterialDetailTable";

interface MaterialTableLayoutProps {
  type: string;
  purchaseOrderId: string;
  materialsData?: string;
  receivedNoteId: string | undefined;
  status: string;
}

const MaterialTableLayout = ({
  type,
  purchaseOrderId,
  receivedNoteId,
  status,
}: MaterialTableLayoutProps) => {
  return (
    <div className="card p-5 w-100 mb-4">
      <h2 className="mb-6">Material</h2>
      <KTCard>
        <TableListMaterialHeader />
        <MaterialDetailTable type={type} />
      </KTCard>
    </div>
  );
};

export default MaterialTableLayout;
