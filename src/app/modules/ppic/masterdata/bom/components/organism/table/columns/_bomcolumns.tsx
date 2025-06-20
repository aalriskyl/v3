import { ColumnDef } from '@tanstack/react-table'
import { BomActionsCell } from './BomActionsCell'
import { BomCustomHeader } from './BomCustomHeader'
import { Bom } from '../../../molecules/core/_models'

const bomColumns: ColumnDef<Bom>[] = [
    {
        header: (props) => <BomCustomHeader tableProps={props} title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
    },
    {
        header: (props) => <BomCustomHeader tableProps={props} title='Nama' className=' w-800px' />,
        id: 'name',
        accessorKey: 'name',

    },
    {
        header: (props) => (
            <BomCustomHeader tableProps={props} title="Aksi" className="w-54px" />
        ),
        id: 'actions',
        cell: (info) => (
            <BomActionsCell id={info.row.original.id} type={info.row.original.type} />
        ),
    },
]

export { bomColumns }
