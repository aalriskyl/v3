// AccountPayableContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAllAccountPayable } from '../core/_request'
import { useParams } from 'react-router-dom'

interface AccountPayableContextProps {
    data: any[]
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    status: string;
    setStatus: (term: string) => void;
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
    requestedDate: string;
    setRequestedDate: (date: string) => void;
    requestedDateTo: string;
    setRequestedDateTo: (date: string) => void;
}

const AccountPayableContext = createContext<AccountPayableContextProps | undefined>(undefined)

export const AccountPayableProvider: React.FC<{ children: React.ReactNode; }> = ({
    children,
}) => {
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<any[]>([])
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalData, setTotalData] = useState(0)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [submittedDate, setSubmittedDate] = useState('');
    const [submittedDateTo, setSubmittedDateTo] = useState('');
    const [approvedDate, setApprovedDate] = useState('');
    const [approvedDateTo, setApprovedDateTo] = useState('');
    const [requestedDate, setRequestedDate] = useState('');
    const [requestedDateTo, setRequestedDateTo] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getAllAccountPayable(
                    searchTerm, 
                    status,
                    pagination.pageIndex + 1, 
                    pagination.pageSize, 
                    submittedDate,
                    submittedDateTo,
                    approvedDate,
                    approvedDateTo,
                    requestedDate,
                    requestedDateTo,                   
                );
                if (response.data) {
                    setData(response.data.account_payables || []);
                    setTotalData(response.data.total_page * pagination.pageSize);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("An error occurred while fetching data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [searchTerm, pagination.pageIndex, pagination.pageSize, submittedDate, submittedDateTo, approvedDate, approvedDateTo, status, requestedDate, requestedDateTo]);

    return (
        <AccountPayableContext.Provider
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
                requestedDate,
                setRequestedDate,
                requestedDateTo,
                setRequestedDateTo,
            }}
        >
            {children}
        </AccountPayableContext.Provider>
    );
}

export const useAccountPayable = () => {
    const context = useContext(AccountPayableContext)
    if (!context) {
        throw new Error('useAccountPayable must be used within a AccountPayableProvider')
    }
    return context
}