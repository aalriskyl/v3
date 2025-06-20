import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { LayananModel } from '../../../molecules/core/_models'

type Props = {
  header: Header<LayananModel, unknown>
}

const LayananHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
}

export { LayananHeaderColumn }
