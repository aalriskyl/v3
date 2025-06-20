import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListUomDetailHeader, TableListUomHeader } from '../molecules/header/TableListHeader';
import { UomTable } from '../organism/table/UomTable';
import { useParams } from 'react-router-dom'; // Only useParams is needed
import { getUomFromMaterialId } from '../core/_request'; // Import the API function
import { Uom } from '../molecules/core/_models';

// Create a context for UOM data
interface UomContextProps {
    uomData: Uom[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    totalData: number;
    setSearchTerm: (term: string) => void;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const UomContext = createContext<UomContextProps | undefined>(undefined);

export const useUomContext = () => {
    const context = useContext(UomContext);
    if (!context) {
        throw new Error('useUomContext must be used within a UomProvider');
    }
    return context;
};

const UomProvider: React.FC<{ materialId: string; children: ReactNode }> = ({ materialId, children }) => {
    const [uomData, setUomData] = useState<Uom[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [totalData, setTotalData] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getUomFromMaterialId(materialId, searchTerm, pagination.pageIndex + 1, pagination.pageSize );
                if (data) {
                    setUomData(data.data.material_uoms);
                    setTotalData(data.data.total_page * pagination.pageSize);
                } else {
                    throw new Error('No data found');
                }
            } catch (err) {
                setError('Failed to fetch UOM data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [materialId, searchTerm, pagination.pageIndex, pagination.pageSize]);

    return (
        <UomContext.Provider 
        value={{ 
            uomData, 
            totalData,
            isLoading, 
            error,
            searchTerm,
            setSearchTerm, 
            pagination,
            setPagination,
        }}
            >
            {children}
        </UomContext.Provider>
    );
};

const UomTableLayout = () => {
    const { materialId } = useParams<{ materialId: string }>(); // Extract materialId from URL
    // If materialId is missing, show an error
    if (!materialId) {
        return (
            <div className='card p-5 w-100 mb-4'>
                <h2 className='mb-6'>UOM</h2>
                <div className='alert alert-danger'>
                    Invalid Material ID. Please check the URL and try again.
                </div>
            </div>
        );
    }

    return (
        <UomProvider materialId={materialId}>
            <div className='card p-5 w-100 mb-4'>
                <h2 className='mb-6'>UOM</h2>
                <KTCard>
                    <TableListUomHeader />
                    <UomTable />
                </KTCard>
            </div>
        </UomProvider>
    );
};

export default UomTableLayout;