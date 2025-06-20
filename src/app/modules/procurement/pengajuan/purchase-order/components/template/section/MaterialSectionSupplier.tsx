import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
import { materialColumnsWarehouse } from '../../organisms/table/columns/_columnMaterialWarehouse';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { useParams } from 'react-router-dom';
import { EditMaterialModalWarehouse } from '../../molecules/modals/EditMaterialModalWarehouse';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useMaterialPurchaseOrders } from '../../molecules/core/MaterialPoContext';
import { getSinglePurchaseOrder } from '../../../core/_request';
import { AddMaterialModalSupplier } from '../../molecules/modals/AddMaterialModalSupplier';
import { materialColumnsSupplier } from '../../organisms/table/columns/_columnMaterialSupplier';

const MaterialTableSectionSupplier: React.FC<{
    status: string;
    supplierId: string;
}> = ({ status, supplierId}) => {
    const { id } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const { data, isLoading, error, pagination, setPagination, totalData, fetchData } = useMaterialPurchaseOrders();
    const columns = useMemo(() => materialColumnsSupplier(status), [status]);


    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            if (id) {
                try {
                    const response = await getSinglePurchaseOrder(id);
                    setOrderData(response.data);
                } catch (error) {
                    // console.error('Failed to fetch purchase order:', error);
                }
            }
        };
        fetchPurchaseOrder();
    }, [id]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalData,
        state: {
            pagination,
        },
    });

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const handleAddSuccess = () => {
        fetchData();
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <KTCardBody className="py-4">
                <div className="table-responsive">
                    <table
                        id="kt_table_users"
                        className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer"
                    >
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
                                    {headerGroup.headers.map((header) => (
                                        <StockHeaderColumn key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-gray-600">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={table.getAllColumns().length} className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <StockCustomRow key={row.id} status="Draft" row={row} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add Material Button */}
                {orderData?.status === "Draft" && orderData?.material_request_id == null && (
                    <div className="position-absolute" style={{ top: '17px', right: '30px' }}>
                        <button
                            className="btn text-primary border border-primary mt-4"
                            onClick={openModal}
                        >
                            Tambah Material
                        </button>
                    </div>
                )}

                {/* Pagination */}
                <ListPagination
                    total={totalData}
                    currentPage={pagination.pageIndex + 1}
                    pageSize={pagination.pageSize}
                    onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
                />
            </KTCardBody>

            {/* Add Material Modal */}
            <AddMaterialModalSupplier
                show={isModalVisible}
                purchaseOrderId={id || ''}
                handleClose={closeModal}
                onSuccess={handleAddSuccess}
                supplierId={supplierId}
            />
        </>
    );
};

export { MaterialTableSectionSupplier };