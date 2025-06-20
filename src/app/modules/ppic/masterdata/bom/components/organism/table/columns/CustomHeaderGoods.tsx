import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { FinishGoods } from '../../../molecules/core/_models'

type Props = {
    header: Header<FinishGoods, unknown>
}

const CustomHeaderGoodsColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { CustomHeaderGoodsColumn }
