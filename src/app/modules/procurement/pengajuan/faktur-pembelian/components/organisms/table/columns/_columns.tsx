import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { ListView } from "../../../../core/_models";
import { formatDateToMonthYear } from "../../../../../../../../helper/formatDate";

const viewColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-2px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Faktur Pembelian" className="w-191px" />
    ),
    id: "no_purchase_invoice",
    accessorKey: "no_purchase_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Purchase Order" className="w-179px" />
    ),
    id: "purchase_order",
    accessorKey: "purchase_order.no_purchase_order",
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
      <UserCustomHeader title="Grand Total" className="w-100px" />
    ),
    id: "grand_total",
    accessorKey: "grand_total",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Total Paid" className="w-100px" />
    ),
    id: "total_paid",
    accessorKey: "total_paid",
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
    header: (props) => (
      <UserCustomHeader title="Status Dokumen" className="w-100px" />
    ),
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-2px text-center align-items-center" />,
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
