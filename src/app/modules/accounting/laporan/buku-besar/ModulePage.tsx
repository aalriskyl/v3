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
        path: '/accounting',
        isSeparator: false,
        isActive: true
    },
    {
        title: 'Laporan',
        path: '/accounting/laporan',
        isSeparator: false,
        isActive: true,
    },
]

const ModulePage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Buku Besar</PageTitle>
            </div>
            <div>
                <Outlet />
                <TableLayout />
            </div>
        </main>
    )
}

export default ModulePage;