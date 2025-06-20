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
import { EditSupplierModal } from '../../../../../../../masterdata/layanan/components/molecules/modals/EditSupplierModal';
import { EditStockModal } from '../../../molecules/modals/EditStockModal';

type Props = {
    id: ID;
    status: string;
};

const StokActionCell: FC<Props> = ({ id, status }) => {
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

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    // Pastikan id selalu berupa string
    const supplierId = id ? id.toString() : '';


    return (
        <>
            <a
                href='#'
                className='text-left'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                <span className="fs-2">
                    <i className="bi bi-three-dots-vertical d-flex justify-content-center" />
                </span>
            </a>

            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4'
                data-kt-menu='true'
            >
                {/* Tombol Edit */}
                {status === "Draft" && (
                    <div className='menu-item px-3'>
                        <a
                            className='menu-link px-3'
                            onClick={id ? handleOpenEditModal : undefined}
                            style={{ cursor: id ? 'pointer' : 'not-allowed' }}
                        >
                            Edit
                        </a>
                    </div>
                )}

                {/* Tombol Detail */}
                <div className='menu-item px-3'>
                    <a
                        className='menu-link px-3'
                        onClick={id ? handleOpenDetailModal : undefined}
                        style={{ cursor: id ? 'pointer' : 'not-allowed' }}
                    >
                        Detail
                    </a>
                </div>
            </div>

            {/* Modal Detail Supplier */}
            {isDetailModalOpen && (
                <DetailMaterialModal
                status={status}
                    show={isDetailModalOpen}
                    handleClose={handleCloseDetailModal}
                    supplier_id={supplierId}
                />
            )}

            {/* Modal Edit Supplier */}
            {isEditModalOpen && (
        <EditStockModal
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
          supplier_id={supplierId}
        />
      )}
        </>
    );
};

export { StokActionCell };