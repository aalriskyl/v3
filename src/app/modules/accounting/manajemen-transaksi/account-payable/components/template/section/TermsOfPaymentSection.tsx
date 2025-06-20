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
import { usePaymentTermsAccountPayable } from "../TermsOfPaymentLayout";

const TermsOfPaymentSection = () => {
  const { paymentTerms, pagination, setPagination, totalData } =
    usePaymentTermsAccountPayable();

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
  const columns = useMemo(() => termsOfPaymentColumns, []);

  // Inisialisasi table instance
  const table = useReactTable({
    data: paymentTerms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalData,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

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
              {paymentTerms.length === 0 ? (
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

export { TermsOfPaymentSection };
