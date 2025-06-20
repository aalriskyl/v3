import { KTCard } from "@metronic/helpers";
import { TableListMaterialHeader } from "../molecules/header/TableListHeader";
import { MaterialTable } from "../organisms/table/MaterialTable";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../../../../../../../../service/axiosInstance";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const MaterialTableLayout = ({
  received_note_id,
}: {
  received_note_id: string;
}) => {
  const [materialData, setMaterialData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const getMaterial = async () => {
    try {
      if (!received_note_id) {
        setMaterialData([]);
        return;
      }
      const response = await axiosInstance.get(
        `/inventory/submission/delivery-management/received-note/received-note-material/received-note/${received_note_id}`,
        {
          params: {
            page: pagination.pageIndex,
            size: pagination.pageSize,
          },
        }
      );
      console.log({ getMaterial: response.data.data });
      setTotalData(response.data.data.total_page * pagination.pageSize);
      setMaterialData(response.data.data.received_note_materials);
    } catch (error) {}
  };

  useEffect(() => {
    getMaterial();
  }, [pagination.pageIndex, pagination.pageSize, received_note_id]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term
  };

  const Context = {
    materialData: materialData,
    setMaterialData: setMaterialData,
    refreshMaterial: getMaterial,
    status: status || "",
    setPagination,
    pagination,
    totalData,
  };
  return (
    <MaterialProvider.Provider value={Context}>
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-6">Material</h2>
        <KTCard>
          <TableListMaterialHeader />
          <MaterialTable />
        </KTCard>
      </div>
    </MaterialProvider.Provider>
  );
};

export default MaterialTableLayout;

interface ContextProps {
  materialData: never[];
  setMaterialData: React.Dispatch<React.SetStateAction<never[]>>;
  refreshMaterial: () => Promise<void>;
  status: string;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  totalData: number;
}
const MaterialProvider = createContext<ContextProps | null>(null);

export const useMaterialProvider = () => {
  const context = useContext(MaterialProvider);
  if (!context) {
    throw new Error("useMaterialProvider must be wrapped in MaterialProvider");
  }
  return context;
};
