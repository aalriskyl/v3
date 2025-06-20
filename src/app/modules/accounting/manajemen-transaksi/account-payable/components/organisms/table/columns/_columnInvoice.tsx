import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialDetailActionsCell } from "./MaterialDetailActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { MaterialModel } from "../../../molecules/core/_models";
import { ModuleView, PaymentTermsType } from "../../../../core/_models";
import { formatDateToMonthYear } from "../../../../../../../../helper/formatDate";
import { UserTwoStepsCell } from "./UserTwoStepsCell";

const invoiceColumn: ColumnDef<any>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Faktur Pembelian" className="w-160px" />
    ),
    id: "no_purchase_invoice",
    accessorKey: "no_purchase_invoice",
    cell: (info) => info.getValue() as string,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Grand Total" className="w-290px" />
    ),
    id: "grand_total",
    accessorKey: "grand_total",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Due Date" className="w-150px" />
    ),
    id: "due_date",
    accessorKey: "due_date",
    cell: (info) => formatDateToMonthYear(info.getValue() as string | null),
  },
  {
      header: (props) => (
        <UserCustomHeader title="Status Dokumen" className="w-136px" />
      ),
      id: "status",
      accessorKey: "status",
      cell: (info) => (
        <UserTwoStepsCell status={info.row.original.status} />
      ),
    },
    {
      header: (props) => (
        <UserCustomHeader title="Status Pembayaran" className="w-136px" />
      ),
      id: "status_payment",
      accessorKey: "status_payment",
      cell: (info) => <UserTwoStepsCell status={info.row.original.status_payment} />,
    },
];

export { invoiceColumn };

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
