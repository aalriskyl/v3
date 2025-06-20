import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/Form';
import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../../../../../service/axiosInstance';
import { Company } from '../../components/molecules/core/_models';
import { getCompanyById } from '../../components/core/_request';

const EditCustomerPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingCustomer, setExistingCustomer] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            // Data dummy
            const dummyCustomer: Company = {
                id: 1,
                name: "PT. Contoh Digital",
                address: "Jl. Sudirman No. 123, Jakarta",
                type: "PT",
                owner: "Budi Santoso",

            };

            // Simulasi delay loading
            setTimeout(() => {
                setExistingCustomer(dummyCustomer);
                setIsLoading(false);
            }, 500);
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
            title: 'Company',
            path: '/company',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Perusahaan',
            path: '/company/perusahaan',
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Perusahaan</PageTitle>
            <Form
                submitButtonLabel='Ubah'
                cancelButtonLabel='Kembali'
                mode="edit"
                headTitle="Edit Perusahaan"
                buttonTitle="Ubah"
                message="Pastikan bahwa informasi sudah benar."
                successMessage="Perusahaan berhasil diperbarui."
            // initialValues={existingCustomer} // Asumsikan komponen Form menerima prop initialValues
            />
        </>
    );
};

export default EditCustomerPage;