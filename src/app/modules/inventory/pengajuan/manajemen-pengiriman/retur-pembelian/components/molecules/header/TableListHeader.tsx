import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  UsersListSearchComponent,
  UsersListSearchMaterialComponent,
  UsersListSearchMaterialDetailComponent,
} from "./UsersListSearchComponent";

const TableListHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListMaterialHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchMaterialComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}

        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListMaterialDetailHeader = () => {
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchMaterialDetailComponent />
    </div>
  );
};

export {
  TableListHeader,
  TableListMaterialHeader,
  TableListMaterialDetailHeader,
};
