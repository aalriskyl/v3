import { useEffect, useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { ModuleHeaderColumn } from "./columns/ModuleHeaderColumn";
import { ModuleRow } from "./columns/ModuleRow";
import { moduleColumns } from "./columns/_moduleColumns";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { ListDataType } from "../../core/_model";
import { useLedgers } from "../../core/useContext";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";



const ModuleTable: React.FC = () => {
  const { data, isLoading, pagination, totalData, setPagination } = useLedgers()
  const columns = useMemo(() => moduleColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
  });

  if(isLoading) {
    return <OverlayLoader />
  }

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
                  <ModuleHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<ListDataType>) => {
                return <ModuleRow key={row.id} row={row} />;
              })
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
      />
    </KTCardBody>
  );
};

export { ModuleTable };
