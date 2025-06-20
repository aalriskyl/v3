import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  SectionMaterialSearch,
  UsersListSearchComponent,
} from "./UsersListSearchComponent";



const TableListHeader: React.FC = () => {
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar />
      </div>
    </div>
  );
};

const TableListMaterialHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <SectionMaterialSearch />
    </div>
  );
};

export { TableListHeader, TableListMaterialHeader };
