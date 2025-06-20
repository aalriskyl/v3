import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { Category } from '../../../molecules/core/_models'

type Props = {
  header: Header<Category, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
}

export { CustomHeaderColumn }
