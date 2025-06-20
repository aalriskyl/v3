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
import { useServiceSalesOrder } from "../../../template/LayananDetailSectionLayout";

type Props = {
  id: string;
};

const LayananDetailActionsCell: FC<Props> = ({ id }) => {
  const { status } = useServiceSalesOrder();
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
      <span
        className="fs-7 text-success"
        onClick={handleOpenDetailModal}
        style={{ cursor: id ? "pointer" : "not-allowed" }}
      >
        Detail
      </span>
      {/* Modal Detail */}
      {isDetailModalOpen && (
        <DetailLayananModal
          show={isDetailModalOpen} // Kontrol tampilan modal
          handleClose={handleCloseDetailModal} // Fungsi untuk menutup modal
          layananId={id} // Kirim ID layanan ke modal
        />
      )}
    </>
  );
};

export { LayananDetailActionsCell };
