import { FC, useState, useEffect } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { useParams } from 'react-router-dom';
import ServiceFormEdit from '../../components/template/ServiceFormEdit';
import { getServiceById } from '../../components/core/_request';
import ServiceForm from '../../components/template/ServiceForm';

const EditService: FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
    const [serviceData, setServiceData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            title: 'Layanan',
            path: '/inventory/masterdata/layanan',
            isSeparator: false,
            isActive: false,
        },
    ];

    // Fetch service data based on the `id` from the URL
    useEffect(() => {
        const fetchServiceData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getServiceById(id!); // Call the `getServiceById` function
                setServiceData(data); // Set the fetched data
            } catch (err) {
                setError('Failed to fetch service data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    if (!serviceData) {
        return <div>Data tidak ditemukan</div>; // Show message if no data is found
    }

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Layanan</PageTitle>
            <ServiceForm
                mode="edit"
                successMessage="Layanan berhasil diperbarui"
                headTitle="Edit Layanan"
                buttonTitle="Simpan Perubahan"
                message="Apakah Anda yakin ingin menyimpan perubahan?"
                confirmButtonLabel="Simpan"
                cancelButtonLabel="Batal"
            />
        </>
    );
};

export default EditService;