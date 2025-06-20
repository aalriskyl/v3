import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import TableLayout from "./components/template/TableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Accounting',
        path: '/inventory',
        isSeparator: false,
        isActive: true
    },
    {
        title: 'Master Data',
        path: '/accounting/masterdata',
        isSeparator: false,
        isActive: true,
    },
]

const CoaPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Module</PageTitle>
            </div>
            <div>
                <Outlet />
                <TableLayout />
            </div>
        </main>
    )
}

export default CoaPage;