import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageTitle } from "@metronic/layout/core";
import TableLayout from "./components/template/TableLayout";

const CatatanPengirimanPage: FC = () => {
  return (
    <main>
      <div className="d-flex flex-row w-100 position-relative">
        <PageTitle>Retur</PageTitle>
      </div>
      <div>
        <Outlet />
        <TableLayout />
      </div>
    </main>
  );
};

export default CatatanPengirimanPage;
