import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { initialQueryState } from '../../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../../molecules/core/QueryRequestProvider'
import { Supplier } from '../../../molecules/core/_models'
import { HeaderContext } from "@tanstack/react-table";

type Props = {
  className?: string
  title?: string
  tableProps: HeaderContext<Supplier, unknown>
}
const SupplierHeader: FC<Props> = ({ className, title, tableProps }) => {
  const id = tableProps.column.id;
  const { state, updateState } = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id
  }, [state, id])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({ sort: id, order: 'asc', ...initialQueryState })
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({ sort: id, order: 'desc', ...initialQueryState })
        return
      }

      // disable sort
      updateState({ sort: undefined, order: undefined, ...initialQueryState })
    }
  }

  return (
    <td
      className={clsx(
        className, 'p-4'
      )}
    >
      {title}
    </td>
  )
}

export { SupplierHeader }
