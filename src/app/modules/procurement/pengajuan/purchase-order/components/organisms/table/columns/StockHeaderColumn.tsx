import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { MaterialModelWarehouse } from '../../../molecules/core/_models'

type Props = {
    header: Header<MaterialModelWarehouse, unknown>
}

const StockHeaderColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { StockHeaderColumn }
