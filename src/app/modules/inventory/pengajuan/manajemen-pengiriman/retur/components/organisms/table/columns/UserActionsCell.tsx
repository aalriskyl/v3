import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MenuComponent } from '@metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '@metronic/helpers'
import { useListView } from '../../../molecules/core/ListViewProvider'
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const moveTo = () => {
    navigate('/new')
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-icon text-left'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        aria-label='Actions'
      >
        <i className='bi bi-three-dots-vertical d-flex justify-content-center' />
      </button>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link
            className='menu-link px-3'
            to={`edit/${id}`}
            onClick={openEditModal}>
            Edit
          </Link>
        </div>
        {/* end::Menu item */}
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link
            className='menu-link px-3'
            to={`detail/${id}`}>
            Detail
          </Link>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export { UserActionsCell }
