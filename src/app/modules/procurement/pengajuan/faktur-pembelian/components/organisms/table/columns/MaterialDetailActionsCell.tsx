import { FC, useEffect, useState } from "react";
import { MenuComponent } from "@metronic/assets/ts/components";
import { DetailMaterialModal } from "../../../molecules/modals/DetailMaterialModal";

type Props = {
  id: string;
};

const MaterialDetailActionsCell: FC<Props> = ({ id }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const handleOpenDetailModal = () => {
    if (id) setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
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
        <DetailMaterialModal
          show={isDetailModalOpen}
          handleClose={handleCloseDetailModal}
          materialId={id}
        />
      )}
    </>
  );
};

export { MaterialDetailActionsCell };
