import { useListView } from '../core/ListViewProvider';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import { UomSectionListHeader } from './UomSectionListHeader';
import { ListToolbar } from '../../organisms/ExportTool';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const TableListHeader: React.FC = ({
}) => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent
      />

      <div className="card-toolbar">
        <ListToolbar />
      </div>
    </div>
  );
};

export { TableListHeader };
