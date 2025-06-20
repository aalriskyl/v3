import React, { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '../../../../../../../_metronic/layout/core';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/template/SkemaForm';
import { getSchemeById } from '../../core/_request';

const EditSkema: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [existingSkema, setExistingSkema] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getSchemeById(id)
                .then(data => {
                    setExistingSkema(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch skema data. Please try again.');
                    setIsLoading(false);
                });
        } else {
            setError('Skema ID is missing.');
            setIsLoading(false);
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    if (!existingSkema) {
        return <div>No skema data found.</div>;
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
            path: '/inventory/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Skema Harga',
            path: '/inventory/masterdata/skema-harga',
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Skema Harga</PageTitle>
            <Form
                mode="edit"
                submitButtonLabel='Ubah'
                successMessage='Skema Harga berhasil di ubah.'
                headTitle='Ubah Skema Harga'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.'
                cancelButtonLabel='Kembali' />
        </>
    );
};

export default EditSkema;