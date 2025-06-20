import clsx from 'clsx'
import { FC } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import { Supplier } from '../../../molecules/core/_models'

type Props = {
  row: Row<Supplier>
  onEditSuccess?: () => void; // Tambahkan prop onEditSuccess
}

const SupplierRow: FC<Props> = ({ row }) => (
  <tr>
    {row.getVisibleCells().map((cell) => {
      return (
        <td
          key={cell.id}
          className={clsx({ 'max-w-55px': cell.column.id === 'actions' })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
    })}
  </tr>
)

export { SupplierRow }
