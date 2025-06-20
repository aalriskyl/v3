import { useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { MaterialHeaderColumn } from './columns/MaterialHeaderColumn';
import { MaterialRow } from './columns/MaterialRow';
import { materialColumns } from './columns/_materialcolumns';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useMaterials } from '../../template/ParentMaterialsTableLayout';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const MaterialTable: React.FC = () => {
  const { materialsData, totalData, isLoading, error, pagination, setPagination } = useMaterials();
  const columns = useMemo(() => materialColumns, []);

  const table = useReactTable({
    data: materialsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
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
          id='kt_table_materials'
          className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
        >
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                {columnGroup.headers.map((header) => (
                  <MaterialHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <MaterialRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
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
    </KTCardBody>
  );
};

export default MaterialTable;
