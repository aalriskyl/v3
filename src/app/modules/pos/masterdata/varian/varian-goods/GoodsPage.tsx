import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '@metronic/layout/core'
import VarianGoodsTableLayout from './components/template/GoodsTableLayout'
const breadCrumbs: Array<PageLink> = [
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
        title: 'Varian',
        path: '/inventory/masterdata/varian',
        isSeparator: false,
        isActive: true,
    },

]

const VariantGoodsPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Varian Finish Goods</PageTitle>
            </div>
            <div>
                <VarianGoodsTableLayout />
                <Outlet />

            </div>
        </main >
    )
}

export default VariantGoodsPage
