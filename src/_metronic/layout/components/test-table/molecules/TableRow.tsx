import React from 'react';
import { TableCell } from '../atoms/TableCell';

export const TableRow: React.FC<{ rowData: any }> = ({ rowData }) => (
    <tr>
        {rowData.map((cell: string, idx: number) => (
            <TableCell key={idx}>{cell}</TableCell>
        ))}
    </tr>
);
