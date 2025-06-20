import React, { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { KTCardBody } from '@metronic/helpers';
import { entryColumns } from './columns/_columns';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useForm } from 'react-hook-form';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { useStockCard } from '../../../core/useContext';

const ModuleTable: React.FC = () => {
    const {
        stockCardData,
        materialOptions,
        warehouseOptions,
        selectedMaterial,
        setSelectedMaterial,
        selectedWarehouse,
        setSelectedWarehouse,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        totalData,
        pagination,
        setPagination,
    } = useStockCard();

    const { control } = useForm();
    const columns = useMemo(() => entryColumns, []);

    const table = useReactTable({
        data: stockCardData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        rowCount: stockCardData.length,
        state: { pagination },
    });

    return (
        <KTCardBody className="py-4">
            <div className="table-responsive">
                <div className="position-relative d-flex mb-3" style={{ bottom: '10px' }}>
                    <div className="me-2 col-md-4">
                        <SelectField
                            name="material"
                            label=""
                            placeholder="Pilih material"
                            options={materialOptions}
                            control={control}
                            onChange={(value) => {
                                setSelectedMaterial(value);
                                setSelectedWarehouse(null);
                                setStartDate('');
                                setEndDate('');
                            }}
                        />
                    </div>
                    <div className="me-2 col-md-4">
                        <SelectField
                            name="warehouse"
                            label=""
                            placeholder="Pilih warehouse (optional)"
                            options={warehouseOptions}
                            control={control}
                            onChange={(value) => setSelectedWarehouse(value)}
                        />
                    </div>
                </div>
                <table id="kt_table_users" className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
                                {headerGroup.headers.map((header) => (
                                    <CustomHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-gray-600">
                        {stockCardData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row: Row<any>) => (
                                <CustomRow key={row.id} row={row} />
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
    );
};

export { ModuleTable };