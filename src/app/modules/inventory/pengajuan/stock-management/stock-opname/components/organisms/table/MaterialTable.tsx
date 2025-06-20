import {
  useState,
  useMemo,
  SetStateAction,
  useEffect,
  createContext,
  useContext,
} from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { useParams } from "react-router-dom";
import { getAllMaterialByOpnameId } from "../../../core/_request";
import { materialColumns } from "./columns/_materialcolumns";
import { MaterialHeaderColumn } from "./columns/MaterialHeaderColumn";
import { MaterialRow } from "./columns/MaterialRow";
import { useMaterialOpname } from "../../template/MaterialTableLayout";
import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";

const defaultPagination = {
  pageIndex: 0, // Halaman dimulai dari 0
  pageSize: 10, // Default ukuran halaman
};

const MaterialTable = () => {
  // Inisialisasi materialData dengan dummyMaterials
  const { material, status } = useMaterialOpname();
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState(defaultPagination);

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handler untuk perubahan ukuran halaman
  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0, // Reset ke halaman pertama
    }));
  };

  return (
    <KTCardBody className="py-4 max-w-20">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer"
        >
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr key={columnGroup.id} className="text-start fw-bold fs-7 gs-0">
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

      {id && status === "Draft" && (
        <div
          className="position-absolute"
          style={{ top: "17px", right: "30px" }}
        >
          <button
            className="btn text-primary border border-primary mt-4"
            onClick={toggleModal}
          >
            Tambah Material
          </button>
        </div>
      )}

      {/* Pagination */}
      <ListPagination
        total={material.length} // Total data (tanpa filter)
        currentPage={pagination.pageIndex + 1} // Halaman saat ini (dimulai dari 1)
        pageSize={pagination.pageSize} // Ukuran halaman
        onPageChange={(page) =>
          setPagination({ ...pagination, pageIndex: page - 1 })
        }
      />
      {/* {id && status === "Draft" && (
        <AddMaterialModal
          opnameId={id}
          show={isModalVisible}
          toggleModal={toggleModal}
        />
      )} */}
    </KTCardBody>
  );
};

export { MaterialTable };
