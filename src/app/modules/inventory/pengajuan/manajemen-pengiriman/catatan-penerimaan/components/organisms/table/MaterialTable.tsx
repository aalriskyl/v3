import { useState, useMemo, useEffect } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { MaterialHeaderColumn } from './columns/MaterialHeaderColumn';
import { MaterialRow } from './columns/MaterialRow';
import { materialColumns } from './columns/_materialcolumns';
import { KTCardBody } from '@metronic/helpers';
import { MaterialModel } from '../../molecules/core/_models';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { getAllPurchaseOrderMaterial } from '../../../../../../../procurement/pengajuan/purchase-order/core/_request';

const defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
};

interface MaterialTableProps {
    type: string;
    purchaseOrderId: string | null;
    // receivedNoteId: string | undefined;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ type, purchaseOrderId, }) => {
    const [materialData, setMaterialData] = useState<MaterialModel[]>([]);
    const [pagination, setPagination] = useState(defaultPagination);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleMaterialUpdated = () => {
        fetchMaterials(); // Refetch data after a successful edit
    };

    const fetchMaterials = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!purchaseOrderId) {
                setMaterialData([]);
                return;
            }

            const response = await getAllPurchaseOrderMaterial(purchaseOrderId);
            const dataArray = Array.isArray(response) ? response : response?.data.purchase_order_materials || [];
            setMaterialData(dataArray);
        } catch (error) {
            console.error('Fetch error:', error);
            setMaterialData([]);
            setError("Failed to load materials");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, [purchaseOrderId]);

    // Pass the callback to the columns
    const columns = useMemo(() => materialColumns(handleMaterialUpdated, type), [type, handleMaterialUpdated]);

    const paginatedData = useMemo(() => {
        const safeData = Array.isArray(materialData) ? materialData : [];
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return safeData.slice(start, end);
    }, [materialData, pagination.pageIndex, pagination.pageSize]);

    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <KTCardBody className='py-4 max-w-20'>
            <div className='table-responsive'>
                <table className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'>
                    <thead>
                        {table.getHeaderGroups().map(columnGroup => (
                            <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                                {columnGroup.headers.map(header => (
                                    <MaterialHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='text-gray-600'>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => <MaterialRow key={row.id} row={row} />)
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                        {isLoading ? "Memuat data..." : "Belum ada data. Silahkan pilih purchase order."}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <div className="position-absolute" style={{ top: '17px', right: '30px' }}>
                        {/* <button
                            className="btn text-primary border border-primary mt-4"
                            // onClick={openModal}
                        >
                            Scan Barcode
                        </button> */}
                    </div>
                </table>
            </div>

            <ListPagination
                total={materialData.length}
                currentPage={pagination.pageIndex + 1}
                pageSize={pagination.pageSize}
                onPageChange={(page) => setPagination(prev => ({ ...prev, pageIndex: page - 1 }))}
            />
        </KTCardBody>
    );
};

export { MaterialTable };