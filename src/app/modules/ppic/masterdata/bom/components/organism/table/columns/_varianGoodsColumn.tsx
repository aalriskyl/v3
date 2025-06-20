import { ColumnDef } from '@tanstack/react-table'
import { UserActionsCellEditGoods } from './UserActionsCellEditGoods'
import { FinishGoodsCustomHeader } from './FinishGoodsCustomHeader'
import { FinishGoods } from '../../../molecules/core/_models'
import { Link } from 'react-router-dom'

const finishGoodsColumns: ColumnDef<FinishGoods>[] = [
    {
        header: (props) => <FinishGoodsCustomHeader tableProps={props} title="No" className="w-10px" />,
        id: 'no',
        cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
    },
    {
        header: (props) => <FinishGoodsCustomHeader tableProps={props} title='Nama Finish Goods' className=' w-450px' />,
        id: 'name',
        accessorKey: 'name',

    },
    {
        header: (props) => <FinishGoodsCustomHeader tableProps={props} title='Harga Jual' className=' w-450px' />,
        id: 'price_sell',
        accessorKey: 'price_sell',

    },
    {
        header: (props) => <FinishGoodsCustomHeader tableProps={props} title='SKU' className=' w-450px' />,
        id: 'sku',
        accessorKey: 'sku',

    },
    {
        header: (props) => <FinishGoodsCustomHeader tableProps={props} title='Ekspetasi Jumlah Hasil' className=' w-450px' />,
        id: 'expected_result',
        accessorKey: 'expected_result',

    },

    {
        header: (props) => (
            <FinishGoodsCustomHeader tableProps={props} title='Aksi' className='w-54px' />
        ),
        id: 'actions',
        cell: (info) => <>
            {console.log(info.row)}
            <Link
                to={`/ppic/masterdata/bom/finishgoods/variant/${info.row.original.id}`}
                className="btn btn-icon btn-light btn-sm"
            >
                {/* Ikon atau teks edit */}
                <i className="fas fa-edit"></i>

                {/* Jika ingin text instead of icon */}
                {/* <span className="text-primary">Edit</span> */}
            </Link>
        </>,
    },
]



export { finishGoodsColumns }
