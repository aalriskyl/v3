import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import TableLayout from "./components/template/TableLayout";

const Page: FC = () => {
  return (
    <main>
      <div className="d-flex flex-row w-100 position-relative">
        <PageTitle>Faktur Penjualan</PageTitle>
      </div>
      <div>
        <TableLayout />
        <Outlet />
      </div>
    </main>
  );
};

export default Page;
