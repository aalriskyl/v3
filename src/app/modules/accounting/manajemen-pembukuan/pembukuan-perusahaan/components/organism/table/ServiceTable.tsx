import { useEffect, useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { ServiceHeaderColumn } from "./columns/ServiceHeaderColumn";
import { ServiceRow } from "./columns/ServiceRow";
import { coaColumns } from "./columns/_servicecolumns";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { ListDataType } from "../../core/_models";

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

const ServiceTable: React.FC = () => {
  const [data, setData] = useState<ListDataType[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    axiosInstance
      .get(
        `/accounting/master-data/top?company_id=${localStorage.getItem(
          "company_id"
        )}&page=${pagination.pageIndex}&size=${pagination.pageSize}`
      )
      .then((res) => {
        console.log({ res });
        setData(res.data.data.term_of_payments);
        setTotalData(res.data.data.total_page * pagination.pageSize);
      });
  }, [pagination.pageIndex, pagination.pageSize]);

  const columns = useMemo(() => coaColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
              table.getRowModel().rows.map((row: Row<ListDataType>) => {
                return <ServiceRow key={row.id} row={row} />;
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
        currentPage={pagination.pageIndex + 1} // Adjust for display
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
};

export { ServiceTable };
