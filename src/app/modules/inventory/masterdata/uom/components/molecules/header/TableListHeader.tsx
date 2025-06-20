import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { UsersListSearchComponent } from "./UsersListSearchComponent";

const TableListHeader: React.FC = () => {
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar
          urlImport={"/inventory/master-data/uom/import"}
          showExportButton={false}
        />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { TableListHeader };
