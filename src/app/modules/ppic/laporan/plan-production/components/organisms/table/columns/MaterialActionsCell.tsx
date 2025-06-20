import { FC, useEffect, useState } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID } from '@metronic/helpers';
// import { useListView } from '../../../molecules/core/ListViewProvider';
// import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
// import { deleteUser } from '../../../molecules/core/_requests';
// import { Link, useNavigate } from 'react-router-dom';
import { DetailMaterialModal } from '../../../molecules/modals/DetailMaterialModal';

type Props = {
  id: ID; // ID bisa berupa string, number, atau null/undefined
};

const MaterialActionsCell: FC<Props> = ({ id }) => {
/*   const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient(); */
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State untuk mengontrol modal detail

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);


  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true); // Buka modal detail
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false); // Tutup modal detail
  };

  return (
    <>
      {/* Tombol atau link untuk membuka modal detail */}
      <button
        type="button"
        className="text-left"
        onClick={handleOpenDetailModal}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span className="fs-7 text-success">Detail</span>
      </button>

      {/* Modal Detail */}
      <DetailMaterialModal
        show={isDetailModalOpen}
        handleClose={handleCloseDetailModal}
        id={id?.toString() ?? ''} // Gunakan optional chaining dan fallback value
      />
    </>
  );
};

export { MaterialActionsCell };