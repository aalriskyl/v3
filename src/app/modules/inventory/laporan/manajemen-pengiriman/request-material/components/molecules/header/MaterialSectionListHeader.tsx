import { useListView } from '../core/ListViewProvider';
import { SectionMaterialSearch } from './SectionMaterialSearch';


const MaterialSectionListHeader: React.FC = () => {

    return (
        <div className="card-header border-0 pt-6">
            <SectionMaterialSearch />
        </div>
    );
};

export { MaterialSectionListHeader };
