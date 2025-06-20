import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import TableLayout from "./components/template/TableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Breadcrumb',
        path: '/',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Breadcrumb',
        path: '/',
        isSeparator: false,
        isActive: true
    },
    {
        title: 'Breadcrumb',
        path: '/',
        isSeparator: false,
        isActive: true,
    },
]

const ModulePage: FC = () => {
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

export default ModulePage;