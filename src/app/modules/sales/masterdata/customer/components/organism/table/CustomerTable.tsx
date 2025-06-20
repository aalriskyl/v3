import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { Customers } from '../../molecules/core/_models';
import { UsersListLoading } from '../../molecules/loading/UsersListLoading';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { getCustomer } from '../../core/_request';
import { FilterValues } from '../../molecules/header/filters';

interface CustomersTableProps {
  filters: FilterValues;
}

const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const CustomerTable: React.FC<CustomersTableProps> = ({ filters }) => {
  const [data, setData] = useState<Customers[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);

  // Fetch data dengan filter dan pagination
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getCustomer({
          name: filters.name,
          city: filters.city,
          industry: filters.industry,
          status: filters.status,
          search: filters.search,
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
        });

        console.log('API Response:', response.data); // Debugging

        // Handle null or undefined customers
        const customers = response.data.customers || [];
        setData(customers); // Ensure data is always an array
        setTotalData(customers.length > 0 ? response.data.total_page * pagination.pageSize : 0);
      } catch (error) {
        console.error('Gagal memuat data:', error);
        setData([]); // Reset data on error
        setTotalData(0); // Reset total data on error
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
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalData / pagination.pageSize)) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page - 1,
      }));
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0, // Reset ke halaman pertama
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
            {table.getHeaderGroups().map((columnGroup) => (
              <tr 
              key={columnGroup.id} 
              className="text-start text-muted fw-bold fs-7 gs-0"
              >
                {columnGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {isLoading && data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex justify-content-center align-items-center">
                    Memuat data...
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <CustomRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    Tidak ada data yang sesuai
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination dengan total data dari server */}
      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={(page) => setPagination(prev => ({
          ...prev,
          pageIndex: page - 1
        }))}
      />

      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { CustomerTable };
