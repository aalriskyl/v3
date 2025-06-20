import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { VariantMaterialsUom } from '../../../molecules/core/_models'

type Props = {
    header: Header<VariantMaterialsUom, unknown>
}

const CustomHeaderUomColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { CustomHeaderUomColumn }
