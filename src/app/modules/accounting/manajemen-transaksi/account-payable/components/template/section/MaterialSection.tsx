import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { StockCustomRow } from "../../organisms/table/columns/StockCustomRow";
import { KTCardBody } from "@metronic/helpers";
import { StockHeaderColumn } from "../../organisms/table/columns/StockHeaderColumn";
import { materialColumns } from "../../organisms/table/columns/_columnMaterial";
import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { ModuleView } from "../../../core/_models";

const defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
};

const MaterialTableSection = ({
    materialChoice,
    setMaterialChoice,
}: any) => {
    const [pagination, setPagination] = useState(defaultPagination);
    const [totalData, setTotalData] = useState<number>(materialChoice.length);

    // State untuk mengontrol modal
    const [isAddMaterialFailed, setIsAddMaterialFailed] = useState<{
        mesage: string;
        value: boolean;
    }>({
        mesage: "",
        value: false,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Dummy data for material choices
    const dummyMaterialChoice: ModuleView[] = [
        {
            id: 1,
            material: "Material A",
            jumlah: 10,
            satuan_uom: "Pcs",
            harga: 100000,
        },
        {
            id: 2,
            material: "Material B",
            jumlah: 10,
            satuan_uom: "Pcs",
            harga: 100000,
        },
        {
            id: 3,
            material: "Material C",
            jumlah: 10,
            satuan_uom: "Pcs",
            harga: 100000,
        },
    ];

    // Data tabel
    const columns = useMemo(() => materialColumns, []);

    // Inisialisasi table instance
    const table = useReactTable({
        data: dummyMaterialChoice,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalData,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
    });

    // Fungsi toggle modal
    const toggleModal = () => {
        setIsModalVisible((prev) => !prev);
    };

    // Fungsi untuk menangani submit dari modal
    const handleSubmit = async (data: any) => {
        console.log("Data material berhasil disimpan", data);
    };

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: page,
        }));
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
                                <tr
                                    key={headerGroup.id}
                                    className="text-start text-muted fw-bold fs-7 gs-0"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <StockHeaderColumn key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-gray-600">
                            {dummyMaterialChoice.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                table
                                    .getRowModel()
                                    .rows.map((row: Row<ModuleView>) => (
                                        <StockCustomRow key={row.id} row={row} />
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <div
          className="position-absolute"
          style={{ top: "17px", right: "30px" }}
        >
          <button
            className="btn text-primary border border-primary mt-4"
            onClick={toggleModal}
          >
            Tambah Material
          </button>
        </div> */}

                <ListPagination
                    total={totalData} // Total data count
                    currentPage={pagination.pageIndex} // Current page (0-based index)
                    pageSize={pagination.pageSize} // Current page size
                    onPageChange={handlePageChange} // Page change handler
                />
            </KTCardBody>
            {/* <AddMaterialModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      /> */}

            {isAddMaterialFailed.value && (
                <FailedModal
                    closeModal={() => {
                        setIsAddMaterialFailed((prev) => ({ mesage: "", value: false }));
                    }}
                    message={isAddMaterialFailed.mesage || "Failed to create material"}
                />
            )}
        </>
    );
};

export { MaterialTableSection };