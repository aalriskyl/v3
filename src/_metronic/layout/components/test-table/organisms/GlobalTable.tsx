// import React from 'react';
// import { useReactTable, getCoreRowModel, ColumnDef, Cell } from '@tanstack/react-table';

// interface GlobalTableProps<T> {
//     data: T[];
//     columns: ColumnDef<T, any | undefined>[];
// }

// export const GlobalTable = <T,>({ data, columns }: GlobalTableProps<T>) => {
//     const table = useReactTable<T>({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });

//     return (
//         <div className="table-responsive">
//             <table className="table table-striped table-hover align-middle">
//                 <thead>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => (
//                                 <th key={header.id}>
//                                     {header.isPlaceholder ? null : header.column.columnDef.header}
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody>
//                     {table.getRowModel().rows.map((row) => (
//                         <tr key={row.id}>
//                             {row.getVisibleCells().map((cell) => (
//                                 <td key={cell.id}>
//                                     {cell.column.columnDef.renderCell ? cell.column.columnDef.renderCell(cell) : cell.renderCell()}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
