import { ColumnDef } from "@tanstack/react-table";
import { ServiceActionsCell } from "./ServiceActionsCell";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { ServiceHeader } from "./ServiceHeader";
import { ListDataType } from "../../../core/_models";

const coaColumns: ColumnDef<ListDataType>[] = [
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <ServiceHeader
        tableProps={props}
        title="Nama Payment"
        className="w-800px"
      />
    ),
    id: "name",
    accessorKey: "name",
  },
  {
    header: (props) => (
      <ServiceHeader
        tableProps={props}
        title="Tanggal Pembuatan"
        className="w-800px"
      />
    ),
    id: "created_at",
    accessorKey: "created_at",
    cell: (info) => formatDate(info.getValue() as string),
  },
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="Status" className="w-46px" />
    ),
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "actions",
    cell: (info) => <ServiceActionsCell id={info.row.original.id} />,
  },
];

export { coaColumns };

const formatDate = (date: string) => {
  if (!date || isNaN(new Date(date).getTime())) return "-"; // Check for invalid date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
};
