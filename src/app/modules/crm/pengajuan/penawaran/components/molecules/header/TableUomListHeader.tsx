import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from '../core/ListViewProvider';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import { MaterialSectionListHeader } from './MaterialSectionListHeader';

interface TableListHeaderProps {
    onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC<TableListHeaderProps> = () => {
    const { selected } = useListView();

    return (
        <div className="card-header border-0 pt-6">
            <MaterialSectionListHeader />
            <div className="card-toolbar">
                <ListToolbar />
            </div>
        </div>
    );
};

export { TableListHeader };
