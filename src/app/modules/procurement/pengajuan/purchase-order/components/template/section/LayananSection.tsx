import { useState, useMemo, useEffect, useCallback } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { LayananRow } from '../../organisms/table/columns/LayananRow';
import { KTCardBody } from '@metronic/helpers';
import { LayananHeaderColumn } from '../../organisms/table/columns/LayananHeaderColumn';
import { layananColumns } from '../../organisms/table/columns/_columnLayanan';
import { AddLayananModal } from '../../molecules/modals/AddLayananModal';
import { useParams } from 'react-router-dom';
import { getAllServicePo, getSinglePurchaseOrder } from '../../../core/_request';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useServicesPurchaseOrders } from '../../molecules/core/ServicePoContext';

// const defaultPagination = {
//     pageIndex: 0,
//     pageSize: 10,
// };

const LayananTableSection: React.FC<{
    supplierId: string
    status: string;
    type: string;
    isCompanyId: string;
    isQuotation: string;
}> = ({ supplierId, status, type, isCompanyId, isQuotation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [orderData, setOrderData] = useState<any>(null);
    const [quotationData, setQuotationData] = useState<any>(null);
    const { data, isLoading, error, pagination, setPagination, totalData, fetchData } = useServicesPurchaseOrders();


    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            if (id) {
                try {
                    const response = await getSinglePurchaseOrder(id);
                    setOrderData(response.data);
                    setQuotationData(response.data.quotation.id !== null)
                } catch (error) {
                    // console.error('Failed to fetch purchase order:', error);
                }
            }
        };
        fetchPurchaseOrder();
    }, [id]);

   

    const columns = useMemo(() => layananColumns(status, type, supplierId, isCompanyId, isQuotation), [status, type, supplierId, isCompanyId, isQuotation]);

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

    const toggleModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = () => {
        // console.log('Data material berhasil disimpan');
        toggleModal();
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
                                        <LayananHeaderColumn key={header.id} header={header} />
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
                                table.getRowModel().rows.map((row: Row<any>) => (
                                    <LayananRow key={row.id} row={row} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tombol Tambah Layanan */}
                {orderData?.status === "Draft" && quotationData === null && (
    <div className="position-absolute" style={{ top: '17px', right: '30px' }}>
        <button className="btn text-primary border border-primary mt-4" onClick={toggleModal}>
            Tambah Layanan
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

            <AddLayananModal
                isCompanyId={isCompanyId}
                purchaseOrderId={id || ''}
                show={isModalVisible}
                handleClose={closeModal}
                onSuccess={fetchData}
                supplierId={supplierId || ''}
            />
        </>
    );
};

export { LayananTableSection };