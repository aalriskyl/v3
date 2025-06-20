import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAllRequestOrderMaterial } from '../../../core/_request';
import { useParams } from 'react-router-dom';

interface MaterialRequestOrderContextProps {
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

const MaterialRequestOrderContext = createContext<MaterialRequestOrderContextProps | undefined>(undefined);

export const MaterialRequestOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
            const materials = await getAllRequestOrderMaterial(
                id || '',
                searchTerm,
                pagination.pageIndex + 1,
                pagination.pageSize
            );
            setData(materials.data.salese_order_materials);
            setTotalData(materials.data.total_page * pagination.pageSize);
            // console.log('materials', materials.data.purchase_order_materials)
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
        <MaterialRequestOrderContext.Provider
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
        </MaterialRequestOrderContext.Provider>
    );
};

export const useMaterialRequestOrders = () => {
    const context = useContext(MaterialRequestOrderContext);
    if (!context) {
        throw new Error('useRequestOrders must be used within a RequestOrderProvider');
    }
    return context;
};