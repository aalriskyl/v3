import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../../_metronic/layout/core";
import TableLayout from "./components/template/TableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'HR',
        path: '/hr',
        isSeparator: false,
        isActive: true
    },
    {
        title: 'Master Data',
        path: '/hr/masterdata',
        isSeparator: false,
        isActive: true,
    },
]

const PegawaiPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Pegawai</PageTitle>
            </div>
            <div>
                <Outlet />
                <TableLayout />
            </div>
        </main>
    )
}

export default PegawaiPage