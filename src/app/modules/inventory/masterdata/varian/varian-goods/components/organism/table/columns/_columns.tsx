import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { VariantGoods } from '../../../molecules/core/_models'

const usersColumns: ColumnDef<VariantGoods>[] = [

  {
    header: (props) => <UserCustomHeader title='No' className='w-43px' />,
    id: 'id',
    accessorKey: 'id',

  },
  {
    header: (props) => <UserCustomHeader title='Nama Brand' className=' w-800px' />,
    id: 'name',
    accessorKey: 'name',

  },
  {
    header: (props) => <UserCustomHeader title='Kategori' className=' w-800px' />,
    id: 'category',
    accessorKey: 'category',

  },
  {
    header: (props) => (
      <UserCustomHeader title='Status' className='max-w-101px' />
    ),
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader title='Aksi ' className='w-54px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { usersColumns }
