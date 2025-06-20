/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderGoodsColumn } from './columns/CustomHeaderGoods';
import { GoodsCustomRow } from './columns/GoodsCustomRow';
import { finishGoodsColumns } from './columns/_varianGoodsColumn';
import { KTCardBody } from '@metronic/helpers';
// import { FinishGoods } from '../../molecules/core/_models';

// const dummyFinishGoodsData = [
//     {
//         id: 1,
//         namaFinishGoods: 'Produk A',
//         hargaJual: '50000',
//         sku: 'SKU-001',
//         ekspetasiJumlahHasil: '100',
//     },
//     {
//         id: 2,
//         namaFinishGoods: 'Produk B',
//         hargaJual: '75000',
//         sku: 'SKU-002',
//         ekspetasiJumlahHasil: '150',
//     },
//     {
//         id: 3,
//         namaFinishGoods: 'Produk C',
//         hargaJual: '65000',
//         sku: 'SKU-003',
//         ekspetasiJumlahHasil: '200',
//     },
//     {
//         id: 4,
//         namaFinishGoods: 'Produk D',
//         hargaJual: '120000',
//         sku: 'SKU-004',
//         ekspetasiJumlahHasil: '300',
//     },
//     {
//         id: 5,
//         namaFinishGoods: 'Produk E',
//         hargaJual: '95000',
//         sku: 'SKU-005',
//         ekspetasiJumlahHasil: '250',
//     },
// ];

const FinishGoodsTable = ({variantFinishGoodsData}: any) => {
    const columns = useMemo(() => finishGoodsColumns, []);
    const table = useReactTable({
        data: variantFinishGoodsData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <KTCardBody className='py-4 w-100 p-0'>
            <div className='table-responsive'>
                <table
                    id='kt_table_uom'
                    className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
                >
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className='text-start fw-bold fs-7 gs-0'>
                                {headerGroup.headers.map((header) => (
                                    <CustomHeaderGoodsColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className='text-gray-600'>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <GoodsCustomRow key={row.id} row={row} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                        Belum ada data. Silahkan tambah data.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </KTCardBody>
    );
};

export { FinishGoodsTable };