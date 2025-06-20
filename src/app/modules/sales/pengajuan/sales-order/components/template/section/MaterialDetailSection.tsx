import { useState, useMemo } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { StockCustomRow } from "../../organisms/table/columns/StockCustomRow";
import { KTCardBody } from "@metronic/helpers";
import { StockHeaderColumn } from "../../organisms/table/columns/StockHeaderColumn";
import { materialDetailColumns } from "../../organisms/table/columns/_columnMaterialDetail";
import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useParams } from "react-router-dom";
import { useMaterialSalesOrder } from "../MaterialDetailSectionLayout";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";

const MaterialDetailTableSection = ({
  materialChoice,
  setMaterialChoice,
}: any) => {
  const {
    status,
    refreshMaterial: refresh,
    isPreOrder,
    setPagination,
    pagination,
    totalData,
  } = useMaterialSalesOrder();
  const params = useParams();
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
    data: materialChoice,
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
    console.log("Data material berhasil disimpan", data);
    try {
      const SendData = {
        price: parseInt(data.harga),
        amount: parseInt(data.jumlah),
        material_id: data.material.id,
        material_uom_id: data.uom.id,
      };
      console.log({ SendData });
      const response = await axiosInstance.post(
        `/sales/submission/sales-order/sales-order-material/${params.id}`,
        {
          price: parseInt(data.harga),
          amount: parseInt(data.jumlah),
          material_id: data.material.id,
          material_uom_id: data.uom.id,
        }
      );
      console.log({ addMaterial: response });
      refresh();
      // toggleModal();
      return;
    } catch (error) {
      console.log({ adwwad: error });
      setIsAddMaterialFailed({
        mesage: (error as any).response.data.field,
        value: true,
      });
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
                    <StockHeaderColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-600">
              {materialChoice.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                table
                  .getRowModel()
                  .rows.map((row: Row<any>) => (
                    <StockCustomRow key={row.id} row={row} />
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
              Tambah Material
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
      <AddMaterialModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      />

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
