import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../../_metronic/layout/core";
import SkemaTableLayout from "./components/template/SkemaTableLayout";


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

const SkemaPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={breadCrumbs}>Skema Harga</PageTitle>
            </div>
            <div>
                <Outlet />
                <SkemaTableLayout />
            </div>
        </main>
    )
}

export default SkemaPage