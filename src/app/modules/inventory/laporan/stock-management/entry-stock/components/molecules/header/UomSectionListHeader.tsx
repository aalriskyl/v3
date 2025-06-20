import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from '../core/ListViewProvider';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import { SectionUomSearch } from './SectionUomSearch';


const UomSectionListHeader: React.FC = () => {
    const { selected } = useListView();

    return (
        <div className="card-header border-0 pt-6">
            <h2>Material</h2>

            <SectionUomSearch />
        </div>
    );
};

export { UomSectionListHeader };
