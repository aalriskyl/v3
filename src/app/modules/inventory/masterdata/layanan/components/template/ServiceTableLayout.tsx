import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ServiceTable } from '../organism/table/ServiceTable';
import { Service } from '../molecules/core/_models';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getService } from '../core/_request';

interface ServiceContextProps {
    serviceData: Service[];
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

const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

export const useService = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useService must be used within a ServiceProvider');
    }
    return context;
};

const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateCreated, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getService(
                    pagination.pageIndex + 1,
                    pagination.pageSize,
                    category,
                    searchTerm,
                    dateCreated // Pass dateCreated to the API
                );
                setServiceData(response.data.services || []);
                setTotalData(response.data.total_page * pagination.pageSize);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Failed to fetch services');
                setServiceData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, searchTerm, dateCreated, category]);

    return (
        <ServiceContext.Provider
            value={{
                serviceData,
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
        </ServiceContext.Provider>
    );
};

const ServiceTableLayout = () => {
    return (
        <ServiceProvider>
            <div>
                <KTCard>
                    <LinkButton
                        to="new"
                        title="Tambah Layanan"
                        style={{ top: '-4.5rem' }}
                    />
                    <TableListHeader />
                    <ServiceTable />
                </KTCard>
            </div>
        </ServiceProvider>
    );
};

export default ServiceTableLayout;