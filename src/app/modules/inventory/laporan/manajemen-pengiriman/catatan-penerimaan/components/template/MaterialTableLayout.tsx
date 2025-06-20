import { KTCard } from "@metronic/helpers";
import { TableListMaterialHeader } from "../molecules/header/TableListHeader";
import { MaterialTable } from "../organisms/table/MaterialTable";
import {
  MaterialProvider,
  useMaterial,
} from "../molecules/core/MaterialContext";
import { useEffect } from "react";

const MaterialTableLayout = ({ type }: { type: string }) => {
  return (
    <MaterialProvider>
      <SetStatusComponent status={status || ""} />
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-6">Material</h2>
        <KTCard>
          <TableListMaterialHeader />
          {/* Teruskan prop type ke MaterialTable */}
          <MaterialTable type={type} />
        </KTCard>
      </div>
    </MaterialProvider>
  );
};

export default MaterialTableLayout;

const SetStatusComponent = ({ status }: { status: string }) => {
  const { setStatus } = useMaterial();
  useEffect(() => {
    if (status) setStatus(status);
  }, [status]);
  return <></>;
};
