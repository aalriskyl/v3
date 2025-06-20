/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'
import { MaterialCustomHeader } from './MaterialCustomHeader'
import { Material } from '../../../molecules/core/_models'

const materialColumns: ColumnDef<Material>[] = [
    {
        header: (props) => <MaterialCustomHeader tableProps={props} title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1,
    },
    {
        header: (props) => <MaterialCustomHeader tableProps={props} title='Material' className=' w-450px' />,
        id: 'material',
        accessorKey: 'material',

    },
    {
        header: (props) => <MaterialCustomHeader tableProps={props} title='Satuan UOM' className=' w-450px' />,
        id: 'satuan_uom',
        accessorKey: 'satuan_uom',

    },
    {
        header: (props) => <MaterialCustomHeader tableProps={props} title='Jumlah Material' className=' w-450px' />,
        id: 'jumlah_material',
        accessorKey: 'jumlah_material',

    },
    {
        header: (props) => <MaterialCustomHeader tableProps={props} title='Supplier' className=' w-450px' />,
        id: 'supplier',
        accessorKey: 'supplier',

    },
    {
        header: (props) => (
            <MaterialCustomHeader tableProps={props} title='Aksi' className='w-54px' />
        ),
        id: 'actions',
        cell: ({ row, table }: any) => (
            <button
                onClick={() => table.options.meta?.onDelete?.(row.original.id)}
                className="btn btn-danger btn-sm"
            >
                Hapus
            </button>
        ),
    },
]

export { materialColumns }
