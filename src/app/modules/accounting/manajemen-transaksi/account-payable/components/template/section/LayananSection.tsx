/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { LayananRow } from "../../organisms/table/columns/LayananRow";
import { KTCardBody } from "@metronic/helpers";
import { LayananHeaderColumn } from "../../organisms/table/columns/LayananHeaderColumn";
import { layananColumns } from "../../organisms/table/columns/_columnLayanan";
import { AddLayananModal } from "../../molecules/modals/AddLayananModal";

const LayananTableSection = ({ layananChoice, setLayananChoice }: any) => {
  // State untuk mengontrol modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataService, setDataService] = useState<any[]>([]);

  useEffect(() => {
    const dummyData = layananChoice.map((item: any, index: number) => ({
      id: index, // Simpan index sebagai ID
      service: item.service.name,
      supplier: item.supplier.name,
      price: item.price,
    }));
    setDataService(dummyData);
  }, [layananChoice]);

  // Data tabel
  const columns = useMemo(() => layananColumns, []);

  // Inisialisasi table instance
  const table = useReactTable({
    data: dataService,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Fungsi toggle modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Fungsi untuk menangani submit dari modal
  const handleSubmit = async (data: any) => {
    // Tambahkan logika untuk menyimpan data material di sini
    setLayananChoice([...layananChoice, data]);
    console.log(layananChoice);
    // Tutup modal setelah submit
    toggleModal();
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
              {dataService.length === 0 ? (
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

        {/* Tombol Tambah Layanan */}
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
      </KTCardBody>

      {/* Modal Tambah Layanan */}
      <AddLayananModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { LayananTableSection };
