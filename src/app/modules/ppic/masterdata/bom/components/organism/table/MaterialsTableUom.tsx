    /* eslint-disable @typescript-eslint/no-explicit-any */
    import React, { useEffect, useMemo, useState } from 'react';
    import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
    import { CustomHeaderMaterial } from './columns/CustomHeaderMaterial';
    import { UomCustomRowMaterial } from './columns/UomCustomRowMaterial';
    import { materialColumns } from './columns/_materialcolumns';
    import { KTCardBody } from '@metronic/helpers';

    interface VariantMaterialTableProps {
        materialDataChoice: any[]
        onDelete: (index: number) => void
      }
      

    const VariantMaterialUomTable: React.FC<VariantMaterialTableProps> = ({ materialDataChoice, onDelete })=> {


        const [dataTableMaterial, setDataTableMaterial] = useState([]);

        useEffect(() => {
            const dummyData: any = materialDataChoice.map((item: any, index: any) => ({
                id: index + 1,  // Memberikan id unik berdasarkan index
                material: item.material.name,  // Bisa diganti dengan nama jika tersedia
                satuan_uom: item.uom.name,  // Mengambil nama satuan dari UOM
                jumlah_material: parseInt(item.quantity, 10),  // Konversi string ke number
                supplier: item.supplier.name  // Ambil nama supplier
            }));

            setDataTableMaterial(dummyData);  // Memasukkan hasil transformasi ke state
        }, [materialDataChoice]);  // Dependency array untuk memastikan efek berjalan saat data berubah


        const columns = useMemo(() => materialColumns, []);
        const table = useReactTable({
            data: dataTableMaterial,
            columns,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                onDelete: onDelete
            }
        });

        return (
            <KTCardBody className='py-4 w-100 p-0'>
                <div className='table-responsive'>
                    <table
                        id='kt_table_uom'
                        className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
                    >
                        <thead>
                            {table.getHeaderGroups().map((columnGroup) => (
                                <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                                    {columnGroup.headers.map((header) => (
                                        <CustomHeaderMaterial key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='text-gray-600'>
                            {table.getRowModel().rows.map((row: Row<any>) => (
                                <UomCustomRowMaterial key={row.id} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        );
    };


    export { VariantMaterialUomTable };
