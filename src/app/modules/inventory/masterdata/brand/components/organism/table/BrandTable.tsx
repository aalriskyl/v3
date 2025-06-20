import { useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { Brand } from '../../molecules/core/_models';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { KTCardBody } from '@metronic/helpers';
import { useBrand } from '../../template/BrandTableLayout';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const BrandTable: React.FC = () => {
  const {
    brand,
    isLoading,
    totalData, 
    error, 
    pagination, 
    setPagination
  } = useBrand();

  const filteredData = useMemo(() => brand.filter((item) => item.status === true), [brand]);
  const columns = useMemo(() => usersColumns, []);
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: brand.length,
    state: { pagination },
  });

  if (isLoading) {
    return (
      <OverlayLoader />
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
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Brand>) => {
                return <CustomRow key={row.id} row={row} />;
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
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
      />
      {/* {isLoading && <UsersListLoading />} */}
    </KTCardBody>
  );
};

export { BrandTable };