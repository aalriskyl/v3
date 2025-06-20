import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/JabatanForm';

const AddJabatan: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'HR',
            path: '/hr',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/hr/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Jabatan',
            path: '/hr/masterdata/jabatan',
            isSeparator: false,
            isActive: false,
        },
    ];

    const handleSubmissionDate = (date: string) => {
        console.log('Selected submission date:', date);
    };

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Jabatan</PageTitle>
            <Form
                setSubmissionDate={handleSubmissionDate}
                formTitle='Tambah Jabatan'
                submitButtonLabel='Tambah'
                successMessage='Jabatan berhasil ditambahkan'
                headTitle='Tambah Jabatan'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.'
            />
        </>
    );
};

export default AddJabatan;