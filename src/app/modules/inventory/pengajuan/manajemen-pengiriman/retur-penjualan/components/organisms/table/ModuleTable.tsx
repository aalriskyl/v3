import { useEffect, useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { KTCardBody } from "@metronic/helpers";
import { usersColumns } from "./columns/_columns";
import { dummyUsers } from "./dummyUsers";
import { CatatanPengirimanModel } from "../../molecules/core/_models";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { getAllPengiriman } from "../../../core/_request";
import { ListView } from "../../../core/_models";
import axiosInstance from "../../../../../../../../../service/axiosInstance";
import { useHelper } from "../../molecules/core/HelperContext";

const ModuleTable: React.FC = () => {
  const { data, isLoading, pagination, totalData, setPagination, status } =
    useHelper();

  const columns = useMemo(() => usersColumns, []);

  // Initialize table instance
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: {
      pagination,
    },
  });

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
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              table
                .getRowModel()
                .rows.map((row: Row<any>) => (
                  <CustomRow key={row.id} row={row} />
                ))
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

export { ModuleTable };
