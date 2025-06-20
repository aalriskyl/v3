// CustomerPage.tsx
import { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import CustomerTableLayout from "./components/template/CustomerTableLayout";
import { FilterValues } from "./components/molecules/header/filters";

const pemasokBreadCrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Sales",
    path: "/sales",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "Master Data",
    path: "/sales/masterdata/",
    isSeparator: false,
    isActive: true,
  },
];

const CustomerPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    city: "",
    industry: "",
    status: undefined,
    // category: ''
  });

  // Sync URL parameters with state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      search: params.get("search") || "",
      city: params.get("city") || "",
      industry: params.get("industry") || "",
      // Convert 'status' param to boolean
      status: params.get("status") === "true",
      // category: params.get('category') || ''
    });
  }, [location.search]);

  const handleFilterUpdate = (newFilters: Partial<FilterValues>) => {
    const mergedFilters = { ...filters, ...newFilters };
    const queryParams = new URLSearchParams();

    Object.entries(mergedFilters).forEach(([key, value]) => {
      // Convert value to string and check if it's non-empty
      const stringValue = String(value);
      if (stringValue) {
        queryParams.set(key, stringValue);
      }
    });

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <main>
      <div className="d-flex flex-row w-100 position-relative">
        <PageTitle breadcrumbs={pemasokBreadCrumbs}>Customer</PageTitle>
      </div>
      <div>
        <CustomerTableLayout
        // filters={filters}
        // onFilterUpdate={handleFilterUpdate}
        />
        <Outlet />
      </div>
    </main>
  );
};

export default CustomerPage;
