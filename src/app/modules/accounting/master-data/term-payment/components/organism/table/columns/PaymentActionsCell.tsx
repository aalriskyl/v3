import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuComponent } from "../../../../../../../../../_metronic/assets/ts/components";
import { ID, QUERIES } from "../../../../../../../../../_metronic/helpers";
import { useListView } from "../../../molecules/core/ListViewProvider";
import { useQueryResponse } from "../../../molecules/core/QueryResponseProvider";
import { deleteUser } from "../../../molecules/core/_requests";
import { Link } from "react-router-dom";
import { AddTermsModal } from "../../../molecules/modals/AddTermsModal";
import { DetailSupplierModal } from "../../../molecules/modals/DetailSupplierModal";
import { EditTermsModal } from "../../../molecules/modals/EditTermsModal";

type Props = {
  id: ID;
};

const PaymentActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

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
        className="mmenu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a
            className="menu-link px-3"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a
            className="menu-link px-3"
            onClick={() => setIsDetailModalOpen(true)} // Open detail modal
          >
            Detail
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}

      {/* Modal for editing payment terms */}
      <AddTermsModal
        show={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />
      <EditTermsModal
        show={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        id={id as any}
      />

      {/* Modal for viewing supplier details */}
      <DetailSupplierModal
        show={isDetailModalOpen}
        handleClose={() => setIsDetailModalOpen(false)}
        supplier_id={id}
      />
    </>
  );
};

export { PaymentActionsCell };
