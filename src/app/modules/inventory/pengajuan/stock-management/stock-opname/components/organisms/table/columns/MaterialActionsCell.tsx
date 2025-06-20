import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuComponent } from "@metronic/assets/ts/components";
import { ID, QUERIES } from "@metronic/helpers";
import { useListView } from "../../../molecules/core/ListViewProvider";
import { useQueryResponse } from "../../../molecules/core/QueryResponseProvider";
import { deleteUser } from "../../../molecules/core/_requests";

import { useLocation } from "react-router-dom";
import { DetailMaterialModal } from "../../../molecules/modals/DetailMaterialModal";
import { EditMaterialModal } from "../../../molecules/modals/EditMaterialModal";
import { useMaterialOpname } from "../../../template/MaterialTableLayout";

type Props = {
  id: ID;
};

const MaterialActionsCell: FC<Props> = ({ id }) => {
  const { status } = useMaterialOpname();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

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

  // Ensure id is always a string
  const materialId = id ? id.toString() : "";
  console.log({ materialId2: materialId });

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

      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
        data-kt-menu="true"
      >
        {/* Edit Button */}
        {status === "Draft" && (
          <div className="menu-item px-3">
            <a
              className="menu-link px-3"
              onClick={id ? handleOpenEditModal : undefined}
              style={{ cursor: id ? "pointer" : "not-allowed" }}
            >
              Edit
            </a>
          </div>
        )}

        {/* Detail Button */}
        <div className="menu-item px-3">
          <a
            className="menu-link px-3"
            onClick={id ? handleOpenDetailModal : undefined}
            style={{ cursor: id ? "pointer" : "not-allowed" }}
          >
            Detail
          </a>
        </div>
      </div>

      {isDetailModalOpen && (
        <DetailMaterialModal
          show={isDetailModalOpen}
          handleClose={handleCloseDetailModal}
          id={materialId} // Pass the id prop
        />
      )}

      {isEditModalOpen && (
        <EditMaterialModal
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
          id={materialId} // Pass the id prop
        />
      )}
    </>
  );
};

export { MaterialActionsCell };
