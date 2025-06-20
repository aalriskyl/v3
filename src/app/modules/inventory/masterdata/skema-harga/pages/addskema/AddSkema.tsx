import { FC } from 'react';
import { PageLink, PageTitle } from '../../../../../../../_metronic/layout/core'
import UomForm from '../../components/template/SkemaForm';
import SkemaForm from '../../components/template/SkemaForm';

const AddSkema: FC = () => {
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
            path: '/invetory/masterdata/skema-harga',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Skema Harga</PageTitle>
            <SkemaForm
                successMessage='Skema Harga berhasil di tambah'
                headTitle='Tambah Skema Harga'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddSkema;