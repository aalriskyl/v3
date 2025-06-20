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
import { ModalBarcodeScan } from "../../molecules/modals/ModalBarcodeScan";
import { Button } from "react-bootstrap";

const defaultPagination = {
  pageIndex: 0, // Halaman dimulai dari 0
  pageSize: 10, // Default ukuran halaman
};

const MaterialDetailTable = ({
  setMaterial,
  material,
  status,
}: {
  setMaterial: React.Dispatch<SetStateAction<MaterialManajemenPengeriman[]>>;
  material: MaterialManajemenPengeriman[];
  status: string;
}) => {
  // Inisialisasi materialData dengan dummyMaterials
  const { id } = useParams<{ id: string }>();
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchMaterial = () => {
    if (id) {
      getAllMaterialByPengirimanId(
        id,
        setTotalData,
        pagination.pageIndex,
        pagination.pageSize
      ).then((data) => {
        setMaterial(data);
      });
    }
  };

  // useEffect(() => {
  //   fetchMaterial();
  // }, [pagination.pageIndex, pagination.pageSize]);

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
    manualPagination: true,
    rowCount: totalData,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const Context = {
    fetchMaterial,
    status,
  };

  return (
    <MaterialDeliveryNoteProvider.Provider value={Context}>
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

        <ListPagination
          total={totalData}
          currentPage={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
        />

        <ModalBarcodeScan
          show={showModal}
          handleClose={toggleModal}
          datamaterial={material}
          setMaterial={setMaterial}
        />
      </KTCardBody>
    </MaterialDeliveryNoteProvider.Provider>
  );
};

export const MaterialDeliveryNoteProvider = createContext<{
  fetchMaterial: () => void;
  status: string;
} | null>(null);

export const useMaterialDeliveryNote = () => {
  const context = useContext(MaterialDeliveryNoteProvider);
  if (!context) {
    throw new Error(
      "useMaterialDeliveryNote must be in MaterialDeliveryNoteProvider"
    );
  }
  return context;
};

export { MaterialDetailTable };
