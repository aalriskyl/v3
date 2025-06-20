import { useState, useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
// import { dummyMaterials } from '../../organisms/table/dummyUsers';
import { materialDetailColumns } from '../../organisms/table/columns/_columnMaterialDetail';

const MaterialDetailTableSection: React.FC = () => {
    // State untuk mengontrol modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Data tabel
    // const data = useMemo(() => dummyMaterials, []);
    const columns = useMemo(() => materialDetailColumns, []);

    // Inisialisasi table instance
    // const table = useReactTable({
    //     data,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    // });

    // Fungsi toggle modal
    const toggleModal = () => {
        setIsModalVisible(false);
    };

    // Fungsi untuk menangani submit dari modal
    const handleSubmit = () => {
        // Tambahkan logika untuk menyimpan data material di sini
        // console.log('Data material berhasil disimpan');

        // Tutup modal setelah submit
        toggleModal();
    };

    return (
        <>
            <KTCardBody className="py-4">
                <div className="table-responsive">
                    <table
                        id="kt_table_users"
                        className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer"
                    >
                        <thead>
                            {/* {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
                                    {headerGroup.headers.map((header) => (
                                        <StockHeaderColumn key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))} */}
                        </thead>
                        <tbody className="text-gray-600">
                            {/* {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row: Row<any>) => (
                                    <StockCustomRow key={row.id} row={row} />
                                ))
                            )} */}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        </>
    );
};

export { MaterialDetailTableSection };