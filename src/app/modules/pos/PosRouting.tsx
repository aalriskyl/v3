import { Route, Routes } from "react-router-dom"
import MasterDataPOSRouting from "./masterdata/MasterDataPOSRouting"

function PosRouting() {

    return (
        <Routes>
            <Route path="masterdata/*" element={<MasterDataPOSRouting/>}/>
        </Routes>
    )

}

export default PosRouting