import { FC } from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import { checkIsActive, KTIcon, WithChildren } from '../../../helpers'
import { useLayout } from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  className?: string
  class?: string
}

const AsideMenuItemWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,

}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  )
}

export { AsideMenuItemWithSub }
