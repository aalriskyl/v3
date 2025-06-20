import { useMemo, useState } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { ServiceHeaderColumn } from "./columns/ServiceHeaderColumn";
import { ServiceRow } from "./columns/ServiceRow";
import { coaColumns } from "./columns/_servicecolumns";
import { PaymentTerms, Service } from "../../molecules/core/_models";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { AddTermsModal } from "../../molecules/modals/AddTermsModal";
import { termColumns } from "./columns/_termColumns";
import { PaymentHeaderColumn } from "./columns/PaymentHeaderColumn";
import { PaymentRow } from "./columns/PaymentTerms";
import { usePaymentTerms } from "../../template/SupplierTableLayout";
import { PaymentTermsType } from "../../core/_models";

const TermsTable: React.FC = () => {
  const { paymentTerms: data } = usePaymentTerms();

  const [showAddSupplierModal, setShowAddSupplierModal] =
    useState<boolean>(false);

  const toggleModal = () => {
    setShowAddSupplierModal((prev) => !prev);
  };

  const columns = useMemo(() => termColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <KTCardBody className="py-4 max-w-20">
        <div className="table-responsive">
          <table
            id="kt_table_users"
            className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer"
          >
            <thead>
              {table.getHeaderGroups().map((columnGroup) => (
                <tr
                  key={columnGroup.id}
                  className="text-start fw-bold fs-7 gs-0"
                >
                  {columnGroup.headers.map((header) => (
                    <PaymentHeaderColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-600">
              {table.getRowModel().rows.length > 0 ? (
                table
                  .getRowModel()
                  .rows.map((row: Row<PaymentTermsType>) => (
                    <PaymentRow key={row.id} row={row} />
                  ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="d-flex text-center w-100 align-content-center justify-content-center">
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="position-absolute"
          style={{ top: "90px", right: "60px" }}
        >
          <button
            className="btn text-primary border border-primary mt-4"
            onClick={toggleModal}
          >
            Tambah
          </button>
        </div>
      </KTCardBody>
      {showAddSupplierModal && (
        <AddTermsModal show={showAddSupplierModal} handleClose={toggleModal} />
      )}
    </>
  );
};

export { TermsTable };
