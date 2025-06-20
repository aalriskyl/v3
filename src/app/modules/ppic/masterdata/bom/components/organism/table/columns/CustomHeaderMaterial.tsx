import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { Material } from '../../../molecules/core/_models'

type Props = {
    header: Header<Material, unknown>
}

const CustomHeaderMaterial: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { CustomHeaderMaterial }
