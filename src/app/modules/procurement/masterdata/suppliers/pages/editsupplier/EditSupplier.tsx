import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/template/RefactoredForm';
import { Suppliers } from '../../components/molecules/core/_models';
import axiosInstance from '../../../../../../../service/axiosInstance';

const EditSupplierPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingSupplier, setExistingSupplier] = useState<Suppliers | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/procurement/master-data/supplier/${id}`);
                    setExistingSupplier(response.data.data); // Ensure this is the correct structure
                    console.log('Fetched Supplier:', response.data); // Debugging
                    setIsLoading(false);
                } catch (error) {
                    console.error('Failed to fetch supplier data:', error);
                    setError('Failed to fetch supplier data. Please try again.');
                    setIsLoading(false);
                }
            } else {
                setError('Supplier ID is missing.');
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

    if (!existingSupplier) {
        return <div>No supplier data found.</div>;
    }

    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Procurement',
            path: '/procurement',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/procurement/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Suppliers',
            path: '/procurement/masterdata/suppliers',
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Supplier</PageTitle>
            <Form
                mode="edit"
                defaultValues={{
                    name: existingSupplier.name,
                    email: existingSupplier.email,
                    phone: existingSupplier.phone,
                    city_id: existingSupplier.city_id,
                    industry: existingSupplier.industry,
                    address: existingSupplier.address,
                    contact_person: existingSupplier.contact_person,
                    is_a_company: existingSupplier.is_a_company,
                    is_company_id: existingSupplier.is_company_id,
                }}
                successMessage='Supplier berhasil di ubah'
                headTitle='Ubah Supplier?'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.'
            />
        </>
    );
};

export default EditSupplierPage;