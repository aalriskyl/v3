// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useMemo, useEffect } from "react";
// import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
// import { StockCustomRow } from "../../organisms/table/columns/StockCustomRow";
// import { KTCardBody } from "@metronic/helpers";
// import { StockHeaderColumn } from "../../organisms/table/columns/StockHeaderColumn";
// import { materialColumns } from "../../organisms/table/columns/_columnMaterial";
// import { AddMaterialModal } from "../../molecules/modals/AddMaterialModal";
// import axiosInstance from "../../../../../../../../service/axiosInstance";

// const MaterialTableSection = ({ materialChoice, setMaterialChoice }: any) => {
//   // State untuk mengontrol modal
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [dataListMaterial, setDataListMaterial] = useState([]) as any;

//   // Data tabel
//   const columns = useMemo(() => materialColumns, []);

//   // Inisialisasi table instance
//   const table = useReactTable({
//     data: dataListMaterial,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   // Fungsi toggle modal
//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   useEffect(() => {
//     const data = materialChoice.map((item: any) => ({
//       id: item.id,
//       material: item.material.name,
//       jumlah: item.jumlah,
//       uom: item.uom.name,
//       harga: item.harga,
//       barcode: item.barcode,
//     }));
//     setDataListMaterial(data);
//   }, [materialChoice]);

//   // Fungsi untuk menangani submit dari modal
//   const handleSubmit = async (data: any) => {
//     setMaterialChoice([...materialChoice, data]);
//     toggleModal();
//   };

//   return (
//     <>
//       <KTCardBody className="py-4">
//         <div className="table-responsive">
//           <table
//             id="kt_table_users"
//             className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer"
//           >
//             <thead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr
//                   key={headerGroup.id}
//                   className="text-start text-muted fw-bold fs-7 gs-0"
//                 >
//                   {headerGroup.headers.map((header) => (
//                     <StockHeaderColumn key={header.id} header={header} />
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="text-gray-600">
//               {dataListMaterial.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length} className="text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 table
//                   .getRowModel()
//                   .rows.map((row: Row<any>) => (
//                     <StockCustomRow key={row.id} row={row} />
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Tombol Tambah Material */}
//         <div
//           className="position-absolute"
//           style={{ top: "17px", right: "30px" }}
//         >
//           <button
//             className="btn text-primary border border-primary mt-4"
//             onClick={toggleModal}
//           >
//             Tambah Material
//           </button>
//         </div>
//       </KTCardBody>

//       {/* Modal Tambah Material */}
//       <AddMaterialModal
//         show={isModalVisible}
//         handleClose={toggleModal}
//         onSubmit={handleSubmit}
//       />
//     </>
//   );
// };
//
// export { MaterialTableSection };
