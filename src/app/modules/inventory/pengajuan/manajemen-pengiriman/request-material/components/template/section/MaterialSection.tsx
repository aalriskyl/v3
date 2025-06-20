/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { StockCustomRow } from '../../organisms/table/columns/StockCustomRow';
import { KTCardBody } from '@metronic/helpers';
import { StockHeaderColumn } from '../../organisms/table/columns/StockHeaderColumn';
import { materialColumnsModified } from '../../organisms/table/columns/_columnMaterial';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';


const defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
};


const MaterialTableSection = ({ materialRequestData, materialChoice, setMaterialChoice }: any) => {
    // State untuk mengontrol modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataListMaterial, setDataListMaterial] = useState([]) as any
     const [pagination, setPagination] = useState(defaultPagination);

    // Data tabel
    const columns = useMemo(() => materialColumnsModified, []);

    const table = useReactTable({
        data: useMemo(() => {
            const start = pagination.pageIndex * pagination.pageSize;
            const end = start + pagination.pageSize;
            return dataListMaterial.slice(start, end);
        }, [dataListMaterial, pagination]),
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true, // biar pagination dikelola sendiri
        rowCount: dataListMaterial.length,
        state: {
            pagination
        },
        meta: {
            onDelete: (id: any) => {
                setMaterialChoice(materialChoice.filter((item: any) => item.id !== id));
            }
        }
    });


    // Fungsi toggle modal
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const data = materialChoice.map((item: any) => ({
            id: item.id, // ID dari materialChoice
            material: item.material.name,
            uom: item.uom.name,
            quantity: item.quantity,
        }));
        setDataListMaterial(data);
    }, [materialChoice]);

    // Fungsi untuk menangani submit dari modal
    const handleSubmit = (data: any) => {    
        const newItem = { ...data, id: Date.now() }; // Generate unique ID
        setMaterialChoice([...materialChoice, newItem]);
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
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
                                    {headerGroup.headers.map((header) => (
                                        <StockHeaderColumn key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-gray-600">
                            {dataListMaterial   .length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row: Row<any>) => (
                                    <StockCustomRow key={row.id} row={row} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tombol Tambah Material */}
                <div className="position-absolute" style={{ top: '17px', right: '30px' }}>
                    <button
                        className="btn text-primary border border-primary mt-4"
                        onClick={toggleModal}
                        disabled={materialRequestData?.length === 0}
                    >
                        Tambah Material
                    </button>
                </div>
                <ListPagination
                    total={dataListMaterial.length}
                    currentPage={pagination.pageIndex + 1}
                    pageSize={pagination.pageSize}
                    onPageChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
                />

            </KTCardBody>

            {/* Modal Tambah Material */}
            {/* <AddMaterialModal
                // materialRequestData={materialRequestData}
                suppier_id
                show={isModalVisible}
                handleClose={toggleModal}
                onSubmit={handleSubmit}
            /> */}
        </>
    );
};

export { MaterialTableSection };