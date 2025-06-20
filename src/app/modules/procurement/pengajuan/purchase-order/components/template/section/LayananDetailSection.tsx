import { useState, useMemo } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { LayananRow } from '../../organisms/table/columns/LayananRow';
import { KTCardBody } from '@metronic/helpers';
import { LayananHeaderColumn } from '../../organisms/table/columns/LayananHeaderColumn';
// import { dummyLayanan } from '../../organisms/table/dummyUsers';
import { layananDetailColumns } from '../../organisms/table/columns/_columnLayananDetail';

const LayananDetailTableSection: React.FC = () => {
    // State untuk mengontrol modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Data tabel
    // const data = useMemo(() => dummyLayanan, []);
    const columns = useMemo(() => layananDetailColumns, []);

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
                                        <LayananHeaderColumn key={header.id} header={header} />
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
                                    <LayananRow key={row.id} row={row} />
                                ))
                            )} */}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        </>
    );
};

export { LayananDetailTableSection };