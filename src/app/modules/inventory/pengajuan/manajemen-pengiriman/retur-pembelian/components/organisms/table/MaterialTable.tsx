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
import { getAllMaterialByPengirimanId } from "../../../core/_request";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalBarcodeScan } from "../../molecules/modals/ModalBarcodeScan";
import { useMaterialProvider } from "../../template/MaterialTableLayout";
import { materialViewColumns } from "./columns/_materialviewcolumns";

const defaultPagination = {
  pageIndex: 0, // Halaman dimulai dari 0
  pageSize: 10, // Default ukuran halaman
};

const MaterialTable = () => {
  const {
    materialData,
    setMaterialData,
    totalData,
    pagination,
    setPagination,
  } = useMaterialProvider();

  const columns = useMemo(() => materialViewColumns, []);

  const table = useReactTable({
    data: materialData, // Gunakan data yang sudah dipaginasi
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

      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
};

export { MaterialTable };
