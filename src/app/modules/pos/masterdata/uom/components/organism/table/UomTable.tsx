import { useMemo, useEffect, useState } from 'react'
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import { uomColumns } from './columns/_columns'
import { Uom } from '../../molecules/core/_models'
import { KTCardBody } from '@metronic/helpers'
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination'
import { getUom } from '../../core/_request'

interface UomTableProps {
  searchTerm: string;
}

const UomTable: React.FC<UomTableProps> = ({ searchTerm }) => {
  const [uom, setUom] = useState<Uom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the UOM data
  useEffect(() => {
    const fetchUom = async () => {
      try {
        const data = await getUom();
        setUom(data.uoms || []);
      } catch (error) {
        console.error("Failed to fetch Uom:", error);
        setUom([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUom();
  }, []);

  const columns = useMemo(() => uomColumns, [])
  const table = useReactTable({
    data: uom,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
              table.getRowModel().rows.map((row: Row<Uom>) => (
                <CustomRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    {isLoading ? 'Loading...' : 'No matching records found'}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <ListPagination /> */}
    </KTCardBody>
  )
}

export { UomTable }