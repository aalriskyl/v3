// import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { useListView } from "../core/ListViewProvider";
import { SectionPaymentTermsDetailSearch } from "./SectionPaymentTermsDetailSearch";
// import { UsersListSearchComponent } from './UsersListSearchComponent';

const PaymentTermsSectionListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <SectionPaymentTermsDetailSearch />
    </div>
  );
};

export { PaymentTermsSectionListHeader };
