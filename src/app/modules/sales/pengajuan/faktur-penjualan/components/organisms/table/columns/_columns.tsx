import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { ListView } from "../../../../core/_models";
import { formatDateToMonthYear } from "../../../../../../../../helper/formatDate";

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};

const viewColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-2px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Faktur Penjualan" className="w-140px" />
    ),
    id: "no_sales_invoice",
    accessorKey: "no_sales_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Sales Order" className="w-120px" />
    ),
    id: "sales_order_number",
    accessorKey: "sales_order.no_sales_order",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Grand Total" className="w-130px" />
    ),
    id: "grand_total",
    accessorKey: "grand_total",
    cell: (info) => `Rp. ${formatDecimal(info.getValue() as number)}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Due Date" className="w-115px" />
    ),
    id: "due_date",
    accessorKey: "due_date",
    cell: (info) => formatDateToMonthYear(info.getValue() as string),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Status Dokumen" className="w-100px" />
    ),
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Status Pembayaran" className="w-100px" />
    ),
    id: "status_payment",
    accessorKey: "status_payment",
    cell: (info) => (
      <UserTwoStepsCell status={info.row.original.status_payment} />
    ),
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-2px" />,
    id: "actions",
    cell: (info) => (
      <UserActionsCell
        id={info.row.original.id as any}
        status={info.row.original.status}
      />
    ),
  },
];

export { viewColumns };
