// import { useMemo, useEffect, useState } from 'react';
// import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
// import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
// import { CustomRow } from './columns/CustomRow';
// import { ListPagination } from '@metronic/layout/components/form/components/pagination/ListPagination';
// import { KTCardBody } from '@metronic/helpers';
// import { Model } from '../../molecules/core/_models';
// import { entryColumns } from './columns/_columns';
// import { getAllEntryStock } from '../../../core/_request';
// // import axiosInstance from '../../../core/_axios'; // Ensure you import axiosInstance correctly
// import { AddStockModal } from '../../molecules/modals/AddStockModal';
// interface UsersTableProps {
//     searchTerm: string;
// }

// const MaterialsTable: React.FC<UsersTableProps> = ({ searchTerm }) => {
//     const [data, setData] = useState<Model[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<any>(null);
//     const [refetchData, setRefetchData] = useState<boolean>(false);
//     const [showAddSupplierModal, setShowAddSupplierModal] = useState<boolean>(false);

//     // Fetch suppliers based on search term
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             setError(null);

//             try {
//                 const entryStockData = await getAllEntryStock();
//                 setData(entryStockData.stock_entries); // Set the fetched data into state
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Define columns
//     const columns = useMemo(() => entryColumns, []);
//     const handleSupplierAdded = () => {
//         setRefetchData(true);
//     };
//     const handleAddSupplier = () => {
//         setShowAddSupplierModal(true);
//     };
//     // Initialize table instance
//     const table = useReactTable({
//         data: data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });

//     return (
//         <KTCardBody className="py-4">
//             <div className="table-responsive ">
//                 <table id="kt_table_users" className="table align-middle table-border-dashed table-bordered fs-6 dataTable no-footer">
//                     <thead>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id} className="text-start text-muted fw-bold fs-7 gs-0">
//                                 {headerGroup.headers.map((header) => (
//                                     <CustomHeaderColumn key={header.id} header={header} />
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody className="text-gray-600">
//                         {isLoading ? (
//                             <tr>
//                                 <td colSpan={columns.length} className="text-center">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : error ? (
//                             <tr>
//                                 <td colSpan={columns.length} className="text-center text-danger">
//                                     {error.message || 'An error occurred'}
//                                 </td>
//                             </tr>
//                         ) : data.length === 0 ? (
//                             <tr>
//                                 <td colSpan={columns.length} className="text-center">
//                                     No data available
//                                 </td>
//                             </tr>
//                         ) : (
//                             table.getRowModel().rows.map((row: Row<any>) => (
//                                 <CustomRow key={row.id} row={row} />
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* <ListPagination /> */}
//         </KTCardBody>
//     );
// };

// export { MaterialsTable };