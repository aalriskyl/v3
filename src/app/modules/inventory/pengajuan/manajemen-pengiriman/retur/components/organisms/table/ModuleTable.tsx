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
import { Model } from "../../../core/_models";

interface UsersTableProps {
  searchTerm: string;
}

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const dummyData = Array.from({ length: 8 }).map((_, index) => {
  return {
    id: (index + 1).toString(),
    no_retur: "Retur" + (index + 11),
    jenis_retur: index % 2 === 0 ? "Penjualan" : "Pembelian",
    opsi: index % 2 === 0 ? "Barang" : "Chart of Account",
    tanggal_retur: "2025-02-02",
    status: index % 2 === 0 ? "Draft" : "Approved",
  };
});

const ModuleTable: React.FC<UsersTableProps> = ({ searchTerm }) => {
  // const data = useMemo(() => dummyUsers, []);
  const [data, setData] = useState<Model[]>(dummyData);
  const [isLoadData, setIsLoadData] = useState(false);
  const [pagination, setPagination] = useState(defaultPagination);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    getAllPengiriman(setTotalData, pagination.pageIndex, pagination.pageSize)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setIsLoadData(false);
      });
  }, [pagination.pageIndex, pagination.pageSize]);
  console.log(totalData, data);

  // Define columns
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
    onPaginationChange: setPagination,
  });

  // Handle page size change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

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
            {isLoadData ? (
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
        total={totalData} // Total data after filtering
        currentPage={pagination.pageIndex}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
};

export { ModuleTable };
