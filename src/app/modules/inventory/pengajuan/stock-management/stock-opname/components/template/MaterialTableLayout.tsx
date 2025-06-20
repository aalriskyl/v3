import { KTCard } from "@metronic/helpers";

import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TableListMaterialHeader } from "../molecules/header/TableListHeader";
import { MaterialTable } from "../organisms/table/MaterialTable";
import { getAllMaterialByOpnameId } from "../../core/_request";
import { useParams } from "react-router-dom";

const MaterialTableLayout = ({ status }: { status: string | undefined }) => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<any[]>([]);

  const fetchMaterialData = async () => {
    if (!id) return;
    getAllMaterialByOpnameId(id).then((data) => {
      setMaterial(data);
    });
  };
  useEffect(() => {
    fetchMaterialData();
  }, []);

  const Context = {
    material,
    setMaterial,
    refreshMaterial: fetchMaterialData,
    status: status || "",
  };
  return (
    <MaterialOpnameProvider.Provider value={Context}>
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-6">Material</h2>
        <KTCard>
          <TableListMaterialHeader />
          <MaterialTable />
        </KTCard>
      </div>
    </MaterialOpnameProvider.Provider>
  );
};

export default MaterialTableLayout;

interface ContextProps {
  material: any[];
  setMaterial: React.Dispatch<SetStateAction<any[]>>;
  refreshMaterial: () => Promise<void>;
  status: string;
}
const MaterialOpnameProvider = createContext<ContextProps | null>(null);

export const useMaterialOpname = () => {
  const context = useContext(MaterialOpnameProvider);
  if (!context) {
    throw new Error(
      "useMaterialOpname must be wrapped in MaterialOpnameProvider"
    );
  }
  return context;
};
