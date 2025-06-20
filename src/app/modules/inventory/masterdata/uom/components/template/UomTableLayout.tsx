import { KTCard } from '@metronic/helpers'
import { UomTable } from '../organism/table/UomTable'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Uom } from '../molecules/core/_models'
import { getUom } from '../core/_request'

interface UomContextProps {
    uom: Uom[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dateCreated: string;
    setDate: (date: string) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const UomContext = createContext<UomContextProps | undefined>(undefined);

export const useUom = () => {
    const context = useContext(UomContext);
    if (!context) {
        throw new Error('useUom must be used within a UomProvider');
    }
    return context;
};

const UomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uom, setUom] = useState<Uom[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateCreated, setDate] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await getUom(
                    searchTerm, 
                    pagination.pageIndex + 1, 
                    pagination.pageSize, 
                    dateCreated 
                );
                setUom(response.data.uoms || []);
                setTotalData(response.data.total_page * pagination.pageSize);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setUom([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrand();
    }, [pagination.pageIndex, pagination.pageSize, searchTerm, dateCreated]);

    return (
        <UomContext.Provider
            value={{
                uom,
                searchTerm,
                setSearchTerm,
                dateCreated,
                setDate,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
            }}
        >
            {children}
        </UomContext.Provider>
    );
};


const UomTableLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <UomProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Satuan/UOM"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <UomTable />
            </KTCard>
        </div>
        </UomProvider>
    )
}

export default UomTableLayout