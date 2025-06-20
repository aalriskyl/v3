import {
  useState,
  useMemo,
  SetStateAction,
  useEffect,
  createContext,
  useContext,
} from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MaterialHeaderColumn } from "./columns/MaterialHeaderColumn";
import { MaterialRow } from "./columns/MaterialRow";
import { materialColumns } from "./columns/_materialcolumns";
import { KTCardBody } from "@metronic/helpers";
import { MaterialModel } from "../../molecules/core/_models";
import { dummyMaterials } from "./dummyUsers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { MaterialManajemenPengeriman } from "../../template/RefactoredForm";
import { getAllMaterialByPengirimanId } from "../../../core/_request";
import { useParams } from "react-router-dom";
import { ModalBarcodeScan } from "../../molecules/modals/ModalBarcodeScan";
import { Button } from "react-bootstrap";
import { useMaterial } from "../../molecules/core/MaterialContext";

const MaterialDetailTable = () => {
  const { data, setData, totalData, pagination, setPagination, status } =
    useMaterial();

  const columns = useMemo(() => materialColumns, []);

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
        <table
          id="kt_table_users"
          className="table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer"
        >
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
            {table.getRowModel().rows.length > 0 ? (
              table
                .getRowModel()
                .rows.map((row) => <MaterialRow key={row.id} row={row} />)
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  Belum ada data. Silahkan tambah data.
                </td>
              </tr>
            )}
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
