import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

interface TableListHeaderProps {
  onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC = () => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar
        // exportExcel={{
        //   url: `/sales/submission/sales-order/export?company_id=${localStorage.getItem(
        //     "company_id"
        //   )}`,
        //   header: [
        //     [
        //       "No",
        //       "Nomor Faktur Penjualan",
        //       "Nomor Sales Order",
        //       "Tanggal Request Order",
        //       "Grand Total",
        //       "Due Date",
        //       "Status Dokumen",
        //       "Status Pembayaran",
        //     ],
        //   ],
        //   content(item, index) {
        //     return [
        //       (index + 1).toString(),
        //       item?.no_sales_invoice,
        //       item?.sales_order?.no_sales_order,
        //       item?.grand_total,
        //       formatDateToMonthYear(item?.due_date),
        //       item?.status,
        //       item?.status_payment,
        //     ];
        //   },
        //   colWidths: [15, 30, 15, 20, 20, 20, 20],
        //   fileName: `Faktur-Penjualan-${formatDateToMonthYear(
        //     new Date().toISOString()
        //   )}`,
        // }}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
