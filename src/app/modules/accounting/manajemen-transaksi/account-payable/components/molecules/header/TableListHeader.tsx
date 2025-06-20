import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

const TableListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar
          exportExcel={{
            url: `/accounting/management-transaction/account-payable/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              ["No", "Nomor Purchase Request", "Tanggal Pembuatan", "Status"],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.purchase_order?.no_purchase_order,
                formatDateToMonthYear(item?.created_at),
                item?.status,
              ];
            },
            colWidths: [15, 30, 20, 20],
            fileName: `Purchase-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
          exportCsv={{
            url: `/accounting/management-transaction/account-payable/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              ["No", "Nomor Purchase Request", "Tanggal Pembuatan", "Status"],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.purchase_order?.no_purchase_order,
                formatDateToMonthYear(item?.created_at),
                item?.status,
              ];
            },
            colWidths: [15, 30, 20, 20],
            fileName: `Purchase-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
