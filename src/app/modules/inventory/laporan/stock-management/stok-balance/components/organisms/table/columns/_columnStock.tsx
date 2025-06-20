import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { UomSection } from '../../../molecules/core/_models'
import { StokActionCell } from './StokActionCell'
const stockColumns: ColumnDef<UomSection>[] = [
    {
        header: (props) => <UserCustomHeader title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: (props) => <UserCustomHeader title="Material" className="w-271px" />,
        id: 'material',
        accessorKey: 'material.name', // Correctly maps to material.name
    },
    {
        header: (props) => <UserCustomHeader title="Satuan Uom" className="w-271px" />,
        id: 'uom',
        accessorKey: 'material_uom.uom_actual.name', // Correctly maps to material_uom.uom_actual.name
    },
    {
        header: (props) => <UserCustomHeader title="Jumlah Stock" className="w-271px" />,
        id: 'stock',
        accessorKey: 'amount', // Correctly maps to amount
    },
    {
        header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
        id: 'actions',
        cell: (info) => <StokActionCell id={info.row.original.id} />,
    },
];

export { stockColumns }
