import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { SupplierHeaderColumn } from './columns/SupplierHeaderColumn';
import { SupplierRow } from './columns/SupplierRow';
import { supplierColumns } from './columns/_suppliercolumns';
import { KTCardBody } from '@metronic/helpers';
import { AddSupplierModal } from '../../molecules/modals/AddSupplierModal';
import { useSupplier } from '../../template/SupplierTableLayout';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';

const SupplierTable: React.FC = () => {
    const { data, isLoading, error, fetchData, totalData, setPagination, pagination } = useSupplier();
    const [showAddSupplierModal, setShowAddSupplierModal] = useState<boolean>(false);

    const columns = useMemo(() => supplierColumns, []);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleAddSupplier = () => {
        setShowAddSupplierModal(true);
    };

    const handleSupplierAdded = () => {
        fetchData(); // Re-fetch data after a supplier is added
    };

    if (isLoading) {
        return (
            <OverlayLoader />
        );
    }
    if (error) return <div className='d-flex text-center w-100 align-content-center justify-content-center'>{error}</div>;

    return (
        <>
            <KTCardBody className='py-4 max-w-20'>
                <div className='table-responsive'>
                    <table className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'>
                        <thead>
                            {table.getHeaderGroups().map((columnGroup) => (
                                <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                                    {columnGroup.headers.map((header) => (
                                        <SupplierHeaderColumn key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='text-gray-600'>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <SupplierRow key={row.id} row={row} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8}>
                                        <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                            Belum ada data. Silahkan tambah data.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='position-absolute' style={{ top: '17px', right: '30px' }}>
                    <button onClick={handleAddSupplier} className="btn text-primary border border-primary mt-4">
                        Tambah
                    </button>
                </div>
                <ListPagination
                        total={totalData}
                        currentPage={pagination.pageIndex + 1}
                        pageSize={pagination.pageSize}
                        onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
                      />
            </KTCardBody>

            <AddSupplierModal
                show={showAddSupplierModal}
                handleClose={() => setShowAddSupplierModal(false)}
                onSubmit={handleSupplierAdded} // Pass the callback function
            />
        </>
    );
};

export { SupplierTable };