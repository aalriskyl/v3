// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from "../core/ListViewProvider";
import { SectionMaterialSearch } from "./SectionMaterialSearch";
// import { UsersListSearchComponent } from './UsersListSearchComponent';

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
}

const MaterialSectionListHeader: React.FC<TableListHeaderProps> = ({
  onSearch,
}) => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <SectionMaterialSearch onSearch={onSearch} />
    </div>
  );
};

export { MaterialSectionListHeader };
