import { useMemo, useEffect, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { KTCardBody } from '@metronic/helpers';
import { Model } from '../../molecules/core/_models';
import { entryColumns } from './columns/_columns';
import { useEntryStocks } from '../../molecules/core/EntryStockContext';
const ModuleTable: React.FC = () => {
  const { data, isLoading, pagination, totalData, setPagination, status } = useEntryStocks()

  const columns = useMemo(() => entryColumns(status), [status])

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
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  {isLoading ? 'Loading...' : 'No data available'}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row: Row<Model>) => (
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