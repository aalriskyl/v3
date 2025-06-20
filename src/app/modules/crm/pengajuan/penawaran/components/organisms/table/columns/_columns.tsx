import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Model } from '../../../molecules/core/_models'

const usersColumns = (status: string): ColumnDef<Model>[] => [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title="Nomor Penawaran" className="w-370px" />,
    id: 'no_quotation',
    accessorKey: 'no_quotation',
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-370px" />,
    id: 'type',
    accessorKey: 'type',
  },
  {
    header: (props) => <UserCustomHeader title="Customer" className="w-370px" />,
    id: 'customer.name',
    accessorKey: 'customer.name',
  },
  {
    header: (props) => <UserCustomHeader title="Status" className="w-10px" />,
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} status={info.row.original.status} />,
  },
];

export { usersColumns };