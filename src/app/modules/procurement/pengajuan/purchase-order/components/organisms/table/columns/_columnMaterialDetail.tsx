import { ColumnDef } from '@tanstack/react-table'
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialDetailActionsCell } from './MaterialDetailActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { MaterialModelSupplier } from '../../../molecules/core/_models'

const materialDetailColumns: ColumnDef<MaterialModelSupplier>[] = [
    {
        header: () => <UserCustomHeader title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: () => <UserCustomHeader title="Material" className="w-271px" />,
        id: 'material',
        accessorKey: 'material',
    },
    {
        header: () => <UserCustomHeader title="Konversi Material" className="w-271px" />,
        id: 'konversi_material',
        accessorKey: 'konversi_material',
    },
    {
        header: () => <UserCustomHeader title="Jumlah" className="w-271px" />,
        id: 'jumlah',
        accessorKey: 'jumlah',
    },
    {
        header: () => <UserCustomHeader title="Satuan UOM" className="w-271px" />,
        id: 'uom',
        accessorKey: 'uom',
    },
    {
        header: () => <UserCustomHeader title="Harga" className="w-271px" />,
        id: 'harga',
        accessorKey: 'harga',
    },
    {
        header: () => <UserCustomHeader title="Aksi" className="w-20px" />,
        id: 'actions',
        cell: (info) => <MaterialDetailActionsCell id={info.row.original.id} />,
    },
]

export { materialDetailColumns }
