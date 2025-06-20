import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuComponent } from "@metronic/assets/ts/components";
import { ID, QUERIES } from "@metronic/helpers";
import { useListView } from "../../../molecules/core/ListViewProvider";
import { useQueryResponse } from "../../../molecules/core/QueryResponseProvider";
import { deleteUser } from "../../../molecules/core/_requests";
import { Link } from "react-router-dom";
import { DetailLayananModal } from "../../../molecules/modals/DetailLayananModal";
import { EditLayananModal } from "../../../molecules/modals/EditLayananModal";
import { useServicePayableProvider } from "../../../template/LayananDetailSectionLayout";

type Props = {
  id: string;
};

const LayananDetailActionsCell: FC<Props> = ({ id }) => {
  const { status } = useServicePayableProvider();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true); // Buka modal detail
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false); // Tutup modal detail
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
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
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
        data-kt-menu="true"
      >
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
      {/* Modal Detail */}
      {isDetailModalOpen && (
        <DetailLayananModal
          show={isDetailModalOpen} // Kontrol tampilan modal
          handleClose={handleCloseDetailModal} // Fungsi untuk menutup modal
          layananId={id} // Kirim ID layanan ke modal
        />
      )}{" "}
      {isEditModalOpen && (
        <EditLayananModal
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
          layananId={id}
        />
      )}
    </>
  );
};

export { LayananDetailActionsCell };
