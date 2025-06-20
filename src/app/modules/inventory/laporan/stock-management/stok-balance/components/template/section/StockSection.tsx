import { useMemo, useEffect, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
import { UomSection } from '../../molecules/core/_models';
import { stockColumns } from '../../organisms/table/columns/_columnStock';
import { getAllMaterialStockEntry } from '../../../core/_request';
import { useParams } from 'react-router-dom';

const StockTableSection: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); // Correctly type id as optional
    const [data, setData] = useState<UomSection[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) { // Check if id is present
                setError(new Error('Stock entry ID is required'));
                setIsLoading(false);
                return;
            }

            try {
                const stockEntryMaterials = await getAllMaterialStockEntry(id);
                setData(stockEntryMaterials);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const columns = useMemo(() => stockColumns, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
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
                                    {error.message}
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
        </KTCardBody>
    );
};

export { StockTableSection };