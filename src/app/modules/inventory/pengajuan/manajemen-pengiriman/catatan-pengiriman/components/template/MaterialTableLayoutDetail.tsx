import { KTCard } from "@metronic/helpers";
import { TableListMaterialDetailHeader } from "../molecules/header/TableListHeader";
import { MaterialDetailTable } from "../organisms/table/MaterialDetailTable";
import { MaterialManajemenPengeriman } from "./RefactoredForm";
import { SetStateAction, useEffect } from "react";
import {
  MaterialProvider,
  useMaterial,
} from "../molecules/core/MaterialContext";

const MaterialTableLayoutDetail = ({ status }: { status: string }) => {
  return (
    <MaterialProvider>
      <SetStatusComponent status={status || ""} />
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-6">Material</h2>
        <KTCard>
          <TableListMaterialDetailHeader />

          <MaterialDetailTable />
        </KTCard>
      </div>
    </MaterialProvider>
  );
};

export default MaterialTableLayoutDetail;

const SetStatusComponent = ({ status }: { status: string }) => {
  const { setStatus } = useMaterial();
  useEffect(() => {
    if (status) setStatus(status);
  }, [status]);
  return <></>;
};
