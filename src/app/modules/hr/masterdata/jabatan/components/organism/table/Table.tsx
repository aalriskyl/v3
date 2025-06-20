import { useEffect, useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { jabatanColumns } from "./columns/_columns";
import { Jabatan } from "../../molecules/core/_models";
import { KTCardBody } from "@metronic/helpers";
import { dummyData } from "./dummyData";
import { ListView } from "../../../core/_models";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { useHelper } from "../../molecules/core/HelperContext";

const Table: React.FC = () => {
  const { data, isLoading, pagination, totalData, setPagination } = useHelper();

  const columns = useMemo(() => jabatanColumns, []);

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
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Loading....
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<ListView>) => {
                return <CustomRow key={row.id} row={row} />;
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
        currentPage={pagination.pageIndex}
        pageSize={pagination.pageSize}
        onPageChange={(page) =>
          setPagination({ ...pagination, pageIndex: page })
        }
      />
    </KTCardBody>
  );
};

export { Table };
