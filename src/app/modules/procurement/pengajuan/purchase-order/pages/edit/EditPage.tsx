import React, { FC, useEffect, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';
import { getSinglePurchaseOrder } from '../../core/_request';
import { useParams } from 'react-router-dom';

const EditPage: FC = () => {
    const { id } = useParams<{ id: string }>(); // Correctly call useParams
    const [purchaseOrder, setPurchaseOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            title: 'Pengajuan',
            path: '/procurement/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Purchase Request',
            path: '/procurement/pengajuan/purchase-request',
            isSeparator: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            try {
                const data = await getSinglePurchaseOrder(id); // Use the id from useParams
                setPurchaseOrder(data);
            } catch (err) {
                // setError(err); // Set the error state
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseOrder();
    }, [id]); // Add id as a dependency to refetch if it changes

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
    }

    if (error) {
        // return <div>Error fetching purchase order: {error.message}</div>; // Display error message
    }

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Purchase Request</PageTitle>
            {/* Add Purchase Order Form */}
            <Form
                mode='edit'
                formTitle='Edit Purchase Request?'
                submitButtonLabel='Edit'
                successMessage='Purchase Request berhasil di ubah'
                headTitle='Ubah Purchase Request'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar'
                // initialValues={purchaseOrder} // Pass the fetched data to the form
            />
        </>
    );
};

export default EditPage;