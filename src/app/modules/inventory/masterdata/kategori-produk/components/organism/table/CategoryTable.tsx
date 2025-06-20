import React, { useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useCategory } from '../../template/CategoryTableLayout';
import { Category } from '../../molecules/core/_models';

const CategoryTable: React.FC = () => {
  const {
    category,
    isLoading,
    totalData,
    pagination,
    setPagination,
    error
  } = useCategory();
  const columns = useMemo(() => usersColumns, []);
  const table = useReactTable({
    data: category,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
  });
  if (isLoading) {
    return (
      <div className='d-flex text-center w-100 align-content-center justify-content-center'>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className='d-flex text-center w-100 align-content-center justify-content-center'>
        {error}
      </div>
    );
  }

  return (
    <KTCardBody className="py-4 max-w-20">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
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
                table.getRowModel().rows.map((row: Row<Category>) => (
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
      )}
      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex + 1} // Adjust for display
        pageSize={pagination.pageSize}
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
      />
    </KTCardBody>
  );
};

export { CategoryTable };