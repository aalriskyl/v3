import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { LayananRow } from "../../organisms/table/columns/LayananRow";
import { KTCardBody } from "@metronic/helpers";
import { LayananHeaderColumn } from "../../organisms/table/columns/LayananHeaderColumn";
import { layananDetailColumns } from "../../organisms/table/columns/_columnLayananDetail";
import { AddLayananModal } from "../../molecules/modals/AddLayananModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { useLayanan } from "../../molecules/core/LayananContext";

const LayananDetailTableSection = () => {
  const { data, setData, totalData, pagination, setPagination } = useLayanan();

  const columns = useMemo(() => layananDetailColumns, []);

  const table = useReactTable({
    data: data, // Gunakan data yang sudah dipaginasi
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: {
      pagination,
    },
  });
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
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
                    <LayananHeaderColumn key={header.id} header={header} />
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
                  .rows.map((row: Row<any>) => (
                    <LayananRow key={row.id} row={row} />
                  ))
              )}
            </tbody>
          </table>
        </div>
        {/* {status === "Draft" && !isPreOrder && (
          <div
            className="position-absolute"
            style={{ top: "17px", right: "30px" }}
          >
            <button
              className="btn text-primary border border-primary mt-4"
              onClick={toggleModal}
            >
              Tambah Layanan
            </button>
          </div>
        )} */}
        <ListPagination
          total={totalData}
          currentPage={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPageChange={(page) =>
            setPagination({ ...pagination, pageIndex: page })
          }
        />
      </KTCardBody>
      {/* <AddLayananModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
};

export { LayananDetailTableSection };
