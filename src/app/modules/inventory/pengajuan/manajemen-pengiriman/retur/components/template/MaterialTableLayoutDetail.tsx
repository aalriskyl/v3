import { KTCard } from "@metronic/helpers";
import { TableListMaterialDetailHeader } from "../molecules/header/TableListHeader";
import { MaterialDetailTable } from "../organisms/table/MaterialDetailTable";
import { MaterialManajemenPengeriman } from "./RefactoredForm";
import { SetStateAction } from "react";

const MaterialTableLayoutDetail = ({
  setMaterial,
  material,
  status,
}: {
  setMaterial: React.Dispatch<SetStateAction<MaterialManajemenPengeriman[]>>;
  material: MaterialManajemenPengeriman[];
  status: string;
}) => {
  return (
    <div className="card p-5 w-100 mb-4">
      <h2 className="mb-6">Material</h2>
      <KTCard>
        <TableListMaterialDetailHeader />

        <MaterialDetailTable
          setMaterial={setMaterial}
          material={material}
          status={status}
        />
      </KTCard>
    </div>
  );
};

export default MaterialTableLayoutDetail;
