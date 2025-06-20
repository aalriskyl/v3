import { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { MaterialHeaderColumn } from './columns/MaterialHeaderColumn';
import { MaterialRow } from './columns/MaterialRow';
import { materialColumns } from './columns/_materialcolumns';
import { KTCardBody } from '@metronic/helpers';
import { MaterialModel } from '../../molecules/core/_models';
import { dummyMaterials } from './dummyUsers';

const MaterialDetailTable: React.FC = () => {
    // Inisialisasi materialData dengan dummyMaterials
    const [materialData, setMaterialData] = useState<MaterialModel[]>(dummyMaterials);

    const columns = useMemo(() => materialColumns, []);
    const table = useReactTable({
        data: materialData,
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
                                    <MaterialHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='text-gray-600'>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <MaterialRow key={row.id} row={row} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8}>
                                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                        Belum ada data. Silahkan tambah data.
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

export { MaterialDetailTable };