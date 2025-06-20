import { useListView } from '../core/ListViewProvider';
import { SectionTermsSearch } from './SectionTermsSearch';

const TermsSectionListHeader: React.FC = () => {
    return (
        <div className="card-header border-0 pt-6">
            <SectionTermsSearch />
        </div>
    );
};

export { TermsSectionListHeader };
