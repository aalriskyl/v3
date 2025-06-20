import { useState, useMemo, useEffect } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
import { materialColumns } from '../../organisms/table/columns/_columnMaterial';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../../../../service/axiosInstance';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useMaterialRequestMaterials } from '../../../../../../pengajuan/manajemen-pengiriman/request-material/core/MaterialRequestMaterialContext';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const MaterialDetailTableSection = ({ supplier_id, status }: any) => {
      const { data, isLoading, pagination, totalData, setPagination, refetchData, error } = useMaterialRequestMaterials()
      const { id } = useParams<{ id: string }>();
    // Function to fetch data
    useEffect(() => {
        refetchData();
    }, [id, pagination.pageIndex, pagination.pageSize]);

    const columns = useMemo(() => materialColumns(supplier_id, refetchData, status), [supplier_id, refetchData, status]);
    const table = useReactTable({
        data: data, // Use the fetched data
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalData,
        state: { pagination },
    });

    {isLoading && (
        <OverlayLoader />
    )}

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
                                    <td colSpan={columns.length} className="text-center">
                                        No data available
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
                <ListPagination
                    total={totalData}
                    currentPage={pagination.pageIndex + 1}
                    pageSize={pagination.pageSize}
                    onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
                />
            </KTCardBody>
        </>
    );
};

export { MaterialDetailTableSection };