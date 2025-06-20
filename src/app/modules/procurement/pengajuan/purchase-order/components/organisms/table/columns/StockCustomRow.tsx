import clsx from 'clsx'
import { FC } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import { MaterialModelWarehouse } from '../../../molecules/core/_models'

type Props = {
    row: Row<MaterialModelWarehouse>
    status?: string;
}

const StockCustomRow: FC<Props> = ({ row, status }) => (
    <tr>
        {row.getVisibleCells().map((cell) => {
            return (
                <td
                    key={cell.id}
                    className={clsx({ 'w-54px': cell.column.id === 'actions' && status === 'Draft' })}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            )
        })}
    </tr>
)

export { StockCustomRow }
