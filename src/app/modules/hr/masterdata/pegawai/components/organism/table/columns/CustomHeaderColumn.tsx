import { FC } from 'react'
import { flexRender, Header } from '@tanstack/react-table'
import { Pegawai } from '../../../molecules/core/_models'

type Props = {
  header: Header<Pegawai, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
}

export { CustomHeaderColumn }
