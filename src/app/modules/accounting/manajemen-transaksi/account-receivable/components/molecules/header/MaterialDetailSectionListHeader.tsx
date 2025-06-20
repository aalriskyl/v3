// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from "../core/ListViewProvider";
import { SectionMaterialDetailSearch } from "./SectionMaterialDetailSearch";
// import { UsersListSearchComponent } from './UsersListSearchComponent';

const MaterialDetailSectionListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <SectionMaterialDetailSearch />
    </div>
  );
};

export { MaterialDetailSectionListHeader };
