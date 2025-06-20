import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import ParentMaterialsTableLayout from "./components/template/ParentMaterialsTableLayout";


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
        isActive: true
    },
    {
        title: 'Master Data',
        path: '/inventory/masterdata',
        isSeparator: false,
        isActive: true,
    },
]

const MaterialsPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Materials</PageTitle>
            </div>
            <div>
                <Outlet />
                <ParentMaterialsTableLayout />
            </div>
        </main>
    )
}

export default MaterialsPage