import { useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { gudangColumns } from "./columns/_columns";
import { Gudang } from "../../molecules/core/_models";
import { KTCardBody } from "@metronic/helpers";
import { useGudang } from "../../template/GudangTableLayout";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";

const GudangTable: React.FC = () => {
  const { gudang, isLoading, totalData, setPagination, pagination } =
    useGudang(); // Use context to get gudang and loading state
  const columns = useMemo(() => gudangColumns, []);
  const table = useReactTable({
    data: gudang,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
  });

  console.log({ totalData });

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
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {table.getRowModel().rows.length > 0 ? (
              table
                .getRowModel()
                .rows.map((row: Row<Gudang>) => (
                  <CustomRow key={row.id} row={row} />
                ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    {isLoading ? "Loading..." : "No matching records found"}
                  </div>
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
        onPageChange={(page) =>
          setPagination({ ...pagination, pageIndex: page })
        }
      />
    </KTCardBody>
  );
};

export { GudangTable };
