import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, QUERIES } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { deleteUser } from '../../../molecules/core/_requests';
import { DetailSupplierModal } from '../../../molecules/modals/DetailSupplierModal';
// import { AddSupplierModal } from '../../../molecules/modals/AddTermsModal';
// import { EditSupplierModal } from '../../../molecules/modals/EditSupplierModal';

type Props = {
  id: ID;
  onEditSuccess?: () => void;
};

const SupplierActionsCell: FC<Props> = ({ id, onEditSuccess }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`],
      });
    },
  });

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Pastikan id selalu berupa string
  const supplierId = id ? id.toString() : '';

  return (
    <>
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

      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4'
        data-kt-menu='true'
      >
        {/* Tombol Edit */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            onClick={id ? handleOpenEditModal : undefined}
            style={{ cursor: id ? 'pointer' : 'not-allowed' }}
          >
            Edit
          </a>
        </div>

        {/* Tombol Detail */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            onClick={id ? handleOpenDetailModal : undefined}
            style={{ cursor: id ? 'pointer' : 'not-allowed' }}
          >
            Detail
          </a>
        </div>
      </div>

      {/* Modal Detail Supplier */}
      {isDetailModalOpen && (
        <DetailSupplierModal
          show={isDetailModalOpen}
          handleClose={handleCloseDetailModal}
          supplier_id={supplierId}
        />
      )}

      {/* Modal Edit Supplier */}
      {/* {isEditModalOpen && (
        <EditSupplierModal
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
          supplier_id={supplierId}
          onSuccess={onEditSuccess}
        />
      )} */}
    </>
  );
};

export { SupplierActionsCell };