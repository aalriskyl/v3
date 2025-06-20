import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import BrandForm from '../../components/template/GoodsForm';


const EditGoodsPage: FC = () => {
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
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Finish Goods',
            path: '/inventory/masterdata/finish-goods',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Finish Goods</PageTitle>
            {/* Add Supplier Form */}
            <BrandForm
                formTitle='Ubah Finish Goods'
                submitButtonLabel='Ubah'
                successMessage='Finish Goods berhasil di ubah'
                headTitle='Ubah Finish Goods'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditGoodsPage;
