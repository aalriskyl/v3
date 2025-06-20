import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { ItemBundling } from '../../../molecules/core/_models'

const customColumn: ColumnDef<ItemBundling>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
  },
  {
    header: (props) => <UserCustomHeader title='Nama' className=' w-800px' />,
    id: 'name',
    accessorKey: 'name',

  },
  {
    header: (props) => <UserCustomHeader title='Harga Total (RP)' className=' w-800px' />,
    id: 'total_price',
    accessorKey: 'total_price',
    cell: (props) =>
      new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(props.getValue<number>())
  },
  {
    header: (props) => (
      <UserCustomHeader title='Aksi' className='w-54px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { customColumn }
