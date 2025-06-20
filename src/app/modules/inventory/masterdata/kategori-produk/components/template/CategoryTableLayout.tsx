import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { CategoryTable } from '../organism/table/CategoryTable';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { Category } from '../molecules/core/_models';
import { getCategoryProduct } from '../core/_request';

interface CategoryContextProps {
    category: Category[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dateCreated: string;
    setDate: (date: string) => void;
    productType: any;
    setProductType: (productType: any) => void;
    totalData: number;
    isLoading: boolean;
    error: string | null;
    pagination: { pageIndex: number; pageSize: number };
    setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};

const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [category, setCategory] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateCreated, setDate] = useState('');
    const [productType, setProductType] = useState<any>(undefined);
    const [totalData, setTotalData] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await getCategoryProduct(
                    searchTerm,
                    pagination.pageIndex + 1,
                    pagination.pageSize,
                    productType !== undefined ? productType : "", // Set to empty string if undefined
                    dateCreated,
                );
                setCategory(response.data.categories || []);
                setTotalData(response.data.total_page * pagination.pageSize);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setCategory([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrand();
    }, [pagination.pageIndex, pagination.pageSize, searchTerm, dateCreated, productType]);

    return (
        <CategoryContext.Provider
            value={{
                category,
                searchTerm,
                setSearchTerm,
                dateCreated,
                setDate,
                productType,
                setProductType,
                totalData,
                isLoading,
                error,
                pagination,
                setPagination,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

const CategoryTableLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <CategoryProvider>
                <KTCard>
                    <LinkButton
                        to="new"
                        title="Tambah Kategori Produk"
                        style={{ top: '-5.5rem' }}
                    />
                    <TableListHeader />
                    <CategoryTable />
                </KTCard>
            </CategoryProvider>
        </div>
    );
};

export default CategoryTableLayout;