// ModuleTable.tsx
import React from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import { KTCardBody } from "@metronic/helpers";
import { entryColumns } from "./columns/_columns";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import clsx from "clsx";
import { useTableLayoutStockBalance } from "../../template/TableLayout";

const ModuleTable: React.FC<{ searchTerm: string }> = () => {
  const {
    data,
    isLoading,
    totalData,
    pagination,
    setPagination,
    warehouseOptions,
    selectedWarehouse,
    setSelectedWarehouse,
  } = useTableLayoutStockBalance();

  const columns = React.useMemo(() => entryColumns, []);

  const table = useReactTable({
    data,
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
    <KTCardBody className="py-4">
      <select
        name="warehouse"
        value={selectedWarehouse || ""}
        className={clsx("form-select mb-8")}
        onChange={(e) => setSelectedWarehouse(e.target.value)}
      >
        <option value="">Pilih Gudang</option>
        {warehouseOptions.map((item, index) => (
          <option value={item.id} key={index}>
            {item.name}
          </option>
        ))}
      </select>

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
            {!selectedWarehouse ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Silahkan pilih gudang untuk menampilkan data.
                </td>
              </tr>
            ) : isLoading ? (
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
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
};

export { ModuleTable };
