/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'
import { ServiceCustomHeader } from './ServiceCustomHeader'
import { Service } from '../../../molecules/core/_models'

const serviceColumns: ColumnDef<Service>[] = [
  {
    header: (props) => <ServiceCustomHeader tableProps={props} title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <ServiceCustomHeader tableProps={props} title='Layanan' className='w-450px' />,
    id: 'service',
    accessorKey: 'service',
  },
  {
    header: (props) => <ServiceCustomHeader tableProps={props} title='Supplier' className='w-450px' />,
    id: 'supplier',
    accessorKey: 'supplier',
  },
  {
    header: (props) => (
      <ServiceCustomHeader tableProps={props} title='Aksi' className='w-54px' />
    ),
    id: 'actions',
    cell: ({ row, table }: any) => (
      <button
        onClick={() => table.options.meta?.onDelete?.(row.original.id)}
        className="btn btn-danger btn-sm"
      >
        Hapus
      </button>
    ),
  },
]

export { serviceColumns }