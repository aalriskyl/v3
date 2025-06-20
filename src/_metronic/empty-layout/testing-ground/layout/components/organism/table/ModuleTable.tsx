import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  Row,
  getCoreRowModel,
  getExpandedRowModel
} from "@tanstack/react-table";
import { ServiceHeaderColumn } from "./columns/ServiceHeaderColumn";
import { ServiceRow } from "./columns/ServiceRow";
import { moduleColumns } from "./columns/_moduleColumns";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { ListDataType } from "../../core/_model";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

// Data dummy sesuai contoh gambar
const dummyData: ListDataType[] = [
  {
    id: 1,
    no_account: "Pembayaran Pay-DP-1900225-6",
    tanggal: "14 Janvier 2024",
    totalDebit: "523.384.000,00",
    totalCredit: "523.384.000,00",
    subRows: [
      {
        id: "1-1", // ID unik
        no_account: "1111 - RCA",
        totalDebit: "170.384.000,00",
        totalCredit: "242.321.000,00"
      },
      {
        id: "1-2",
        no_account: "1111 - RCA",
        totalDebit: "242.321.000,00",
        totalCredit: "170.384.000,00"
      }
    ]
  }
];

const ModuleTable: React.FC = () => {
  const [data, setData] = useState<ListDataType[]>(dummyData);
  const [totalData, setTotalData] = useState(dummyData.length);
  const [pagination, setPagination] = useState(defaultPagination);

  const columns = useMemo(() => moduleColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows?.map((sub, index) => ({
      ...sub,
      id: `${row.id}-${index}` // Generate ID unik
    })),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
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
                  <ServiceHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<ListDataType>) => (
                <ServiceRow key={row.id} row={row} />
              ))
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
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
};

export { ModuleTable };