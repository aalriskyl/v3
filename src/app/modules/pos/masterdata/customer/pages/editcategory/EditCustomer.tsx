import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import { useParams, useNavigate } from 'react-router-dom';
import { Customer } from '../../components/molecules/core/_models';
import axiosInstance from '../../../../../../../service/axiosInstance';
import CustomerForm from '../../components/template/CustomerForm';

const EditCustomer: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingCustomer, setExistingCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchSupplier = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/inventory/master-data/Customer/${id}`);
                    setExistingCustomer(response.data.data);
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

    if (!existingCustomer) {
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
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: false,
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
            <CustomerForm
                mode='edit'
                successMessage='Kategori Produk berhasil di ubah.'
                headTitle='Ubah Kategori Produk'
                buttonTitle='Ubah'
                cancelButtonLabel='Kembali'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditCustomer;