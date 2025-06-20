import { useEffect, useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { KTCardBody } from "@metronic/helpers";
import { ListView } from "../../../core/_models";
import { viewColumns } from "./columns/_columns";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useFakturPembelian } from "../../core/useContextView";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

// Dummy data based on the ListView model

const ModuleTable: React.FC = () => {
  const { data, isLoading, pagination, totalData, setPagination, status } = useFakturPembelian()

  const columns = useMemo(() => viewColumns, []);

   const table = useReactTable({
     data: data,
     columns,
     getCoreRowModel: getCoreRowModel(),
     manualPagination: true,
     rowCount: totalData,
     state: { pagination },
   })

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-start text-muted fw-bold fs-7 gs-0"
              >
                {headerGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Loading....
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              table
                .getRowModel()
                .rows.map((row: Row<ListView>) => (
                  <CustomRow key={row.id} row={row} />
                ))
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
