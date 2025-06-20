// CompanyContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCompany } from './_request'
import { useParams } from 'react-router-dom'

interface CompanyContextProps {
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
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined)

export const CompanyProvider: React.FC<{ children: React.ReactNode; }> = ({
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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getCompany(
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
                    setData(response.data.companies|| []);
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
    }, [searchTerm, pagination.pageIndex, pagination.pageSize, submittedDate, submittedDateTo, approvedDate, approvedDateTo, status]);

    return (
        <CompanyContext.Provider
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
        </CompanyContext.Provider>
    );
}

export const useCompany = () => {
    const context = useContext(CompanyContext)
    if (!context) {
        throw new Error('useCompanys must be used within a CompanyProvider')
    }
    return context
}