import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialDetailActionsCell } from "./MaterialDetailActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { MaterialModel } from "../../../molecules/core/_models";
import { ModuleView, PaymentTermsType } from "../../../../core/_models";

const termsOfPaymentColumns: ColumnDef<PaymentTermsType>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nama Payment Terms" className="w-350px" />
    ),
    id: "name",
    accessorKey: "name",
    cell: (info) => info.getValue() as string,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Invoice Portion" className="w-230px" />
    ),
    id: "invoice_portion",
    accessorKey: "invoice_portion",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Due Date" className="w-300px" />
    ),
    id: "due_date",
    accessorKey: "due_date",
    cell: (info) => formatDate(new Date(info.getValue() as string)),
  },
  // {
  //   header: (props) => <UserCustomHeader title="Credit" className="w-238px" />,
  //   id: "credit",
  //   accessorKey: "credit",
  // },
];

export { termsOfPaymentColumns };

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
