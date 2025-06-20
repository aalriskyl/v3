import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import axiosInstance from '../../../../../../../service/axiosInstance';

interface StockCardContextProps {
    stockCardData: any[];
    materialOptions: { value: string; label: string }[];
    warehouseOptions: { value: string; label: string }[];
    selectedMaterial: string | null;
    setSelectedMaterial: (material: string | null) => void;
    selectedWarehouse: string | null;
    setSelectedWarehouse: (warehouse: string | null) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;

    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    refreshData: () => Promise<void>;
}

const StockCardContext = createContext<StockCardContextProps | undefined>(undefined);

export const useStockCard = () => {
    const context = useContext(StockCardContext);
    if (!context) {
        throw new Error('useStockCard must be used within a StockCardProvider');
    }
    return context;
};

const StockCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stockCardData, setStockCardData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
    const [warehouseOptions, setWarehouseOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const fetchMaterials = async () => {
        try {
            const response = await axiosInstance.get('/inventory/master-data/material/select');
            if (response?.data?.data) {
                setMaterialOptions(response.data.data.map((material: any) => ({
                    value: material.id,
                    label: material.name,
                })));
            }
        } catch (error) {
            console.error('Failed to fetch materials:', error);
            setMaterialOptions([]);
        }
    };

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

    const fetchStockCard = async () => {
        if (!selectedMaterial) {
            setStockCardData([]);
            setTotalData(0);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.get(
                `/inventory/submission/stock-management/stock-history/stock-card?material_id=${selectedMaterial}` +
                (selectedWarehouse ? `&warehouse_id=${selectedWarehouse}` : '') +
                (startDate ? `&from_date=${startDate}` : '') +
                (endDate ? `&to_date=${endDate}` : '') +
                `&page=${pagination.pageIndex + 1}` +
                `&page_size=${pagination.pageSize}&search=${searchTerm}`
            );
            
            setStockCardData(response.data.data.stock_histories || []);
            setTotalData(response.data.data.total_page * pagination.pageSize);
        } catch (error) {
            console.error('Failed to fetch stock card data:', error);
            setError('Failed to fetch stock card data');
            setStockCardData([]);
            setTotalData(0);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshData = async () => {
        await Promise.all([fetchMaterials(), fetchWarehouses(), fetchStockCard()]);
    };

    useEffect(() => {
        fetchMaterials();
        fetchWarehouses();
    }, []);

    useEffect(() => {
        fetchStockCard();
    }, [selectedMaterial, selectedWarehouse, startDate, endDate, pagination.pageIndex, pagination.pageSize, searchTerm]);

    return (
        <StockCardContext.Provider
            value={{
                stockCardData,
                materialOptions,
                warehouseOptions,
                selectedMaterial,
                setSelectedMaterial,
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
        </StockCardContext.Provider>
    );
};

export { StockCardProvider };