import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { Gudang } from "../../../molecules/core/_models";

const gudangColumns: ColumnDef<Gudang>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nama Gudang" className="w-800px" />
    ),
    id: "nama-gudang",
    accessorKey: "name",
  },
  {
    header: (props) => <UserCustomHeader title="Alamat" className="w-500px" />,
    id: "alamat",
    accessorKey: "address",
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-54px" />,
    id: "actions",
    cell: (info) => <UserActionsCell id={info.row.original.id as any} />,
  },
];

export { gudangColumns };
