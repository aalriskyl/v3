import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { FilterValues } from "../../molecules/header/filters";

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: FilterValues) => void;
  filters: FilterValues; // Changed from initialFilters to filters
}

const TableListHeader: React.FC<TableListHeaderProps> = ({
  onSearch,
  onFilter,
  filters,
}) => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent
        onSearch={onSearch}
        onFilter={onFilter}
        filters={filters}
      />
      <div className="card-toolbar">
        <ListToolbar
          urlImport={"/sales/master-data/customer/import"}
          showExportButton={false}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
