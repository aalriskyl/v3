import { ColumnDef } from '@tanstack/react-table'
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialActionsCell } from './MaterialActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { MaterialModel } from '../../../molecules/core/_models'
import { UserActionsCell } from './UserActionsCell'

const materialColumnsModified: ColumnDef<MaterialModel>[] = [
    {
        header: (props) => <UserCustomHeader title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: (props) => <UserCustomHeader title="Layanan" className="w-271px" />,
        id: 'service.name',
        accessorKey: 'service.name',
    },
    {
        header: (props) => <UserCustomHeader title="Jumlah" className="w-271px" />,
        id: 'amount',
        accessorKey: 'amount',
    },
    {
        header: (props) => <UserCustomHeader title="Harga" className="w-271px" />,
        id: 'price',
        accessorKey: 'price',
    },
    // Di materialColumns
    {
        header: (props) => (
            <UserCustomHeader title='Aksi' className='w-54px' />
        ),
        id: 'actions',
        cell: ({ row, table }: any) => (
            <button
                onClick={() => {
                    table.options.meta?.onDelete?.(row.original.id);
                }}
                className="btn btn-danger btn-sm"
            >
                Hapus
            </button>
        ),
    },
]

const materialColumnsList = (supplier_id: string, refetchData: () => void, status: string): ColumnDef<MaterialModel>[] => [
    {
        header: (props) => <UserCustomHeader title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: (props) => <UserCustomHeader title="Layanan" className="w-271px" />,
        id: 'service.name',
        accessorKey: 'service.name',
    },
    {
        header: (props) => <UserCustomHeader title="Jumlah" className="w-271px" />,
        id: 'amount',
        accessorKey: 'amount',
    },
    {
        header: (props) => <UserCustomHeader title="Harga" className="w-271px" />,
        id: 'price',
        accessorKey: 'price',
    },
    {
        header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
        id: 'actions',
        cell: (info) => (
            <MaterialActionsCell
                id={info.row.original.id}
                supplier_id={supplier_id}
                refetchData={refetchData}
                status={status}
            />
        ),
    },
];

export { materialColumnsModified, materialColumnsList }
