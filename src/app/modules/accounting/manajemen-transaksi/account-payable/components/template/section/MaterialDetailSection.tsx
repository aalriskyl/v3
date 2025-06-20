import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { StockCustomRow } from "../../organisms/table/columns/StockCustomRow";
import { KTCardBody } from "@metronic/helpers";
import { StockHeaderColumn } from "../../organisms/table/columns/StockHeaderColumn";
import { materialDetailColumns } from "../../organisms/table/columns/_columnMaterialDetail";
import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { ModuleView } from "../../../core/_models";
import { useMaterialAp } from "../../../core/MaterialAccountPayableContext";
const MaterialDetailTableSection: React.FC<{
    preOrderId: string | undefined;
}> =({ preOrderId }) => {
  const { pagination, setPagination, totalData, data} =
    useMaterialAp()

  // State untuk mengontrol modal
  const [isAddMaterialFailed, setIsAddMaterialFailed] = useState<{
    mesage: string;
    value: boolean;
  }>({
    mesage: "",
    value: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Data tabel
  const columns = useMemo(() => materialDetailColumns, []);

  // Inisialisasi table instance
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: {
      pagination,
  },
  });

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
              {data.length === 0 ? (
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
                            total={totalData}
                            currentPage={pagination.pageIndex + 1}
                            pageSize={pagination.pageSize}
                            onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
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

export { MaterialDetailTableSection };
