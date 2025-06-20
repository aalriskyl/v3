import { useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
import { stockColumns } from '../../organisms/table/columns/_columnStock';
import { AddStockModal } from '../../molecules/modals/AddStockModal';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useMaterialEntryStocks } from '../../molecules/core/MaterialEntryStockContext';

const StockTableSection = ({ status, materialData, setMaterialData }: any) => {
    const {
        data,
        totalData,
        isLoading,
        error,
        pagination,
        setPagination,
        fetchData
    } = useMaterialEntryStocks();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const columns = useMemo(() => stockColumns(status), [status]);

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
        setIsModalVisible(!isModalVisible);
    };

    const handleAddMaterial = async () => {
        await fetchData(); // refetch data setelah tambah material
    };

    return (
        <>
            <KTCardBody className="py-4">
                <div className="table-responsive">
                    <table id="kt_table_users" className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer">
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center text-danger">
                                        {error}
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        Data belum ada, tambahkan data
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row: Row<any>) => (
                                    <StockCustomRow key={row.id} row={row} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {status === "Draft" && (
                    <div className="position-absolute" style={{ top: '43px', right: '30px' }}>
                        <button
                            className="btn text-primary border border-primary mt-4"
                            onClick={toggleModal}
                        >
                            Tambah Material
                        </button>
                    </div>
                )}

                <ListPagination
                    total={totalData}
                    currentPage={pagination.pageIndex + 1} // adjust for display
                    pageSize={pagination.pageSize}
                    onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
                />
            </KTCardBody>

            {isModalVisible && (
                <AddStockModal
                    show={isModalVisible}
                    handleClose={toggleModal}
                    onAddMaterial={handleAddMaterial} // Pass the callback function
                    materialData={materialData}
                    setMaterialData={setMaterialData}
                />
            )}
        </>
    );
};

export { StockTableSection };
