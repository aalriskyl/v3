import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

const TableListHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar
          exportExcel={{
            url: `/accounting/management-transaction/account-receivable/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              ["No", "Nomor Sales Order", "Tanggal Pembuatan", "Status"],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.sales_order?.no_sales_order,
                formatDateToMonthYear(item?.created_at),
                item?.status,
              ];
            },
            colWidths: [15, 30, 30, 20],
            fileName: `Sales-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
          exportCsv={{
            url: `/accounting/management-transaction/account-receivable/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              ["No", "Nomor Sales Order", "Tanggal Pembuatan", "Status"],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.sales_order?.no_sales_order,
                formatDateToMonthYear(item?.created_at),
                item?.status,
              ];
            },
            colWidths: [15, 30, 30, 20],
            fileName: `Sales-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
        />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { TableListHeader };
