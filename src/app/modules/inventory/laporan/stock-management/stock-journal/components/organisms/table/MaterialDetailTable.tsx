import { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MaterialHeaderColumn } from "./columns/MaterialHeaderColumn";
import { MaterialRow } from "./columns/MaterialRow";
import { materialColumns } from "./columns/_materialcolumns";
import { KTCardBody } from "@metronic/helpers";
import { MaterialModel } from "../../molecules/core/_models";
import { dummyMaterials } from "./dummyUsers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { useParams } from "react-router-dom";
import { getAllMaterialByPengirimanId } from "../../../../../../pengajuan/manajemen-pengiriman/catatan-pengiriman/core/_request";

const defaultPagination = {
  pageIndex: 0, // Halaman dimulai dari 0
  pageSize: 10, // Default ukuran halaman
};

const MaterialDetailTable: React.FC = () => {
  // Inisialisasi materialData dengan dummyMaterials
  const { id } = useParams<{ id: string }>();
  const [materialData, setMaterialData] =
    useState<MaterialModel[]>(dummyMaterials);
  const [pagination, setPagination] = useState(defaultPagination);

  const fetchMaterial = () => {
    if (id) {
      getAllMaterialByPengirimanId(id).then((data) => {
        setMaterialData(data);
      });
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  const columns = useMemo(() => materialColumns, []);

  // Data yang dipaginasi
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return materialData.slice(start, end); // Gunakan materialData sebagai sumber data
  }, [materialData, pagination.pageIndex, pagination.pageSize]);

  // Tabel dari react-table
  const table = useReactTable({
    data: paginatedData, // Gunakan data yang sudah dipaginasi
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

      {/* Pagination */}
      <ListPagination
        total={materialData.length} // Total data (tanpa filter)
        currentPage={pagination.pageIndex + 1} // Halaman saat ini (dimulai dari 1)
        pageSize={pagination.pageSize} // Ukuran halaman
        onPageChange={(page) =>
          setPagination({ ...pagination, pageIndex: page - 1 })
        }
      />
    </KTCardBody>
  );
};

export { MaterialDetailTable };
