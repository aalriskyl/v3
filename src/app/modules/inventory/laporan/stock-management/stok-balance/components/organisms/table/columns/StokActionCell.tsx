import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, QUERIES } from '@metronic/helpers';
import { useListView } from '../../../molecules/core/ListViewProvider';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { deleteUser } from '../../../molecules/core/_requests';
import { getSingleStockEntryMaterial } from '../../../../core/_request';
// import { EditSupplierModal } from '../../../molecules/modals/EditSupplierModal';
import { DetailMaterialModal } from '../../../molecules/modals/DetailMaterialModal';

type Props = {
    id: ID;
};

const StokActionCell: FC<Props> = ({ id }) => {
    const { setItemIdForUpdate } = useListView();
    const { query } = useQueryResponse();
    const queryClient = useQueryClient();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    const openEditModal = () => {
        setItemIdForUpdate(id);
    };

    const deleteItem = useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${QUERIES.USERS_LIST}-${query}`],
            });
        },
    });

    const handleOpenDetailModal = () => {
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
    };

/*     const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    }; */

    // Pastikan id selalu berupa string
    const supplierId = id ? id.toString() : '';

    return (
        <>
            <a
                className='fs-7 text-success'
                onClick={id ? handleOpenDetailModal : undefined}
                style={{ cursor: id ? 'pointer' : 'not-allowed' }}
            >
                Detail
            </a>

            {/* Modal Detail Supplier */}
            {isDetailModalOpen && (
                <DetailMaterialModal
                    show={isDetailModalOpen}
                    handleClose={handleCloseDetailModal}
                    supplier_id={supplierId}
                />
            )}

            {/* Modal Edit Supplier */}
            {/* {isEditModalOpen && (
        <EditSupplierModal
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
          supplier_id={supplierId}
        />
      )} */}
        </>
    );
};

export { StokActionCell };