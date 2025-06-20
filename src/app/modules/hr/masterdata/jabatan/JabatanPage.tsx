import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../../_metronic/layout/core";
import TableLayout from "./components/template/TableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'HR',
        path: '/hr',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Master Data',
        path: '/hr/masterdata/',
        isSeparator: false,
        isActive: false,
    },
]

const JabatanPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Jabatan</PageTitle>
            </div>
            <div>
                <Outlet />
                <TableLayout />
            </div>
        </main>
    )
}

export default JabatanPage