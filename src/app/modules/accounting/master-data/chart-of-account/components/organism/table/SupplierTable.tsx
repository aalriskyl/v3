import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { SupplierHeaderColumn } from './columns/SupplierHeaderColumn';
import { SupplierRow } from './columns/SupplierRow';
import { supplierColumns } from './columns/_suppliercolumns';
import { Supplier } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { getAllServiceSupplierByServiceId } from '../../core/_request';
import { useParams } from 'react-router-dom';
import { AddSupplierModal } from '../../molecules/modals/AddSupplierModal';

const SupplierTable: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [supplierData, setSupplierData] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refetchData, setRefetchData] = useState<boolean>(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getAllServiceSupplierByServiceId(id!);
                setSupplierData(data || []);
            } catch (err) {
                setError('Failed to fetch suppliers data.');
                console.error(err);
            } finally {
                setIsLoading(false);
                setRefetchData(false); // Reset the refetch flag after fetching data
            }
        };

        if (id) {
            fetchData(); // Only fetch data if the ID is available
        }
    }, [id, refetchData]); // Add refetchData as a dependency


    const handleEditSuccess = () => {
        setRefetchData(prev => !prev); // Toggle state to trigger useEffect
    };
    
    const handleSupplierAdded = () => {
        setRefetchData(true);
    };
    const handleAddSupplier = () => {
        setShowAddSupplierModal(true);
    };
    const columns = useMemo(() => supplierColumns, []);
    const table = useReactTable({
        data: supplierData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return (
            <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                {error}
            </div>
        );
    }

    return (
        <KTCardBody className='py-4 max-w-20'>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
                >
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
            <AddSupplierModal
                show={showAddSupplierModal}
                handleClose={() => setShowAddSupplierModal(false)}
                onSubmit={handleSupplierAdded} // Pass the callback function
            />
        </KTCardBody>
    );
};

export { SupplierTable };