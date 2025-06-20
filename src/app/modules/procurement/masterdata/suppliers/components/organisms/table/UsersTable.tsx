import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { KTCardBody } from '@metronic/helpers';
import { Suppliers } from '../../molecules/core/_models';
import { usersColumns } from './columns/_columns';
import { getSuppliers } from '../../../core/_request';
import { UsersListLoading } from '@metronic/layout/components/form/components/loading/UsersListLoading';
import { FilterValues } from '../../molecules/header/filters';

interface UsersTableProps {
  filters: FilterValues;
}

const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const UsersTable: React.FC<UsersTableProps> = ({ filters }) => {
  const [data, setData] = useState<Suppliers[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getSuppliers({
          name: filters.name,
          city: filters.city,
          industry: filters.industry,
          status: filters.status,
          search: filters.search,
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
        });

        setData(response.data.suppliers || []);
        setTotalData(response.data.total_page * pagination.pageSize || 0);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
        setData([]);
        setTotalData(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, pagination.pageIndex, pagination.pageSize]);

  const columns = useMemo(() => usersColumns, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0, // Reset to first page
    }));
  };

  return (
    <KTCardBody className="py-4 max-w-20">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-border-dashed table-bordered fs-6 gy-2 dataTable no-footer"
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
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex justify-content-center align-items-center">
                    Memuat data...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-danger">
                  {error.message || 'Terjadi kesalahan'}
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
                  <td colSpan={columns.length}>
                    <div className="d-flex text-center w-100 align-content-center justify-content-center">
                      Tidak ada data yang sesuai
                    </div>
                  </td>
            ) : (
              table.getRowModel().rows.map((row) => (
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
        onPageChange={(page) =>
          setPagination((prev) => ({
            ...prev,
            pageIndex: page - 1,
          }))
        }
      />

      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { UsersTable };