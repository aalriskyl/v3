import { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { KTCardBody } from '@metronic/helpers';
import { usersColumns } from './columns/_columns';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import clsx from 'clsx';
import { useStockLedger } from '../../../core/useContext';

const ModuleTable: React.FC = () => {
    const {
        stockLedgerData,
        warehouseOptions,
        selectedWarehouse,
        setSelectedWarehouse,
        startDate,
        endDate,
        totalData,
        isLoading,
        pagination,
        setPagination,
    } = useStockLedger();

    const columns = useMemo(() => usersColumns, []);

    const table = useReactTable({
        data: stockLedgerData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        rowCount: stockLedgerData.length,
        state: { pagination },
    });

    return (
        <KTCardBody className="py-4">
            <select
                name="warehouse"
                value={selectedWarehouse || ""}
                className={clsx("form-select mb-8")}
                onChange={(e) => {
                    setSelectedWarehouse(e.target.value);
                }}
            >
                <option value={""}>Pilih Gudang</option>
                {warehouseOptions.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.label}
                    </option>
                ))}
            </select>
            <div className="table-responsive">
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
                        {selectedWarehouse.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    Silahkan pilih gudang untuk menampilkan data.
                                </td>
                            </tr>
                        ) : isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    Loading....
                                </td>
                            </tr>
                        ) : stockLedgerData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            table
                                .getRowModel()
                                .rows.map((row: Row<any>) => (
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