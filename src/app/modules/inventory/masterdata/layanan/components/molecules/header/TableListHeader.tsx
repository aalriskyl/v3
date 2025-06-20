import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  UsersListSearchComponent,
  UsersListSearchSupplierComponent,
  UsersListSearchSupplierDetailComponent,
} from "./UsersListSearchComponent";

const TableListHeader: React.FC = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar
          urlImport={"/inventory/master-data/service/import"}
          templatePath="/service/service-import.xlsx"
        />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListSupplierHeader: React.FC = () => {
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
