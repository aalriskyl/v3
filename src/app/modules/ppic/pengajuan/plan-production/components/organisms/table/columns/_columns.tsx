import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { PlanProductionModel } from '../../../molecules/core/_models'

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const usersColumns: ColumnDef<PlanProductionModel>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title="Tipe Plan Production" className="w-370px" />,
    id: 'type',
    accessorKey: 'type',
  },
  {
    header: (props) => <UserCustomHeader title="Tanggal Mulai Produksi" className="w-370px" />,
    id: 'tanggal_mulai',
    accessorKey: 'tanggal_mulai',
    cell: (info) => formatDate(info.getValue() as Date),
  },
  {
    header: (props) => <UserCustomHeader title="Tanggal Berakhir Produksi" className="w-370px" />,
    id: 'tanggal_berakhir',
    accessorKey: 'tanggal_berakhir',
    cell: (info) => formatDate(info.getValue() as Date),
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
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
];

export { usersColumns };