import { FC, Fragment } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLayout } from '../../../core/LayoutProvider'
import { usePageData } from '../../../core/PageData'

const DefaultTitle: FC = () => {
  const { pageTitle, pageDescription, pageBreadcrumbs } = usePageData()
  const { config, classes } = useLayout()
  return (
    <div
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}"
      className={clsx(
        'page-title d-flex flex-column align-items-start justify-content-center flex-wrap mt-n5 mt-lg-0 me-lg-2 pb-2 pb-lg-0',
        classes.pageTitle.join(' ')
      )}
    >
      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <>
            <ul className='breadcrumb fs-base my-4'>
              {Array.from(pageBreadcrumbs)
                .filter((t) => !t.isSeparator)
                .map((item, index) => (
                  <Fragment key={`${item.path}${index}`}>
                    {item.isActive ? (
                      <li className='breadcrumb-item text-gray-900'>{item.title}</li>
                    ) : (
                      <li className='breadcrumb-item text-gray-900'>
                        <Link to={item.path} className='text-gray-900'>
                          {item.title}
                        </Link>
                      </li>
                    )}
                  </Fragment>
                ))}
              <li className='breadcrumb-item text-primary'>{pageTitle}</li>
            </ul>
          </>
        )}
      {/* begin::Heading */}
      <h1 className='text-gray-900 fw-bolder my-0 fs-1'>
        {pageTitle && pageTitle}
        {pageDescription && (
          <span className='text-muted fs-6 fw-normal ms-1'>{pageDescription}</span>
        )}
      </h1>
      {/* end::Heading */}


    </div>
  )
}

export { DefaultTitle }
