import clsx from 'clsx'
import { FC } from 'react'
import { Bom } from '../../../molecules/core/_models'
import { HeaderContext } from "@tanstack/react-table";

type Props = {
  className?: string
  title?: string
  tableProps: HeaderContext<Bom, unknown>
}
const BomCustomHeader: FC<Props> = ({ className, title }) => {

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

export { BomCustomHeader }
