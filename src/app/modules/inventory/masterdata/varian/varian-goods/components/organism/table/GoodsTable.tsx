import { useMemo } from 'react'
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
// import { useQueryResponseData, useQueryResponseLoading } from '../core/QueryResponseProvider'
import { usersColumns } from './columns/_columns'
import { VariantGoods } from '../../molecules/core/_models'
import { UsersListLoading } from '../../molecules/loading/UsersListLoading'
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination'
import { KTCardBody } from '@metronic/helpers'

// ini nanti di ganti sesuai fetchnya kalo dari supplier/cust
const dummyData: VariantGoods[] = [
  { id: 1, name: 'Ini adalah nama sebuah ', category: 'ini sebuah desc', status: 'Active' },
  { id: 2, name: 'Ini adalah nama sebuah brand', category: 'ini sebuah desc', status: 'Inactive' },
  { id: 3, name: 'Ini adalah nama sebuah brand', category: 'ini sebuah desc', status: 'Active' },

]

const GoodsTable: React.FC = () => {
  const users = dummyData
  // const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (

    <KTCardBody className='py-4 max-w-20' >
      <div className='table-responsive' >
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
              table.getRowModel().rows.map((row: Row<VariantGoods>) => {
                return <CustomRow key={row.id} row={row} />
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
      {/* <ListPagination /> */}
      {/* {isLoading && <UsersListLoading />} */}
    </KTCardBody>
  )
}

export { GoodsTable }
