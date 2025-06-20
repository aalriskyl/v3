import { useListView } from '../core/ListViewProvider';
import { SectionInvoiceSearch } from './SectionInvoiceSearch ';

const InvoiceSectionListHeader: React.FC = () => {
    return (
        <div className="card-header border-0 pt-6">
            <SectionInvoiceSearch />
        </div>
    );
};

export { InvoiceSectionListHeader };
