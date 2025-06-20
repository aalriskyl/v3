import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { Bom } from '../../../molecules/core/_models'

type Props = {
  header: Header<Bom, unknown>
}

const BomHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
}

export { BomHeaderColumn }
