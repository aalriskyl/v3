import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { LayananRow } from "../../organisms/table/columns/LayananRow";
import { KTCardBody } from "@metronic/helpers";
import { LayananHeaderColumn } from "../../organisms/table/columns/LayananHeaderColumn";
import { layananDetailColumns } from "../../organisms/table/columns/_columnLayananDetail";
import { AddLayananModal } from "../../molecules/modals/AddLayananModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";
import { useServiceSalesOrder } from "../LayananDetailSectionLayout";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";

const LayananDetailTableSection = ({
  serviceChoice,
  setServiceChoice,
}: any) => {
  const {
    status,
    refreshService: refresh,
    isPreOrder,
    setPagination,
    pagination,
    totalData,
  } = useServiceSalesOrder();
  const params = useParams();
  // State untuk mengontrol modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Data tabel
  const columns = useMemo(() => layananDetailColumns, []);

  // Inisialisasi table instance
  const table = useReactTable({
    data: serviceChoice,
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
    // Tambahkan logika untuk menyimpan data material di sini
    console.log("Data service berhasil disimpan", data);
    try {
      const SendData = {
        amount: Number(data.amount),
        price: parseFloat(data.price),
        service_id: data.service.id,
      };
      console.log({ SendData });
      const response = await axiosInstance.post(
        `/sales/submission/sales-order/sales-order-service/${params.id}`,
        SendData
      );
      console.log({ addMaterial: response });
      refresh();
      // toggleModal();
      return;
    } catch (error) {
      return;
    }
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
                    <LayananHeaderColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-600">
              {serviceChoice.length === 0 ? (
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
        {status === "Draft" && !isPreOrder && (
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
        )}
        <ListPagination
          total={totalData} // Total data count
          currentPage={pagination.pageIndex} // Current page (1-based index)
          pageSize={pagination.pageSize} // Current page size
          onPageChange={handlePageChange} // Page change handler
        />
      </KTCardBody>
      <AddLayananModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { LayananDetailTableSection };
