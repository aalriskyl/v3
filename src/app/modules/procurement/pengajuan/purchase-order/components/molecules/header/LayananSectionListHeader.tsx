// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from '../core/ListViewProvider';
import { SectionLayananSearch } from './SectionLayananSearch';
// import { UsersListSearchComponent } from './UsersListSearchComponent';

interface TableListHeaderProps {
    // onSearch: (searchTerm: string) => void;
}

const LayananSectionListHeader: React.FC<TableListHeaderProps> = () => {
    const { selected } = useListView();

    return (
        <div className="card-header border-0 pt-6">
            <SectionLayananSearch />
        </div>
    );
};

export { LayananSectionListHeader };
