import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { StockCustomRow } from "../../organisms/table/columns/StockCustomRow";
import { KTCardBody } from "@metronic/helpers";
import { StockHeaderColumn } from "../../organisms/table/columns/StockHeaderColumn";
import { termsOfPaymentColumns } from "../../organisms/table/columns/_columnTermsOfPayment";
import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { ModuleView, PaymentTermsType } from "../../../core/_models";
import { invoiceColumn } from "../../organisms/table/columns/_columnInvoice";
import { useInvoice } from "../../molecules/core/InvoiceContext";

const InvoiceSection = () => {
  const { data, setData, totalData, pagination, setPagination } = useInvoice();

  const columns = useMemo(() => invoiceColumn, []);

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
                  .rows.map((row: Row<PaymentTermsType>) => (
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
          onPageChange={(page) =>
            setPagination({ ...pagination, pageIndex: page })
          }
        />
      </KTCardBody>
      {/* <AddMaterialModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
};

export { InvoiceSection };
