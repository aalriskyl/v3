import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { FilterValues } from "../../molecules/header/filters";

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: FilterValues) => void;
  filters: FilterValues;
}

const TableListHeader: React.FC<TableListHeaderProps> = ({
  onSearch,
  onFilter,
  filters, // Changed prop name
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
          urlImport={"/procurement/master-data/supplier/import"}
          showExportButton={false}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
