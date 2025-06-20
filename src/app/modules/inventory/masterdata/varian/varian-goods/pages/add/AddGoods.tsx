import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/GoodsForm';

const AddGoods: FC = () => {
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
            title: 'Finish Goods',
            path: '/invetory/masterdata/finish-goods',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Finish Goods</PageTitle>
            <Form
                formTitle='Tambah Finish Goods?'
                submitButtonLabel='Tambah'
                successMessage='Finish Goods berhasil di tambah'
                headTitle='Tambah Finish Goods'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddGoods;