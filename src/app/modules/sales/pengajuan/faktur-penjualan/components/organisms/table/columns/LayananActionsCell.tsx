import { FC, useEffect, useState } from "react";
import { MenuComponent } from "@metronic/assets/ts/components";
import { ID } from "@metronic/helpers";
import { useListView } from "../../../molecules/core/ListViewProvider";
import { Link } from "react-router-dom";
import { DetailLayananModal } from "../../../molecules/modals/DetailLayananModal";
import { EditLayananModal } from "../../../molecules/modals/EditLayananModal";

type Props = {
  id: string;
};

const LayananActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id as any);
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
        type="button"
        className="btn btn-icon text-left"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        aria-label="Actions"
      >
        <i className="bi bi-three-dots-vertical d-flex justify-content-center" />
      </button>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <Link className="menu-link px-3" to="#" onClick={openEditModal}>
            Edit
          </Link>
        </div>
        {/* end::Menu item */}
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <Link className="menu-link px-3" to="#" onClick={openDetailModal}>
            Detail
          </Link>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}

      {/* Modal Edit */}
      <EditLayananModal
        show={isEditModalOpen}
        handleClose={closeEditModal}
        layananId={id} // Pass the material ID to the modal
      />

      {/* Modal Detail */}
      <DetailLayananModal
        show={isDetailModalOpen}
        handleClose={closeDetailModal}
        layananId={id} // Pass the material ID to the modal
      />
    </>
  );
};

export { LayananActionsCell };
