// ServiceContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { getAllServiceQuotation } from '../../../core/_request'
// import { formatDateToMonthYear } from '../../../../../../../helper/formatDate'
import { useParams } from 'react-router-dom'

interface ServiceContextProps {
    data: any[]
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    fetchData: () => Promise<void>;

}

const ServiceContext = createContext<ServiceContextProps | undefined>(undefined)

export const ServiceProvider: React.FC<{ children: React.ReactNode; }> = ({
    children,
}) => {
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<any[]>([])
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalData, setTotalData] = useState(0)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getAllServiceQuotation(
                id,
                searchTerm,
                pagination.pageIndex + 1,
                pagination.pageSize
            );
            console.log(response.data.quotation_services);
            if (response.data) {

                setData(response.data.quotation_services || []);
                setTotalData(response.data.total_page * pagination.pageSize);
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError(String(err));
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    

 

    return (
        <ServiceContext.Provider
            value={{
                searchTerm,
                data,
                isLoading,
                error,
                setSearchTerm,
                totalData,
                pagination,
                setPagination,
                fetchData,
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}

export const useService = () => {
    const context = useContext(ServiceContext)
    if (!context) {
        throw new Error('useServices must be used within a ServiceProvider')
    }
    return context
}