import { FC, useEffect, useState } from 'react';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { Link, useParams } from 'react-router-dom';
import { DetailLayananModal } from '../../../molecules/modals/DetailLayananModal';
// import { EditLayananModal } from '../../../molecules/modals/EditLayananModal';
import { getSinglePurchaseOrder } from '../../../../core/_request';
import { EditLayananModal } from '../../../molecules/modals/EditLayananModal';
import { EditLayananModalWarehouse } from '../../../molecules/modals/EditLayananWarehouse';

type Props = {
  id: ID;
  status: string;
  type: string
  supplierId: string;
  isCompanyId: string;
  isQuotation: string;
};

const LayananActionsCell: FC<Props> = ({ id, status, type, supplierId, isCompanyId, isQuotation }) => {
   const { setItemIdForUpdate } = useListView();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { poId } = useParams<{ poId: string }>();
    const [userData, setUserData] = useState<any>(null);
  // console.log('status', status);
    useEffect(() => {
      const fetchPurchaseOrder = async () => {
        if (poId) {
          try {
            const response = await getSinglePurchaseOrder(poId);
            // console.log('cek action', response.data);
            setUserData(response.data);
          } catch (error) {
         }
        }
      };
      fetchPurchaseOrder();
    }, [id, poId]);
  
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
          {/* Conditionally render Edit button */}
          {status === "Draft" && (
            <div className="menu-item px-3">
              <Link
                className="menu-link px-3"
                to="#"
                onClick={openEditModal}
              >
                Edit
              </Link>
            </div>
          )}
          {/* begin::Menu item */}
          <div className='menu-item px-3'>
            <Link
              className='menu-link px-3'
              to='#'
              onClick={openDetailModal}
            >
              Detail
            </Link>
          </div>
          {/* end::Menu item */}
        </div>
      {/* end::Menu */}

        {type === "Warehouse" && (
          <EditLayananModalWarehouse
          supplierId={supplierId}
          show={isEditModalOpen}
          handleClose={closeEditModal}
          layananId={id} // Pass the material ID to the modal
          type={type}
          isCompanyId={isCompanyId}
          isQuotation={isQuotation}
        />)}
        {type === "Supplier" && (
          <EditLayananModal
            supplierId={supplierId}
            show={isEditModalOpen}
            handleClose={closeEditModal}
            layananId={id} // Pass the material ID to the modal
            type={type}
          />)}


      {/* Modal Detail */}
      <DetailLayananModal
      status={status}
        show={isDetailModalOpen}
        handleClose={closeDetailModal}
        layananId={id} // Pass the material ID to the modal
      />
    </>
  );
};

export { LayananActionsCell };