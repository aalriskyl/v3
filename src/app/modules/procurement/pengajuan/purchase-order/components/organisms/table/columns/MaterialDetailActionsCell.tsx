/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, QUERIES } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { deleteUser } from '../../../molecules/core/_requests';
import { Link } from 'react-router-dom';
import { DetailMaterialModal } from '../../../molecules/modals/DetailMaterialModal';

// type Props = {
//   id: ID;
//   status: string;
// };

const MaterialDetailActionsCell: FC<any> = ({ id, status }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State untuk mengontrol modal detail

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`],
      });
    },
  });

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true); // Buka modal detail
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false); // Tutup modal detail
  };

  return (
    <>
      <Link
        to="#"
        className="text-left"
        onClick={(e) => {
          e.preventDefault(); // Mencegah navigasi default
          handleOpenDetailModal(); // Buka modal detail
        }}
      >
        <span className="fs-7 text-success">Detail</span>
      </Link>

      {/* Modal Detail */}
      {isDetailModalOpen && (
        <DetailMaterialModal
        status={status}
          show={isDetailModalOpen} // Kontrol tampilan modal
          handleClose={handleCloseDetailModal} // Fungsi untuk menutup modal
          materialId={id} // Kirim ID material ke modal
        />
      )}
    </>
  );
};

export { MaterialDetailActionsCell };