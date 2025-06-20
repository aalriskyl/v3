import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageTitle } from "../../../../../_metronic/layout/core";
import BomTableLayout from "./components/template/BomTableLayout";


const BomPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Bill of Material</PageTitle>
            </div>
            <div>
                <Outlet />
                <BomTableLayout />
            </div>
        </main>
    )
}

export default BomPage