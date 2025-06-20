import { ColumnDef } from '@tanstack/react-table';
import { UserTwoStepsCell } from './UserTwoStepsCell';
import { UserActionsCell } from './UserActionsCell';
import { UserCustomHeader } from './UserCustomHeader';
import { Model } from '../../../molecules/core/_models';

const usersColumns = (status: string): ColumnDef<Model>[] => [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title="Nomor Purchase Request" className="w-180px" />,
    id: 'no_purchase_order',
    accessorKey: 'no_purchase_order',
  },
  {
    header: (props) => <UserCustomHeader title="Pemasok" className="w-250px" />,
    id: 'supplier',
    accessorKey: 'supplier.name',
  },

  {
    header: (props) => <UserCustomHeader title="Status Pengiriman" className="w-130px" />,
    id: 'type',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Status Pembayaran" className="w-130px" />,
    id: 'type',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Status Dokumen" className="w-130px" />,
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-10px" />,
    id: 'actions',
    cell: (info) => <UserActionsCell status={info.row.original.status} id={info.row.original.id} />,
  },
];

export { usersColumns };