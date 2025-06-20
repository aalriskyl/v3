import clsx from 'clsx'
import { FC } from 'react'


type Props = {
  className?: string
  title?: string

}
const LayananCustomHeader: FC<Props> = ({ className, title, }) => {
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

export { LayananCustomHeader }
