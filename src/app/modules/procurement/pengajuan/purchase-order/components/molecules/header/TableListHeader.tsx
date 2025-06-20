import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import { UsersListSearchComponent } from "./UsersListSearchComponent";
import PurchaseRequestListTemplate from "../../template/PurchaseRequestTable";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

interface TableListHeaderProps {
  // onSearch: (searchTerm: string) => void;
}

const TableListHeader: React.FC<TableListHeaderProps> = ({}) => {
  const { selected } = useListView();

  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      <div className="card-toolbar">
        <ListToolbar
          exportPdf={{
            url: "/procurement/submission/purchase-order/export",
            template: PurchaseRequestListTemplate, // Pass template directly
            fileName: "purchase_request_list",
            layout: "landscape", // Optional layout setting
          }}
          exportExcel={{
            url: `/procurement/submission/purchase-order/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              [
                "No",
                "Nomor Purchase Request",
                "Pemasok",
                "Status Pengiriman",
                "Status Pembayaran",
                "Status Dokumen",
              ],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.no_purchase_order,
                item?.supplier?.name,
                item?.status,
                item?.status,
                item?.status,
              ];
            },
            colWidths: [15, 30, 30, 20, 20, 20],
            fileName: `Purchase-Request-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
          exportCsv={{
            url: `/procurement/submission/purchase-order/export?company_id=${localStorage.getItem(
              "company_id"
            )}`,
            header: [
              [
                "No",
                "Nomor Purchase Request",
                "Pemasok",
                "Status Pengiriman",
                "Status Pembayaran",
                "Status Dokumen",
              ],
            ],
            content(item, index) {
              return [
                (index + 1).toString(),
                item?.no_purchase_order,
                item?.supplier?.name,
                item?.status,
                item?.status,
                item?.status,
              ];
            },
            colWidths: [15, 30, 30, 20, 20, 20],
            fileName: `Purchase-Request-${formatDateToMonthYear(
              new Date().toISOString()
            )}`,
          }}
        />
      </div>
    </div>
  );
};

export { TableListHeader };
