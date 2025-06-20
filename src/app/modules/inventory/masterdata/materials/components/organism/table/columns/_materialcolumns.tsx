import { ColumnDef } from '@tanstack/react-table';
import { MaterialActionsCell } from './MaterialActionsCell';
import { MaterialHeader } from './MaterialHeader';
import { Materials } from '../../../molecules/core/_models';

const materialColumns: ColumnDef<Materials>[] = [
  {
    header: (props) => <MaterialHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <MaterialHeader title='Nama Barang' className='w-450px' />,
    id: 'name',
    accessorKey: 'name',
  },
  {
    header: (props) => <MaterialHeader title='Kategori' className='w-450px' />,
    id: 'category_name',
    accessorKey: 'category_name',
  },
  {
    header: (props) => (
      <MaterialHeader title='Aksi' className='w-10px' />
    ),
    id: 'actions',
    cell: (info) => <MaterialActionsCell id={info.row.original.id} />,
  },
];

export { materialColumns };