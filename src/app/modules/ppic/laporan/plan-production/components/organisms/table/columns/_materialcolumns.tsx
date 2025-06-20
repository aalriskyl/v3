import { ColumnDef } from '@tanstack/react-table'
import { MaterialActionsCell } from './MaterialActionsCell'
import { MaterialCustomHeader } from './MaterialCustomHeader'
import { MaterialModel } from '../../../molecules/core/_models'

const materialColumns: ColumnDef<MaterialModel>[] = [
  {
    header: (props) => <MaterialCustomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <MaterialCustomHeader title="Bill of Material" className="w-370px" />,
    id: 'bill_of_materials',
    accessorKey: 'bill_of_materials',
  },
  {
    header: (props) => <MaterialCustomHeader title="Jumlah Produksi" className="w-370px" />,
    id: 'jumlah_produksi',
    accessorKey: 'jumlah_produksi',
  },
  {
    header: (props) => <MaterialCustomHeader title="Jenis Buffer Stock" className="w-370px" />,
    id: 'jenis_buffer_stock',
    accessorKey: 'jenis_buffer_stock',
  },
  {
    header: (props) => <MaterialCustomHeader title="Buffer Stock" className="w-370px" />,
    id: 'buffer_stock',
    accessorKey: 'buffer_stock',
  },
  {
    header: (props) => <MaterialCustomHeader title="Aksi" className="w-20px" />,
    id: 'actions',
    cell: (info) => <MaterialActionsCell id={info.row.original.id} />,
  },
];

export { materialColumns };