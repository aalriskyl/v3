import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from '../core/ListViewProvider';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import { UomSectionListHeader } from './UomSectionListHeader';

interface TableListHeaderProps {
    onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC<TableListHeaderProps> = ({ onSearch }) => {
    const { selected } = useListView();

    return (
        <div className="card-header border-0 pt-6">
            <UomSectionListHeader />
            <div className="card-toolbar">
                <ListToolbar />
            </div>
        </div>
    );
};

export { TableListHeader };
