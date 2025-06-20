import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

interface TableListHeaderProps {
  // onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar
          exportExcel={{
            url: `/sales/submission/sales-order/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              [
                "No",
                "Nomor Sales Order",
                "Customer",
                "Tanggal Request Order",
                "Status Pengiriman",
                "Status Payment",
                "Status Dokumen",
              ],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.no_sales_order,
                item?.customer?.name,
                formatDateToMonthYear(item?.CreatedAt),
                item?.status_delivery,
                item?.status_payment,
                item?.status,
              ];
            },
            colWidths: [15, 30, 15, 20, 20, 20, 20],
            fileName: `Request-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
          exportCsv={{
            url: `/sales/submission/sales-order/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              [
                "No",
                "Nomor Sales Order",
                "Customer",
                "Tanggal Request Order",
                "Status Pengiriman",
                "Status Payment",
                "Status Dokumen",
              ],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.no_sales_order,
                item?.customer?.name,
                formatDateToMonthYear(item?.CreatedAt),
                item?.status_delivery,
                item?.status_payment,
                item?.status,
              ];
            },
            colWidths: [15, 30, 15, 20, 20, 20, 20],
            fileName: `Request-Order-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
