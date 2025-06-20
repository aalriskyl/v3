import { useEffect, useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { layananColumns } from './columns/_columns';
import { Schema } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { getSchemeActive } from '../../../core/_request';

const SkemaTable: React.FC = () => {
  const [data, setData] = useState<Schema[]>([]); // Store filtered data
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  // Fetch data from the API and filter by 'active' status
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSchemeActive('');
        const activeData = response.data?.filter((item: Schema) => item.status === 'active') || [];
        setData(activeData); // Update the state with filtered data
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => layananColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    Loading data...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center text-danger'>
                    {error}
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Schema>) => (
                <CustomRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <ListPagination /> */}
    </KTCardBody>
  );
};

export { SkemaTable };
