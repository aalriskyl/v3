// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from '../core/ListViewProvider';
import { SectionMaterialSearch } from './SectionMaterialSearch';
// import { UsersListSearchComponent } from './UsersListSearchComponent';


const MaterialSectionListHeader: React.FC = () => {
    const { selected } = useListView();

    return (
        <div className="card-header border-0 pt-6">
            <SectionMaterialSearch />
        </div>
    );
};

export { MaterialSectionListHeader };
