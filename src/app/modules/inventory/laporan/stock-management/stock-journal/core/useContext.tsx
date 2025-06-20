import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import axiosInstance from '../../../../../../../service/axiosInstance';

interface StockJournalContextProps {
    stockJournalData: any[];
    warehouseOptions: { value: string; label: string }[];
    selectedWarehouse: string | null;
    setSelectedWarehouse: (warehouse: string | null) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    refreshData: () => Promise<void>;
}

const StockJournalContext = createContext<StockJournalContextProps | undefined>(undefined);

export const useStockJournal = () => {
    const context = useContext(StockJournalContext);
    if (!context) {
        throw new Error('useStockJournal must be used within a StockJournalProvider');
    }
    return context;
};

const StockJournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stockJournalData, setStockJournalData] = useState<any[]>([]);
    const [warehouseOptions, setWarehouseOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const fetchWarehouses = async () => {
        try {
            const response = await axiosInstance.get('/inventory/master-data/warehouse/select');
            if (response?.data?.data) {
                setWarehouseOptions(response.data.data.map((warehouse: any) => ({
                    value: warehouse.id,
                    label: warehouse.name,
                })));
            }
        } catch (error) {
            console.error('Failed to fetch warehouses:', error);
            setWarehouseOptions([]);
        }
    };

    const fetchStockJournal = async () => {
        if (!selectedWarehouse) {
            setStockJournalData([]);
            setTotalData(0);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.get(
                `/inventory/submission/stock-management/stock-history/stock-journal?warehouse_id=${selectedWarehouse}` +
                `&page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}` +
                (startDate ? `&from_date=${startDate}` : '') +
                (endDate ? `&to_date=${endDate}` : '') +
                (searchTerm ? `&search=${searchTerm}` : '')
            );

            setStockJournalData(response.data.data.stock_histories || []);
            setTotalData(response.data.data.total_page * pagination.pageSize);
        } catch (error) {
            console.error('Failed to fetch stock journal data:', error);
            setError('Failed to fetch stock journal data');
            setStockJournalData([]);
            setTotalData(0);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshData = async () => {
        await Promise.all([fetchWarehouses(), fetchStockJournal()]);
    };

    useEffect(() => {
        fetchWarehouses();
    }, []);

    useEffect(() => {
        fetchStockJournal();
    }, [selectedWarehouse, startDate, endDate, pagination.pageIndex, pagination.pageSize, searchTerm]);

    return (
        <StockJournalContext.Provider
            value={{
                stockJournalData,
                warehouseOptions,
                selectedWarehouse,
                setSelectedWarehouse,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                searchTerm,
                setSearchTerm,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
                refreshData,
            }}
        >
            {children}
        </StockJournalContext.Provider>
    );
};

export { StockJournalProvider };