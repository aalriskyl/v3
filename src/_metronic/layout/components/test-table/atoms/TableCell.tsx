import React from 'react';

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td className="p-2 border">{children}</td>
);
