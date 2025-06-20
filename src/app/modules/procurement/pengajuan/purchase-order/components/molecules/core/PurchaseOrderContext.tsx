// PurchaseOrderContext.tsx (File terpisah)
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAllPurchaseOrder } from '../../../core/_request'
import { useParams } from 'react-router-dom'

interface PurchaseOrderContextProps {
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
    quotationData: any; // New state for quotation data
    setQuotationData: (data: any) => void; // Setter for quotation data
}

const PurchaseOrderContext = createContext<PurchaseOrderContextProps | undefined>(undefined)

export const PurchaseOrderProvider: React.FC<{ children: React.ReactNode; }> = ({
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
    const [quotationData, setQuotationData] = useState<any>(null); // Initialize quotationData

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getAllPurchaseOrder(
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
                    setData(response.data.purchase_orders || []);
                    setTotalData(response.data.total_page * pagination.pageSize);
                    
                    // Check if quotation.id is not null and set quotationData
                    if (response.data.quotation && response.data.quotation.id !== null) {
                        setQuotationData(response.data.quotation);
                    } else {
                        setQuotationData(null); // Reset if no valid quotation
                    }
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
        <PurchaseOrderContext.Provider
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
                quotationData, // Provide quotationData
                setQuotationData, // Provide setter for quotationData
            }}
        >
            {children}
        </PurchaseOrderContext.Provider>
    );
}

export const usePurchaseOrders = () => {
    const context = useContext(PurchaseOrderContext)
    if (!context) {
        throw new Error('usePurchaseOrders must be used within a PurchaseOrderProvider')
    }
    return context
}