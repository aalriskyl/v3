import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { Model } from '../molecules/core/_models';
import { getAllEntryStock } from '../../core/_request';
import { EntryStockProvider } from '../../../../../pengajuan/stock-management/entry-stock/components/molecules/core/EntryStockContext';


interface StockContextProps {
    stockData: Model[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dateCreated: string;
    setDate: (date: string) => void;
    category: string;
    setCategory: (category: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const StockContext =
createContext<StockContextProps | undefined>(undefined);

export const useStock = () => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStock Harus dipakai di stok provider')
    }
    return context;
}

const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stockData, setStockData] = useState<Model[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateCreated, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try {
                const response = await getAllEntryStock(
                    pagination.pageIndex + 1,
                    pagination.pageSize,
                    category,
                    searchTerm,
                    dateCreated
                );
                setStockData(response.data.stock_entries || []);
                setTotalData(response.data.total_page * pagination.pageSize)
            } catch (error) {
                console.error("Error fetching");
                setStockData([]);
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    }, [pagination.pageIndex, pagination.pageIndex, searchTerm, dateCreated, category]);

    return (
        <StockContext.Provider
            value={{
                stockData,
                searchTerm,
                setSearchTerm,
                dateCreated,
                setDate,
                category,
                setCategory,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
            }}
        >
            {children}
        </StockContext.Provider>
    );
};


const TableLayout = () => {
    return (
        <EntryStockProvider>
        <div>
            <KTCard>
                <TableListHeader/>
                <ModuleTable />
            </KTCard>
        </div>
        </EntryStockProvider>
    );
};

export default TableLayout;
