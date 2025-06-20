import { ColumnDef } from "@tanstack/react-table";
import { ServiceActionsCell } from "./ServiceActionsCell";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { ServiceHeader } from "./ServiceHeader";
import { PaymentTerms, Service } from "../../../molecules/core/_models";
import { PaymentHeader } from "./TermsHeader";
import { PaymentActionsCell } from "./PaymentActionsCell";
import { PaymentTermsType } from "../../../core/_models";

const termColumns: ColumnDef<PaymentTermsType>[] = [
  {
    header: (props) => (
      <PaymentHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <PaymentHeader
        tableProps={props}
        title="Nama Payment Terms"
        className="w-800px"
      />
    ),
    id: "name",
    accessorKey: "name",
  },
  {
    header: (props) => (
      <PaymentHeader
        tableProps={props}
        title="Invoice Portion"
        className="w-800px"
      />
    ),
    id: "invoice_portion",
    accessorKey: "invoice_portion",
  },
  {
    header: (props) => (
      <PaymentHeader tableProps={props} title="Due Date" className="w-800px" />
    ),
    id: "due_date_based_on",
    accessorKey: "due_date_based_on",
  },
  {
    header: (props) => (
      <PaymentHeader tableProps={props} title="Credit" className="w-800px" />
    ),
    id: "credit_days",
    accessorKey: "credit",
  },
  {
    header: (props) => (
      <PaymentHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "actions",
    cell: (info) => <PaymentActionsCell id={info.row.original.id as any} />,
  },
];

export { termColumns };
