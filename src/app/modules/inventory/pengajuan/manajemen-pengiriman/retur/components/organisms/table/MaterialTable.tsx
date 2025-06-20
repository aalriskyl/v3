import {
  useState,
  useMemo,
  SetStateAction,
  useEffect,
  createContext,
  useContext,
} from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MaterialHeaderColumn } from "./columns/MaterialHeaderColumn";
import { MaterialRow } from "./columns/MaterialRow";
import { materialColumns } from "./columns/_materialcolumns";
import { KTCardBody } from "@metronic/helpers";
import { MaterialModel } from "../../molecules/core/_models";
import { dummyMaterials } from "./dummyUsers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { MaterialManajemenPengeriman } from "../../template/RefactoredForm";
import { getAllMaterialByPengirimanId } from "../../../core/_request";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalBarcodeScan } from "../../molecules/modals/ModalBarcodeScan";

const defaultPagination = {
  pageIndex: 0, // Halaman dimulai dari 0
  pageSize: 10, // Default ukuran halaman
};

const MaterialTable = ({
  setMaterial,
  material,
}: {
  setMaterial: React.Dispatch<SetStateAction<MaterialManajemenPengeriman[]>>;
  material: MaterialManajemenPengeriman[];
}) => {
  // Inisialisasi materialData dengan dummyMaterials
  const { id } = useParams<{ id: string }>();
  const [pagination, setPagination] = useState(defaultPagination);
  const fetchMaterial = () => {
    if (id) {
      getAllMaterialByPengirimanId(id).then((data) => {
        setMaterial(data);
        console.log({ materials: data });
      });
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  console.log({ stateMaterial: material });

  const columns = useMemo(() => materialColumns, []);

  // Data yang dipaginasi
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return material.slice(start, end); // Gunakan material sebagai sumber data
  }, [material, pagination.pageIndex, pagination.pageSize]);

  // Tabel dari react-table
  const table = useReactTable({
    data: material, // Gunakan data yang sudah dipaginasi
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [showModal, setShowModal] = useState(false)
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  // Handler untuk perubahan ukuran halaman
  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0, // Reset ke halaman pertama
    }));
  };

  const Context = {
    fetchMaterial,
  };

  return (
    <ModuleTableProvider.Provider value={Context}>
      <KTCardBody className="py-4 max-w-20">
        <div className="table-responsive">
          <table
            id="kt_table_users"
            className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer"
          >
            <thead>
              {table.getHeaderGroups().map((columnGroup) => (
                <tr
                  key={columnGroup.id}
                  className="text-start fw-bold fs-7 gs-0"
                >
                  {columnGroup.headers.map((header) => (
                    <MaterialHeaderColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-600">
              {table.getRowModel().rows.length > 0 ? (
                table
                  .getRowModel()
                  .rows.map((row) => <MaterialRow key={row.id} row={row} />)
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    Belum ada data. Silahkan tambah data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <ListPagination
          total={material.length} // Total data (tanpa filter)
          currentPage={pagination.pageIndex + 1} // Halaman saat ini (dimulai dari 1)
          pageSize={pagination.pageSize} // Ukuran halaman
          onPageChange={(page) =>
            setPagination({ ...pagination, pageIndex: page - 1 })
          }
        />

        <div className="position-absolute" style={{ top: '17px', right: '30px' }}>
          <Button
            variant="primary"
            // className="btn text-primary  mt-4"
            onClick={toggleModal}
          // disabled={materialRequestData?.length === 0}
          >
            Tambah Jumlah Material 
          </Button>
        </div>

        <ModalBarcodeScan
          show={showModal}
          handleClose={toggleModal}
          datamaterial={material}
          setMaterial={setMaterial}
        />

      </KTCardBody>
    </ModuleTableProvider.Provider>
  );
};

export const ModuleTableProvider = createContext<{
  fetchMaterial: () => void;
} | null>(null);

const useModuleTableProvider = () => {
  const context = useContext(ModuleTableProvider);
  if (!context) {
    throw new Error("useModuleTableProvider must be in ModuleTableProvider");
  }
  return context;
};

export { MaterialTable, useModuleTableProvider };
