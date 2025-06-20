import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { UomHeaderColumn } from './columns/UomHeaderColumn';
import { UomRow } from './columns/UomRow';
import { uomColumns } from './columns/_uomcolumns';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useUomContext } from '../../template/UomTableLayout';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const UomTable: React.FC = () => {
    const { uomData, isLoading, error, totalData, pagination, setPagination } = useUomContext();

    const columns = useMemo(() => uomColumns, []);
    const table = useReactTable({
        data: uomData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalData, // Adjust this if you have pagination logic
        state: { pagination },
    });

    if (isLoading) {
        return (
            <OverlayLoader />
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
                                    <UomHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='text-gray-600'>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <UomRow key={row.id} row={row} />
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
            <ListPagination
                total={totalData} // Adjust this if you have pagination logic
                currentPage={pagination.pageIndex + 1} // Adjust for display
                pageSize={pagination.pageSize}
                onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
            />
        </KTCardBody>
    );
};

export { UomTable };