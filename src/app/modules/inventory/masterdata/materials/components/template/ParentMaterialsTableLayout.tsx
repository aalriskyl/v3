import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMaterials } from '../core/_request';
import { Materials } from '../molecules/core/_models';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import MaterialTable from '../organism/table/MaterialsTable';

interface MaterialsContextProps {
    materialsData: Materials[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    category: string; // Renamed from `status`
    setCategory: (category: string) => void; // Renamed from `setStatus`
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const MaterialsContext = createContext<MaterialsContextProps | undefined>(undefined);

export const useMaterials = () => {
    const context = useContext(MaterialsContext);
    if (!context) {
        throw new Error('useMaterials must be used within a MaterialsProvider');
    }
    return context;
};

export const MaterialsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [category, setCategory] = useState<string>(''); // Renamed from `status`
    const [materialsData, setMaterialsData] = useState<Materials[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getMaterials(
                    searchTerm, 
                    pagination.pageIndex + 1, 
                    pagination.pageSize, 
                    category);
                if (response.data) {
                    setMaterialsData(response.data.materials || []);
                    setTotalData(response.data.total_page * pagination.pageSize);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            } catch (err) {
                setError('Failed to fetch materials data.');
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [searchTerm, pagination.pageIndex, pagination.pageSize, category]);

    return (
        <MaterialsContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                category, // Renamed from `status`
                setCategory, // Renamed from `setStatus`
                materialsData,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
            }}
        >
            {children}
        </MaterialsContext.Provider>
    );
};

const ParentMaterialsTableLayout = () => {
    return (
        <MaterialsProvider>
            <div>
                <KTCard>
                    <LinkButton to="new" title="Tambah Material" style={{ top: '-4.5rem' }} />
                    <TableListHeader />
                    <MaterialTable />
                </KTCard>
            </div>
        </MaterialsProvider>
    );
};

export default ParentMaterialsTableLayout;
