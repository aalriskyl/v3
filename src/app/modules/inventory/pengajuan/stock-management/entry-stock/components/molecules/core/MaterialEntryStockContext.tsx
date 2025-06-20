import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAllMaterialStockEntry } from '../../../core/_request';
import { useParams } from 'react-router-dom';

interface MaterialEntryStockContextProps {
    data: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    fetchData: () => Promise<void>;
}

const MaterialEntryStockContext = createContext<MaterialEntryStockContextProps | undefined>(undefined);

export const MaterialEntryStockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalData, setTotalData] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const materials = await getAllMaterialStockEntry(
                id || '',
                searchTerm,
                pagination.pageIndex + 1,
                pagination.pageSize
            );
            setData(materials.data.stock_entry_materials);
            setTotalData(materials.data.total_page * pagination.pageSize);
            console.log('materials', materials.data.purchase_order_materials)
        } catch (err) {
            setError('Failed to fetch materials');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [id, pagination.pageIndex, pagination.pageSize, searchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <MaterialEntryStockContext.Provider
            value={{
                data,
                searchTerm,
                setSearchTerm,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
                fetchData,
            }}
        >
            {children}
        </MaterialEntryStockContext.Provider>
    );
};

export const useMaterialEntryStocks = () => {
    const context = useContext(MaterialEntryStockContext);
    if (!context) {
        throw new Error('useEntryStocks must be used within a EntryStockProvider');
    }
    return context;
};