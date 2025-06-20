// MaterialRequestMaterialContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getAllMaterialRequestMaterial } from './_request';
import { useParams } from 'react-router-dom';

interface MaterialRequestMaterialContextProps {
    data: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    refetchData: () => void; // Added refetch function
}

const MaterialRequestMaterialContext = createContext<MaterialRequestMaterialContextProps | undefined>(undefined);

export const MaterialRequestMaterialProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalData, setTotalData] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const response = await getAllMaterialRequestMaterial(
                id,
                searchTerm,
                pagination.pageIndex + 1,
                pagination.pageSize,
            );
            if (response.data) {
                setData(response.data.material_requests || []);
                setTotalData(response.data.total_page * pagination.pageSize);
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch data."); // Set error message
        } finally {
            setIsLoading(false);
        }
    }, [id, searchTerm, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        searchTerm,
        data,
        isLoading,
        error,
        setSearchTerm,
        totalData,
        pagination,
        setPagination,
        refetchData: fetchData, // Expose refetch function
    }), [searchTerm, data, isLoading, error, totalData, pagination]);

    return (
        <MaterialRequestMaterialContext.Provider value={contextValue}>
            {children}
        </MaterialRequestMaterialContext.Provider>
    );
}

export const useMaterialRequestMaterials = () => {
    const context = useContext(MaterialRequestMaterialContext);
    if (!context) {
        throw new Error('useMaterialRequestMaterials must be used within a MaterialRequestMaterialProvider');
    }
    return context;
}