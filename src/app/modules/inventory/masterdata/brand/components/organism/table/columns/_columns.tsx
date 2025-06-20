import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Brand } from '../../../molecules/core/_models'

const usersColumns: ColumnDef<Brand>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
  },
  {
    header: (props) => <UserCustomHeader title='Nama Brand' className=' w-800px' />,
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
      <UserCustomHeader title='Aksi ' className='w-10px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { usersColumns }
