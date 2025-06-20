import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import CategoryForm from '../../components/template/CategoryForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Category } from '../../components/molecules/core/_models';
import axiosInstance from '../../../../../../../service/axiosInstance';

const EditCategory: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingCategory, setExistingCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchSupplier = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/inventory/master-data/category/${id}`);
                    setExistingCategory(response.data.data);
                    console.log(response.data.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Failed to fetch customer data:', error);
                    setError('Failed to fetch customer data. Please try again.');
                    setIsLoading(false);
                }
            } else {
                setError('Customer ID is missing.');
                setIsLoading(false);
            }
        };

        fetchSupplier();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    if (!existingCategory) {
        return <div>No customer data found.</div>;
    }



    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Inventory',
            path: '/inventory',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Kategori Produk',
            path: '/inventory/masterdata/kategori-produk',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Kategori Produk</PageTitle>
            <CategoryForm
                mode='edit'
                successMessage='Kategori Produk berhasil di ubah.'
                headTitle='Ubah Kategori Produk'
                buttonTitle='Ubah'
                cancelButtonLabel='Kembali'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditCategory;