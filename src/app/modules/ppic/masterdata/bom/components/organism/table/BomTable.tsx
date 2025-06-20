import { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { BomHeaderColumn } from './columns/BomHeaderColumn';
import { BomRow } from './columns/BomRow';
import { bomColumns } from './columns/_bomcolumns';
import { KTCardBody } from '@metronic/helpers';
import { Bom } from '../../molecules/core/_models';

interface BomTableProps {
  data: Bom[];
}

const BomTable: React.FC<BomTableProps> = ({ data }) => {
  // Gunakan bomColumns langsung tanpa menambahkan kolom actions lagi
  const columns = useMemo(() => bomColumns, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                  <BomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Bom>) => (
                <BomRow key={row.id} row={row} />
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
      {/* <ListPagination /> */}
    </KTCardBody>
  );
};

export { BomTable };