import { ColumnDef } from "@tanstack/react-table";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserActionsCell } from "./UserActionsCell";
import { Model } from "../../../molecules/core/_models";
import { UserTwoStepsCell } from "../../../../../../../pengajuan/stock-management/entry-stock/components/organisms/table/columns/UserTwoStepsCell";
import { formatDateToMonthYear } from "../../../../../../../../../helper/formatDate";

const entryColumns: ColumnDef<Model>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Entry Stock" className="w-271px" />
    ),
    id: "entry_number",
    accessorKey: "entry_number",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tipe Entry Stock" className="w-271px" />
    ),
    id: "type",
    accessorKey: "type",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Warehouse" className="w-200px" />
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
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
];

export { entryColumns };
