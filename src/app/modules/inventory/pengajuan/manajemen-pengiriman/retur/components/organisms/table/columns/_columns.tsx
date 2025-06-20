import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { CatatanPengirimanModel } from "../../../molecules/core/_models";
import { Model } from "../../../../core/_models";

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const usersColumns: ColumnDef<Model>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Retur" className="w-200px" />
    ),
    id: "no_retur",
    accessorKey: "no_retur",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Jenis Retur" className="w-370px" />
    ),
    id: "jenis_retur",
    accessorKey: "jenis_retur",
    cell: (info) => info.getValue(),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Opsi Pengembalian" className="w-100px" />
    ),
    id: "opsi",
    accessorKey: "opsi",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Retur" className="w-200px" />
    ),
    id: "tanggal_retur",
    accessorKey: "tanggal_retur",
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
