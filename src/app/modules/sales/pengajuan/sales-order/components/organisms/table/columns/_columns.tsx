import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { Model } from "../../../molecules/core/_models";


const usersColumns = (status: string): ColumnDef<Model>[] => [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Request Order" className="w-160px" />
    ),
    id: "no_sales_order",
    accessorKey: "no_sales_order",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Customer" className="w-120px" />
    ),
    id: "customer.name",
    accessorKey: "customer.name",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Request Order" className="w-120px" />
    ),
    id: "created_at",
    accessorKey: "created_at",
    cell: (info) => formatDate(info.getValue() as string),
  },
  {
    header: (props) => <UserCustomHeader title="Status Pengiriman" className="w-90px" />,
    id: "status_delivery",
    accessorKey: "status_delivery",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status_delivery} />,
  },
  {
    header: (props) => <UserCustomHeader title="Status Payment" className="w-100px" />,
    id: "status_payment",
    accessorKey: "status_payment",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status_payment} />,
  },
  {
    header: (props) => <UserCustomHeader title="Status Dokumen" className="w-60px" />,
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-10px" />,
    id: "actions",
    cell: (info) => <UserActionsCell status={info.row.original.status} id={info.row.original.id} />,
  },
];

export { usersColumns };

const formatDate = (date: string) => {
  if (!date || isNaN(new Date(date).getTime())) return "-"; // Check for invalid date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
};
