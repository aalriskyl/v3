import { useMemo, useEffect, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { KTCardBody } from '@metronic/helpers';
import { Model } from '../../molecules/core/_models';
import { entryColumns } from './columns/_columns';
import { getAllEntryStock } from '../../../core/_request';
// import axiosInstance from '../../../core/_axios'; // Ensure you import axiosInstance correctly
import { AddStockModal } from '../../molecules/modals/AddStockModal';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useEntryStocks } from '../../../../../../pengajuan/stock-management/entry-stock/components/molecules/core/EntryStockContext';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const ModuleTable: React.FC = () => {
  const {
    data, // Data from context
    isLoading,
    error,
    pagination,
    totalData,
    setPagination  // Loading state from context
  } = useEntryStocks(); // Use the context


  const columns = useMemo(() => entryColumns, []);
  const table = useReactTable({
    data: data, // Use data from context
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data.length,
    state: { pagination },
  });


  if (isLoading) {
    return <OverlayLoader />; // Show loading state
  }

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive ">
        <table id="kt_table_users" className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
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
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-danger">
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row: Row<any>) => (
                <CustomRow key={row.id} row={row} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex + 1} // Adjust for display
        pageSize={pagination.pageSize}
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
      />
    </KTCardBody>
  );
};

export { ModuleTable };