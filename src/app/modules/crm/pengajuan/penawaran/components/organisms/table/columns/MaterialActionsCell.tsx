import { FC, useEffect, useState } from 'react';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { Link } from 'react-router-dom';
import { DetailMaterialModal } from '../../../molecules/modals/DetailMaterialModal';
import { EditMaterialModal } from '../../../molecules/modals/EditMaterialModal';

type Props = {
  id: ID;
  supplier_id: any;
  refetchData: () => void;
  status: string;
};

const MaterialActionsCell: FC<Props> = ({ id, supplier_id, refetchData, status }) => {
  const { setItemIdForUpdate } = useListView();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
    setIsEditModalOpen(true);
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

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
       {status === "Draft" && (
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
              href='#'
              onClick={openEditModal}
            >
              Edit
            </a>
          </div>
       )}
        {/* end::Menu item */}
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            href='#'
            onClick={openDetailModal}
          >
            Detail
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}

      {/* Modal Edit */}
      <EditMaterialModal
        supplier_id={supplier_id}
        show={isEditModalOpen}
        handleClose={closeEditModal}
        material_request_id={id}
        materialId={id}
        onSubmit={refetchData} // Pass refetchData to EditMaterialModal
      />

      {/* Modal Detail */}
      <DetailMaterialModal
        show={isDetailModalOpen}
        handleClose={closeDetailModal}
        materialId={id} // Pass the material ID to the modal
        status={status}
      />
    </>
  );
};

export { MaterialActionsCell };