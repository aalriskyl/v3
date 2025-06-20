import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import UomTableLayout from "./components/template/UomTableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Inventory',
        path: '/inventory',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Master Data',
        path: '/inventory/masterdata',
        isSeparator: false,
        isActive: true,
    },
]

const UomPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Satuan/UOM</PageTitle>
            </div>
            <div>
                <Outlet />
                <UomTableLayout children="" />
            </div>
        </main>
    )
}

export default UomPage