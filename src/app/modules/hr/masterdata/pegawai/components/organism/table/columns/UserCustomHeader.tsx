import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { initialQueryState } from '@metronic/helpers'
// import { useQueryRequest } from '../../../molecules/core/QueryRequestProvider'
import { Pegawai } from '../../../molecules/core/_models'
import { HeaderContext } from "@tanstack/react-table";

type Props = {
  className?: string
  title?: string
  tableProps: HeaderContext<Pegawai, unknown>
}
const UserCustomHeader: FC<Props> = ({ className, title, tableProps }) => {
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

export { UserCustomHeader }
