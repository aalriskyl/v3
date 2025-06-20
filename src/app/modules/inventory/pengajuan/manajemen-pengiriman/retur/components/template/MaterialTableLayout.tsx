import { KTCard } from "@metronic/helpers";
import { TableListMaterialHeader } from "../molecules/header/TableListHeader";
import { MaterialTable } from "../organisms/table/MaterialTable";
import { SetStateAction } from "react";
import { MaterialManajemenPengeriman } from "./RefactoredForm";

const MaterialTableLayout = ({
  setMaterial,
  material,
}: {
  setMaterial: React.Dispatch<SetStateAction<MaterialManajemenPengeriman[]>>;
  material: MaterialManajemenPengeriman[];
}) => {
  return (
    <div className="card p-5 w-100 mb-4">
      <h2 className="mb-6">Material</h2>
      <KTCard>
        <TableListMaterialHeader />
        <MaterialTable setMaterial={setMaterial} material={material} />
      </KTCard>
    </div>
  );
};

export default MaterialTableLayout;
