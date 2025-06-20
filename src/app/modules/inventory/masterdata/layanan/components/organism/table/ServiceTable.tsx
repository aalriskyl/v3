import { useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { ServiceHeaderColumn } from './columns/ServiceHeaderColumn';
import { ServiceRow } from './columns/ServiceRow';
import { serviceColumns } from './columns/_servicecolumns';
import { Service } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useService } from '../../template/ServiceTableLayout';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const ServiceTable: React.FC = () => {
  const {
    serviceData, // Data from context
    isLoading, 
    error,
    pagination,
    totalData,
    setPagination  // Loading state from context
  } = useService(); // Use the context
  

  const columns = useMemo(() => serviceColumns, []);
  const table = useReactTable({
    data: serviceData, // Use data from context
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: serviceData.length,
    state: { pagination },
  });


   if (isLoading) {
      return (
        <OverlayLoader />
      );
    }

  return (
    <KTCardBody className='py-4 max-w-20'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
        >
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                {columnGroup.headers.map((header) => (
                  <ServiceHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Service>) => {
                return <ServiceRow key={row.id} row={row} />;
              })
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
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
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
      />
    </KTCardBody>
  );
};

export { ServiceTable };