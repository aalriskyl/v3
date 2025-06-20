import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MenuComponent } from '@metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '@metronic/helpers'
// import { useListView } from '../../../molecules/core/ListViewProvider'
// import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider'
// import { deleteUser } from '../../../molecules/core/_requests'
import { Link, useNavigate } from 'react-router-dom';


type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({ id }) => {

  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
  }



  return <>
    <a
      href='#'
      className='text-left'
      data-kt-menu-trigger='click'
      data-kt-menu-placement='bottom-end'
    >
      <span className="fs-2">
        <i className="bi bi-three-dots-vertical d-flex justify-content-center" />
      </span>

    </a>
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
        >Edit</Link>
      </div>
      {/* end::Menu item */}

      {/* begin::Menu item */}
      <div className='menu-item px-3'>
        <Link
          className='menu-link px-3'
          to={`detail/${id}`}
        >
          Detail
        </Link>
      </div>
      {/* end::Menu item */}
    </div>
    {/* end::Menu */}
  </>;
}

export { UserActionsCell }
