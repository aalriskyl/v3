import { ColumnDef } from '@tanstack/react-table'
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialActionsCell } from './MaterialActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { MaterialModel } from '../../../molecules/core/_models'

const materialColumns = (supplier_id: string, refetchData: () => void, status: string): ColumnDef<MaterialModel>[] => [
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
        header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
        id: 'actions',
        cell: (info) => (
            <MaterialActionsCell
                id={info.row.original.id}
                supplier_id={supplier_id}
                // refetchData={refetchData}
                status={status}
            />
        ),
    },
];

export { materialColumns }
