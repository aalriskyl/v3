import clsx from 'clsx'
import { FC, useMemo } from 'react'

type Props = {
  className?: string
  title?: string

}
const UserCustomHeader: FC<Props> = ({ className, title }) => {


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
