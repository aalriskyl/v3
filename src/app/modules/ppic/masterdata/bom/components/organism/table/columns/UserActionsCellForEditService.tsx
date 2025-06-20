import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, KTIcon, QUERIES } from '@metronic/helpers';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { deleteUser } from '../../../molecules/core/_requests';
import { EditServiceModal } from '../../../molecules/modals/EditServiceModal';
import { DetailServiceModal } from '../../../molecules/modals/DetailServiceModal';

type Props = {
  id: ID;
};

const UserActionsCellForEditService: FC<Props> = ({ id }) => {
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`],
      });
    },
  });

  const handleSubmit = (data: any) => {
    console.log('Data submitted:', data);
    handleCloseEditModal();
  };

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
          <a
            href="#"
            className="menu-link px-3"
            onClick={(e) => {
              e.preventDefault();
              handleOpenEditModal();
            }}
          >
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a
            href="#"
            className="menu-link px-3"
            onClick={(e) => {
              e.preventDefault();
              handleOpenDetailModal();
            }}
          >
            Detail
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}

      {/* Render Edit Service Modal */}
      <EditServiceModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        onSubmit={handleSubmit}
      />

      {/* Render Detail Service Modal */}
      <DetailServiceModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        handleDelete={() => deleteItem.mutate()}
      />
    </>
  );
};

export { UserActionsCellForEditService };
