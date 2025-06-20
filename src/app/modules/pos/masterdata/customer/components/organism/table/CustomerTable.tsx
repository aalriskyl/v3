/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useEffect, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { Customer } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { getCostumer } from '../../core/_request';

interface CustomerTableProps {
  searchTerm: string;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ searchTerm }) => {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [_filteredCategories, setFilteredCategories] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCostumer();
        setCustomer(data || []);
        setFilteredCategories(data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCustomer([]);
        setFilteredCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  // useEffect(() => {
  //   if (searchTerm) {
  //     const filtered = customer.filter((customer) =>
  //       customer.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       customer.product_type_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredCategories(filtered);
  //   } else {
  //     setFilteredCategories(Customer);
  //   }
  // }, [searchTerm, Customer]);


  const filteredData = useMemo(() => customer.filter((item) => item.status === true), [customer]);
  const columns = useMemo(() => usersColumns, [])
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <KTCardBody className="py-4 max-w-20">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table
            id="kt_table_users"
            className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer"
          >
            <thead>
              {table.getHeaderGroups().map((columnGroup) => (
                <tr key={columnGroup.id} className="text-start fw-bold fs-7 gs-0">
                  {columnGroup.headers.map((header) => (
                    <CustomHeaderColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-600">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row: Row<Customer>) => (
                  <CustomRow key={row.id} row={row} />
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="d-flex text-center w-100 align-content-center justify-content-center">
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* <ListPagination /> */}
    </KTCardBody>
  );
};

export { CustomerTable };
