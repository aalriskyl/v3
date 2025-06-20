import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MenuComponent } from '@metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '@metronic/helpers'
import { useListView } from '../../../molecules/core/ListViewProvider'
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider'
import { deleteUser } from '../../../molecules/core/_requests'
import { Link, useNavigate } from 'react-router-dom';


type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const moveTo = () => {
    const navigate = useNavigate();
    navigate('/new');
  };

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`]
      })
    }
  })

  return <>
    <Link
      to='detail-finish-goods'
      className='text-left'
    >
      <span className="fs-7 text-success">
        Detail
      </span>

    </Link>
  </>;
}

export { UserActionsCell }
