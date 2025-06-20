import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Schema } from '../../../molecules/core/_models'

const layananColumns: ColumnDef<Schema>[] = [
  {
    header: (props) => <UserCustomHeader tableProps={props} title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='Nama' className=' w-800px' />,
    id: 'name',
    accessorKey: 'name',

  },
  {
    header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='max-w-101px' />
    ),
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader tableProps={props} title='Aksi' className='w-54px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { layananColumns }
