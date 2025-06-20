import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '@metronic/layout/core'
import BrandTableLayout from './components/template/BrandTableLayout'


const BrandPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Brand</PageTitle>
            </div>
            <div>
                <BrandTableLayout />
                <Outlet />

            </div>
        </main >
    )
}

export default BrandPage
