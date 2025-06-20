import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '@metronic/layout/core'
import TableLayout from './components/template/TableLayout'

// const pemasokBreadCrumbs: Array<PageLink> = [
//     {
//         title: 'Dashboard',
//         path: '/',
//         isSeparator: false,
//         isActive: false,
//     },
//     {
//         title: 'Procurement',
//         path: '/procurement',
//         isSeparator: false,
//         isActive: true,
//     },
//     {
//         title: 'Master Data',
//         path: '/procurement/masterdata',
//         isSeparator: false,
//         isActive: true,
//     },

// ]

const Page: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Entry Stok</PageTitle>
            </div>
            <div>
                <TableLayout />
                <Outlet />

            </div>
        </main >
    )
}

export default Page
