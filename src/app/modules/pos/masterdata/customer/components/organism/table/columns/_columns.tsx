import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Customer } from '../../../molecules/core/_models'

const usersColumns: ColumnDef<Customer>[] = [
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
    header: (props) => <UserCustomHeader title='Email' className=' w-800px' />,
    id: 'email',
    accessorKey: 'email',

  },
  {
    header: (props) => <UserCustomHeader title='Phone' className=' w-800px' />,
    id: 'phone',
    accessorKey: 'phone',
  },
]

export { usersColumns }
