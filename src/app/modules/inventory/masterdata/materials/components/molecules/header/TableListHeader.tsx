import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  UsersListSearchComponent,
  UsersListSearchUomComponent,
  UsersListSearchSupplierComponent,
  UsersListSearchUomDetailComponent,
  UsersListSearchSupplierDetailComponent,
  SupplierUom,
} from "./UsersListSearchComponent";
import { Supplier } from "../core/_models";
import { useMaterials } from "../../template/ParentMaterialsTableLayout";

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC = () => {
  const { setSearchTerm } = useMaterials();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar
          urlImport={"/inventory/master-data/material/import"}
          templatePath="/material/material-import.xlsx"
          showExportButton={false}
        />
      </div>
    </div>
  );
};

export default TableListHeader;

const TableListUomHeader: React.FC = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchUomComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">{/* end::Group actions */}</div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListUomDetailHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchUomDetailComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListSupplierHeader = () => {
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchSupplierComponent />
      <div className="card-toolbar">{/* Toolbar content */}</div>
    </div>
  );
};
const TableListSupplierDetailHeader = () => {
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

export {
  TableListHeader,
  TableListUomHeader,
  TableListSupplierHeader,
  TableListUomDetailHeader,
  TableListSupplierDetailHeader,
};
