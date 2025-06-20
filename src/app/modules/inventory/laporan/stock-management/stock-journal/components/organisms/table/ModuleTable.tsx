import { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { KTCardBody } from '@metronic/helpers';
import { usersColumns } from './columns/_columns';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useForm } from 'react-hook-form';
import { useStockJournal } from '../../../core/useContext';

const ModuleTable: React.FC = () => {
    const {
        stockJournalData,
        warehouseOptions,
        selectedWarehouse,
        setSelectedWarehouse,
        startDate,
        endDate,
        totalData,
        isLoading,
        pagination,
        setPagination,
    } = useStockJournal();

    const { control } = useForm();
    const columns = useMemo(() => usersColumns, []);

    const table = useReactTable({
        data: stockJournalData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalData,
        state: { pagination },
    });


    return (
        <KTCardBody className="py-4">
            <div className="table-responsive">
                <div className="position-relative d-flex mb-3" style={{ bottom: '10px' }}>
                    <SelectField
                        name="warehouse"
                        label=""
                        placeholder="Select Warehouse"
                        options={warehouseOptions}
                        control={control}
                        onChange={(value) => {
                            setSelectedWarehouse(value);
                            setPagination({ pageIndex: 0, pageSize: 10 });
                        }}
                    />
                </div>
                <table
                    id="kt_table_users"
                    className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer"
                >
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="text-start text-muted fw-bold fs-7 gs-0"
                            >
                                {headerGroup.headers.map((header) => (
                                    <CustomHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-gray-600">
                        {!selectedWarehouse ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    Please select a warehouse to display data.
                                </td>
                            </tr>
                        ) : isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    Loading....
                                </td>
                            </tr>
                        ) : stockJournalData.length === 0 ? (
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