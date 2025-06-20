import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  UsersListSearchComponent,
  UsersListSearchSupplierComponent,
  UsersListSearchSupplierDetailComponent,
} from "./UsersListSearchComponent";

const TableListHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar
          urlImport={`/accounting/master-data/coa/import`}
          showExportButton={false}
          templatePath="chart-of-account.xlsx"
        />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListSupplierHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchSupplierComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}

        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListUomDetailHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchSupplierDetailComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { TableListHeader, TableListSupplierHeader, TableListUomDetailHeader };
