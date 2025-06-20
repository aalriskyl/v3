import { useMemo, useState, useEffect } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { customColumn } from './columns/_columns';
import { ItemBundling } from '../../molecules/core/_models';
import { KTCardBody } from '@metronic/helpers';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { getItemBundling } from '../../core/_request';

const ItemTable: React.FC = () => {
  const [data, setData] = useState<ItemBundling[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await getItemBundling();
        console.log('Fetched data:', fetchedData);
        setData(fetchedData || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => customColumn, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
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
              <tr>
                <td colSpan={6}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    Loading...
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <ListPagination /> */}
      </KTCardBody>
    );
  }

  if (error) {
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
              <tr>
                <td colSpan={6}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    {error}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <ListPagination /> */}
      </KTCardBody>
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
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<ItemBundling>) => {
                return <CustomRow key={row.id} row={row} />;
              })
            ) : (
              <tr>
                <td colSpan={6}>
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

export { ItemTable };