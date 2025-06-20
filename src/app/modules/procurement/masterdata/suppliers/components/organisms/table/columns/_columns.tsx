import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Suppliers } from '../../../molecules/core/_models'

const usersColumns: ColumnDef<Suppliers>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title="Nama Perusahaan" className="w-271px" />,
    id: 'name',
    accessorKey: 'name',
  },
  {
    header: (props) => <UserCustomHeader title="Nomor Telepon" className="w-271px" />,
    id: 'phone',
    accessorKey: 'phone',
  },
  {
    header: (props) => <UserCustomHeader title="Kota" className="w-271px" />,
    id: 'city',
    accessorKey: 'city',
  },
  {
    header: (props) => <UserCustomHeader title="Industri" className="w-271px" />,
    id: 'industry',
    accessorKey: 'industry',
  },
  {
    header: (props) => <UserCustomHeader title="Status" className="w-46px" />,
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-10px" />,
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { usersColumns }
