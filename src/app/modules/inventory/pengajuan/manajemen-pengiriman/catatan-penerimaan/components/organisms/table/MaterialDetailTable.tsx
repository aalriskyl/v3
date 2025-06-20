/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MaterialHeaderColumn } from "./columns/MaterialHeaderColumn";
import { MaterialRow } from "./columns/MaterialRow";
import { materialColumns } from "./columns/_materialcolumns";
import { KTCardBody } from "@metronic/helpers";
import { MaterialModel } from "../../molecules/core/_models";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { getAllPurchaseOrderMaterial } from "../../../../../../../procurement/pengajuan/purchase-order/core/_request";
import { getAllRnMaterial } from "../../../core/_request";
import { materialColumnsDetail } from "./columns/_materialcolumnsDetail";
import { Button } from "react-bootstrap";
import { ModalBarcodeScan } from "../../../../catatan-penerimaan/components/molecules/modals/ModalBarcodeScan";
import { useMaterial } from "../../molecules/core/MaterialContext";

const MaterialDetailTable = ({ type }: { type: string }) => {
  const { data, setData, totalData, pagination, setPagination, status } =
    useMaterial();

  const handleMaterialUpdated = () => {};

  const columns = useMemo(
    () => materialColumnsDetail(handleMaterialUpdated, status, type, undefined),
    [handleMaterialUpdated, status, type]
  );

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
    <KTCardBody className="py-4 max-w-20">
      <p style={{ color: "red" }}>
        Jumlah barang harus di edit dan disesuaikan*
      </p>
      <div className="table-responsive">
        <table className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer">
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr key={columnGroup.id} className="text-start fw-bold fs-7 gs-0">
                {columnGroup.headers.map((header) => (
                  <MaterialHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-600">
            {
              table.getRowModel().rows.length > 0 &&
                table
                  .getRowModel()
                  .rows.map((row) => <MaterialRow key={row.id} row={row} />)
              // : (
              //     <tr>
              //         <td colSpan={columns.length}>
              //             <div className='d-flex text-center w-100 align-content-center justify-content-center'>
              //                 {isLoading ? "Memuat data..." : "Belum ada data. Silahkan pilih purchase order."}
              //             </div>
              //         </td>
              //     </tr>
              // )
            }
          </tbody>
        </table>
      </div>

      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex}
        pageSize={pagination.pageSize}
        onPageChange={(page) =>
          setPagination({ ...pagination, pageIndex: page })
        }
      />

      {status === "Draft" && (
        <div
          className="position-absolute"
          style={{ top: "17px", right: "30px" }}
        >
          <Button
            variant="primary"
            // className="btn text-primary  mt-4"
            onClick={toggleModal}
            // disabled={materialRequestData?.length === 0}
          >
            Tambah Jumlah Material 
          </Button> 
        </div>
      )}

      <ModalBarcodeScan
        show={showModal}
        handleClose={toggleModal}
        datamaterial={data}
        setMaterial={setData}
      />
    </KTCardBody>
  );
};

export { MaterialDetailTable };
