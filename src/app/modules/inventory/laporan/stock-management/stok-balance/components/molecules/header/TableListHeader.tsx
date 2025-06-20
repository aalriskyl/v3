import { useListView } from '../core/ListViewProvider';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import { UomSectionListHeader } from './UomSectionListHeader';
import { ListToolbar } from '../../organisms/ExportTool';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC<TableListHeaderProps> = ({ onSearch }) => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent onSearch={onSearch} />

      <div className="card-toolbar">
        <ListToolbar />
        
      </div>

    </div>
  );
};

export { TableListHeader };
