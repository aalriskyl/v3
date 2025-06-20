import { KTCard } from '@metronic/helpers';
import { TableListSupplierHeader } from '../molecules/header/TableListHeader';
import { SupplierTable } from '../organism/table/SupplierTable';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Supplier } from '../molecules/core/_models';
import { getAllServiceSupplierByServiceId } from '../core/_request';

interface SupplierContextProps {
    data: Supplier[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    totalData: number;
    setSearchTerm: (term: string) => void;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
    fetchData: () => void;
}

const SupplierContext = createContext<SupplierContextProps | undefined>(undefined);

export const useSupplier = () => {
    const context = useContext(SupplierContext);
    if (!context) {
        throw new Error('useSupplier must be used within a SupplierProvider');
    }
    return context;
}

const SupplierTableLayout: React.FC<{ id: string; children?: ReactNode }> = ({ id, children }) => {
    const [data, setData] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [totalData, setTotalData] = useState(0);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const suppliers = await getAllServiceSupplierByServiceId(id, searchTerm, pagination.pageIndex + 1, pagination.pageSize);
            console.log(suppliers)
            setData(suppliers.data.service_suppliers || []);
            setTotalData(suppliers.data.total_page * pagination.pageSize);
        } catch (err) {
            setError('Failed to fetch suppliers');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, searchTerm, pagination.pageIndex, pagination.pageSize]);

    return (
        <SupplierContext.Provider value={{ data, isLoading, error, searchTerm, setSearchTerm, pagination, setPagination, fetchData, totalData }}>
            <div className='card p-5 w-100 mb-4'>
                <h2 className='mb-6'>Supplier</h2>
                <KTCard>
                    <TableListSupplierHeader />
                    <SupplierTable />
                </KTCard>
            </div>
        </SupplierContext.Provider>
    );
};

export default SupplierTableLayout;