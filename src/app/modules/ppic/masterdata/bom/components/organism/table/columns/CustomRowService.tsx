import clsx from 'clsx'
import { FC } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import { Service } from '../../../molecules/core/_models'

type Props = {
  row: Row<Service>
}

const CustomRowService: FC<Props> = ({ row }) => (
  <tr>
    {row.getVisibleCells().map((cell) => {
      return (
        <td
          key={cell.id}
          className={clsx({ 'max-w-54px': cell.column.id === 'actions' })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
    })}
  </tr>
)

export { CustomRowService }
