import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Uom } from '../../../molecules/core/_models'

const uomColumns: ColumnDef<Uom>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title='Nama Satuan/UOM' className=' w-800px' />,
    id: 'name',
    accessorKey: 'name',

  },
  {
    header: (props) => <UserCustomHeader title="Status" className="w-20px" />,
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader title='Aksi' className='w-10px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { uomColumns }
