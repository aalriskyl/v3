import { FC } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { checkIsActive, KTIcon, WithChildren } from '../../../helpers'
import { useLayout } from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return (
    <div className='menu-item'>
      <Link className={` ${clsx('menu-link without-sub', { active: isActive })}`} to={to} style={{ backgroundColor: "transparent", fontWeight: "400" }}>
        {hasBullet && (
          <span className='menu-bullet ps-8'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className=' ps-2 fw-normal'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export { AsideMenuItem }
