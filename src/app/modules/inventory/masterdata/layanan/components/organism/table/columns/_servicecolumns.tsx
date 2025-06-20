import { ColumnDef } from '@tanstack/react-table';
import { ServiceActionsCell } from './ServiceActionsCell';
import { UserTwoStepsCell } from './UserTwoStepsCell';
import { ServiceHeader } from './ServiceHeader';
import { Service } from '../../../molecules/core/_models';

const serviceColumns: ColumnDef<Service>[] = [
  {
    header: (props) => <ServiceHeader tableProps={props} title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <ServiceHeader tableProps={props} title="Nama" className="w-800px" />,
    id: 'name',
    accessorKey: 'name',
  },
  {
    header: (props) => <ServiceHeader tableProps={props} title="Kategori Produk" className="w-800px" />,
    id: 'category',
    accessorKey: 'category_name',
  },
  {
    header: (props) => <ServiceHeader tableProps={props} title="Status" className="w-46px" />,
    id: 'status',
    accessorKey: 'status',
    cell: (info) => <UserTwoStepsCell status={info.row.original.status ?? false} />,
  },
  {
    header: (props) => <ServiceHeader tableProps={props} title="Aksi" className="w-54px" />,
    id: 'actions',
    cell: (info) => <ServiceActionsCell id={info.row.original.id} />,
  },
];

export { serviceColumns };