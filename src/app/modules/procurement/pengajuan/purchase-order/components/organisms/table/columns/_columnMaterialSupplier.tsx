import { ColumnDef } from '@tanstack/react-table'
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialActionsCell } from './MaterialActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { MaterialModelSupplier } from '../../../molecules/core/_models'

const materialColumnsSupplier = (status: string): ColumnDef<MaterialModelSupplier>[] => [
    {
        header: (props) => <UserCustomHeader title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: (props) => <UserCustomHeader title="Material" className="w-271px" />,
        id: 'material.name',
        accessorKey: 'material.name',
    },
    // {
    //     header: (props) => <UserCustomHeader title="Konversi Material" className="w-271px" />,
    //     id: 'konversi_material',
    //     accessorKey: 'konversi_material',
    // },
    {
        header: (props) => <UserCustomHeader title="Jumlah" className="w-271px" />,
        id: 'amount',
        accessorKey: 'amount',
    },
    {
        header: (props) => <UserCustomHeader title="Satuan UOM" className="w-271px" />,
        id: 'material_uom.uom_actual.name',
        accessorKey: 'material_uom.uom_actual.name',
    },
    {
        header: (props) => <UserCustomHeader title="Harga" className="w-271px" />,
        id: 'price',
        accessorKey: 'price',
    },
    {
        header: (props) => <UserCustomHeader title="Barang Diterima" className="w-271px" />,
        id: 'amount_received',
        accessorKey: 'amount_received',
    },
    {
        header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
        id: 'actions',
        cell: (info) => <MaterialActionsCell status={status} id={info.row.original.id} />,
    },
]

export { materialColumnsSupplier }
