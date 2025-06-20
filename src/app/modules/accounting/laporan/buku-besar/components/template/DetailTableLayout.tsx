import { DetailTable } from "../organism/table/DetailTable";
import { DetailLedgerProvider } from "../core/useContextDetail";
import { DetailTableListHeader } from "../molecules/header/DetailTableListHeader";

const DetailTableLayout = () => {
  return (
    <DetailLedgerProvider>
      <div className="">
        <DetailTableListHeader />
        <DetailTable />
      </div>
    </DetailLedgerProvider>
  );
};

export default DetailTableLayout;
