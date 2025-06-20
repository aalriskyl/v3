// RequestOrderContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { formatDateToMonthYear } from '../../../../../../../helper/formatDate'
import { useParams } from 'react-router-dom'
import { getAllRequestOrder } from '../../../core/_request';

interface RequestOrderContextProps {
    data: any[]
    searchTerm: string;
    status: string;
    setStatus: (term: string) => void;
    setSearchTerm: (term: string) => void;
    // category: string; // Renamed from `status`
    // setCategory: (category: string) => void; // Renamed from `setStatus`
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    submittedDate: string;
    setSubmittedDate: (date: string) => void;
    submittedDateTo: string;
    setSubmittedDateTo: (date: string) => void;
    approvedDate: string;
    setApprovedDate: (date: string) => void;
    approvedDateTo: string;
    setApprovedDateTo: (date: string) => void;
}

const RequestOrderContext = createContext<RequestOrderContextProps | undefined>(undefined)

export const RequestOrderProvider: React.FC<{ children: React.ReactNode; }> = ({
    children,
}) => {
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<any[]>([])
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalData, setTotalData] = useState(0)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus]= useState('')
    const [submittedDate, setSubmittedDate] = useState('');
    const [submittedDateTo, setSubmittedDateTo] = useState('');
    const [approvedDate, setApprovedDate] = useState('');
    const [approvedDateTo, setApprovedDateTo] = useState('');


    useEffect(() => {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await getAllRequestOrder(
                        searchTerm, 
                        status,
                        pagination.pageIndex + 1, 
                        pagination.pageSize, 
                        submittedDate,
                        submittedDateTo,
                        approvedDate,
                        approvedDateTo
                        );
                    if (response.data) {
                        setData(response.data.sales_orders || []);
                        setTotalData(response.data.total_page * pagination.pageSize);
                    } else {
                        console.error("Unexpected response structure:", response);
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
            
    }, [searchTerm, pagination.pageIndex, pagination.pageSize, submittedDate, submittedDateTo, approvedDate, approvedDateTo, status]);

 

    return (
        <RequestOrderContext.Provider
            value={{
                searchTerm,
                status,
                setStatus,
                data,
                isLoading,
                submittedDate,
                setSubmittedDate,
                submittedDateTo,
                setSubmittedDateTo,
                approvedDate,
                setApprovedDate,
                approvedDateTo,
                setApprovedDateTo,
                error,
                setSearchTerm,
                totalData,
                pagination,
                setPagination,
            }}
        >
            {children}
        </RequestOrderContext.Provider>
    );
}

export const useRequestOrders = () => {
    const context = useContext(RequestOrderContext)
    if (!context) {
        throw new Error('useRequestOrders must be used within a RequestOrderProvider')
    }
    return context
}