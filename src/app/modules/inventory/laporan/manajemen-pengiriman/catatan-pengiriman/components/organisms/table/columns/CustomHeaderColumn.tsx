import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { CatatanPengirimanModel } from '../../../molecules/core/_models'

type Props = {
  header: Header<CatatanPengirimanModel, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
}

export { CustomHeaderColumn }
