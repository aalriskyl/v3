// import { useState, useEffect, useMemo } from 'react';
// import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
// import { SupplierHeaderColumn } from './columns/SupplierHeaderColumn';
// import { SupplierRow } from './columns/SupplierRow';
// import { supplierColumns } from './columns/_suppliercolumns';
// import { PaymentTerms, Supplier } from '../../molecules/core/_models';
// import { KTCardBody } from '@metronic/helpers';
// import { AddTermsModal } from '../../molecules/modals/AddTermsModal';

// const SupplierTable: React.FC = () => {
//     const [supplierData, setSupplierData] = useState<PaymentTerms[]>([
//         { id: 1, name: 'A', invoice_portion:'', due_date:'', credit: '' },
//         { id: 2, name: 'B', invoice_portion: '', due_date: '', credit: '' },
//         { id: 3, name: 'C', invoice_portion: '', due_date: '', credit: '' },
//     ]);
//     const [showAddSupplierModal, setShowAddSupplierModal] = useState<boolean>(false);

//     const handleSupplierAdded = () => {
//         // Logic to add a new supplier can be implemented here
//         // For now, we can just close the modal
//         setShowAddSupplierModal(false);
//     };

//     const handleAddSupplier = () => {
//         setShowAddSupplierModal(true);
//     };

//     const columns = useMemo(() => supplierColumns, []);
//     const table = useReactTable({
//         data: supplierData,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });

//     return (
//         <KTCardBody className='py-4 max-w-20'>
//             <div className='table-responsive'>
//                 <table
//                     id='kt_table_users'
//                     className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
//                 >
//                     <thead>
//                         {table.getHeaderGroups().map((columnGroup) => (
//                             <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
//                                 {columnGroup.headers.map((header) => (
//                                     <SupplierHeaderColumn key={header.id} header={header} />
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody className='text-gray-600'>
//                         {table.getRowModel().rows.length > 0 ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <SupplierRow key={row.id} row={row} />
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={8}>
//                                     <div className='d-flex text-center w-100 align-content-center justify-content-center'>
//                                         Belum ada data. Silahkan tambah data.
//                                     </div>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div className='position-absolute' style={{ top: '17px', right: '30px' }}>
//                 <button onClick={handleAddSupplier} className="btn text-primary border border-primary mt-4">
//                     Tambah
//                 </button>
//             </div>
//             <AddTermsModal
//                 show={showAddSupplierModal}
//                 handleClose={() => setShowAddSupplierModal(false)}
//                 onSubmit={handleSupplierAdded} // Pass the callback function
//             />
//         </KTCardBody>
//     );
// };

// export { SupplierTable };