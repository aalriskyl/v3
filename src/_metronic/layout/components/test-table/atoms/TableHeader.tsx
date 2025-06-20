import React from 'react';

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <th className="p-2 border bg-gray-100">{children}</th>
);
