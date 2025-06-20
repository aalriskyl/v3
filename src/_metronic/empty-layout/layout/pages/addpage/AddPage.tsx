import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import FormSubmission from '../../components/template/FormSubmission';

const AddCoa: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: "Dashboard",
            path: "/",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Accounting",
            path: "/accounting",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Master Data",
            path: "/accounting/masterdata",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Module",
            path: "/accounting/masterdata/chart-of-account",
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Module</PageTitle>
            <FormSubmission
                mode="create"
                successMessage="Module berhasil ditambahkan"
                headTitle="Tambah Module"
                buttonTitle="Tambah"
                message="Pastikan bahwa semua informasi sudah benar."
                confirmButtonLabel="Tambah"
                cancelButtonLabel="Kembali"
            />
        </>
    );
};

export default AddCoa;