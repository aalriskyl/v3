import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { Model } from "../../../molecules/core/_models";
import { getAllOpnameType } from "../../../../../../../pengajuan/stock-management/stock-opname/core/_models";
import { formatDateToMonthYear } from "../../../../../../../../../helper/formatDate";

const formatDate = (dateString: string): string => {
  // Ubah format dari 'DD-MM-YYYY' menjadi 'YYYY-MM-DD'
  const [day, month, year] = dateString.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  const date = new Date(formattedDate);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const usersColumns: ColumnDef<getAllOpnameType[0]>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stock Opname Number" className="w-200px" />
    ),
    id: "opname_number",
    accessorKey: "opname_number",
  },

  {
    header: (props) => (
      <UserCustomHeader title="Warehouse" className="w-370px" />
    ),
    id: "warehouse.name",
    accessorKey: "warehouse.name",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Pembuatan" className="w-200px" />
    ),
    id: "created_at",
    accessorKey: "created_at",
    cell: (info) => formatDateToMonthYear(info.getValue() as string),
  },
  {
    header: (props) => <UserCustomHeader title="Status" className="w-10px" />,
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => <UserActionsCell id={info.row.original.id as any} />,
  },
];

export { usersColumns };
