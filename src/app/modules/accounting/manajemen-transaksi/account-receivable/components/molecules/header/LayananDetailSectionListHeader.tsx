// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from "../core/ListViewProvider";
import { SectionLayananDetailSearch } from "./SectionLayananDetailSearch";
// import { UsersListSearchComponent } from './UsersListSearchComponent';

const LayananDetailSectionListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <SectionLayananDetailSearch />
    </div>
  );
};

export { LayananDetailSectionListHeader };
