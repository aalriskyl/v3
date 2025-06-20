import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import GudangTableLayout from "./components/template/GudangTableLayout";

const breadCrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Inventory",
    path: "/inventory",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Master Data",
    path: "/inventory/masterdata",
    isSeparator: false,
    isActive: true,
  },
];

const GudangPage: FC = () => {
  return (
    <main>
      <div className="d-flex flex-row w-100 position-relative">
        <PageTitle breadcrumbs={breadCrumbs}>Gudang</PageTitle>
      </div>
      <div>
        <Outlet />
        <GudangTableLayout />
      </div>
    </main>
  );
};

export default GudangPage;
