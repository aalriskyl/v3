import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import axiosInstance from '../../../../../../../service/axiosInstance';

interface StockLedgerContextProps {
    stockLedgerData: any[];
    warehouseOptions: { value: string; label: string }[];
    selectedWarehouse: string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setSelectedWarehouse: (warehouse: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    refreshData: () => Promise<void>;
}

const StockLedgerContext = createContext<StockLedgerContextProps | undefined>(undefined);

export const useStockLedger = () => {
    const context = useContext(StockLedgerContext);
    if (!context) {
        throw new Error('useStockLedger must be used within a StockLedgerProvider');
    }
    return context;
};

const StockLedgerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stockLedgerData, setStockLedgerData] = useState<any[]>([]);
    const [warehouseOptions, setWarehouseOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
    const [startDate, setStartDate] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [endDate, setEndDate] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });

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

    const fetchStockLedger = async () => {
        if (!selectedWarehouse) {
            setStockLedgerData([]);
            setTotalData(0);
            return;
        }

        setIsLoading(true);
        try {
            const params: {
                page: number;
                size: number;
                from_date?: string;
                to_date?: string;
            } = {
                page: pagination.pageIndex,
                size: pagination.pageSize,
            };

            if (startDate && endDate) {
                params.from_date = startDate;
                params.to_date = endDate;
            }

            const response = await axiosInstance.get(
                `/inventory/submission/stock-management/stock-history/stock-ledger?warehouse_id=${selectedWarehouse}&search=${searchTerm}&company_id=${localStorage.getItem('company_id')}`,
                { params }
            );

            setStockLedgerData(response.data.data.stock_histories || []);
            setTotalData(response.data.data.total_page * pagination.pageSize);
        } catch (error) {
            console.error('Failed to fetch stock ledger data:', error);
            setError('Failed to fetch stock ledger data');
            setStockLedgerData([]);
            setTotalData(0);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshData = async () => {
        await Promise.all([fetchWarehouses(), fetchStockLedger()]);
    };

    useEffect(() => {
        fetchWarehouses();
    }, []);

    useEffect(() => {
        fetchStockLedger();
    }, [selectedWarehouse, startDate, endDate, pagination.pageIndex, pagination.pageSize, searchTerm]);

    return (
        <StockLedgerContext.Provider
            value={{
                stockLedgerData,
                warehouseOptions,
                selectedWarehouse,
                setSelectedWarehouse,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
                refreshData,
                searchTerm,
                setSearchTerm
            }}
        >
            {children}
        </StockLedgerContext.Provider>
    );
};

export { StockLedgerProvider };