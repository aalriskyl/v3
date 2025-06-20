import { useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { KTCardBody } from '@metronic/helpers';
import { usersColumns } from './columns/_columns';
import { dummyUsers } from './dummyUsers';
import { PlanProductionModel } from '../../molecules/core/_models';

interface UsersTableProps {
  searchTerm: string;
}

const ModuleTable: React.FC<UsersTableProps> = ({ searchTerm }) => {
  const data = useMemo(() => dummyUsers, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return data.filter((item: PlanProductionModel) => {
      const searchString = [
        item.tanggal_pengajuan.toString(),
        item.status,
      ].join(' ').toLowerCase();

      return searchString.includes(lowerSearchTerm);
    });
  }, [data, searchTerm]);

  // Define columns
  const columns = useMemo(() => usersColumns, []);

  // Initialize table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
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
            {filteredData.length === 0 ? (
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
    </KTCardBody>
  );
};

export { ModuleTable };