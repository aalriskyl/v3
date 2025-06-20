import React, { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { Company } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useCompany } from '../../core/useContext';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';



const CustomerTable: React.FC = () => {
  const { data, totalData, isLoading, error, pagination, setPagination } = useCompany();

  const columns = useMemo(() => usersColumns, []);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
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
          <tbody className="text-gray-500">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex justify-content-center align-items-center">
                    Loading...
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Company>) => (
                <CustomRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
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
      {/* <ListPagination /> */}
      {/* {isLoading && <OverlayLoader />} */}
    </KTCardBody>
  );
};

export { CustomerTable };