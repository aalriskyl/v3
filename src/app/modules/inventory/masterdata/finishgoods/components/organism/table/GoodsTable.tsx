import { useMemo, useState, useEffect } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { Goods } from '../../molecules/core/_models';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
import { KTCardBody } from '@metronic/helpers';
import { getFinishGoods } from '../../../core/_request';

const GoodsTable: React.FC = () => {
  // State to hold the data
  const [data, setData] = useState<Goods[]>([]);

  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await getFinishGoods() || [];
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => usersColumns, []);

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
                <td colSpan={6} className='text-center'>
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<Goods>) => (
                <CustomRow key={row.id} row={row} />
              ))
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

export { GoodsTable };