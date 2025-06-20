import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '@metronic/layout/core'
import CustomerTableLayout from './components/template/CustomerTableLayout'


const CompanyPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Perusahaan</PageTitle>
            </div>
            <div>
                <CustomerTableLayout />
                <Outlet />

            </div>
        </main >
    )
}

export default CompanyPage
