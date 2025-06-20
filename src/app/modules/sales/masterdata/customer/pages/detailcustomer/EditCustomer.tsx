import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/Form';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../../../../service/axiosInstance';
import { Customers } from '../../components/molecules/core/_models';

const EditCustomerPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingCustomer, setExistingCustomer] = useState<Customers | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCustomer = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/sales/master-data/customer/${id}`);
                    setExistingCustomer(response.data.data);
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

        fetchCustomer();
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

    // Breadcrumbs
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Sales',
            path: '/sales',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/sales/masterdata',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Customer',
            path: '/sales/masterdata/customers',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Customer</PageTitle>
            <Form
                // customerId={id}
                mode="edit"
                defaultValues={{
                    name: existingCustomer.name,
                    email: existingCustomer.email,
                    phone: existingCustomer.phone,
                    city_id: existingCustomer.city_id,
                    industry: existingCustomer.industry,
                    address: existingCustomer.address,
                    contact_person: existingCustomer.contact_person,
                    is_a_company: existingCustomer.is_a_company, // Add this
                    is_company_id: existingCustomer.is_company_id // Add this
                }}
                headTitle="Edit Customer"
                buttonTitle="Ubah"
                message="Pastikan bahwa informasi sudah benar."
                successMessage="Customer berhasil diperbarui."
            />
        </>
    );
};

export default EditCustomerPage;