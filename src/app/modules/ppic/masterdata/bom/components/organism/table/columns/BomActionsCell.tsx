import { FC, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, KTIcon, QUERIES } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { deleteUser } from '../../../molecules/core/_requests';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  id: ID;
  type: string; // Tambahkan prop type
};

const BomActionsCell: FC<Props> = ({ id, type }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`],
      });
    },
  });

  return (
    <>
      <a
        href="#"
        className="text-left"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <span className="fs-2">
          <i className="bi bi-three-dots-vertical d-flex justify-content-center" />
        </span>
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <Link
            className="menu-link px-3"
            to={`${type === 'Finish Goods' ? 'finishgoods' : 'material'}/edit/${id}`}
            onClick={openEditModal}
          >
            Edit
          </Link>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <Link
            className="menu-link px-3"
            to={`${type === 'Finish Goods' ? 'finishgoods' : 'material'}/detail/${id}`}
          >
            Detail
          </Link>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { BomActionsCell };