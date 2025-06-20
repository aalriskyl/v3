import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { LayananDetailActionsCell } from "./LayananDetailActionsCell";
import { LayananModel } from "../../../molecules/core/_models";
import { LayananCustomHeader } from "./LayananCustomHeader";

const layananDetailColumns: ColumnDef<any>[] = [
  {
    header: (props) => <LayananCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Layanan" className="w-271px" />
    ),
    id: "layanan",
    accessorKey: "service.name",
    cell: (info) => info.getValue() as string,
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Jumlah" className="w-271px" />
    ),
    id: "jumlah",
    accessorKey: "amount",
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Harga" className="w-271px" />
    ),
    id: "harga",
    accessorKey: "price",
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Total Harga" className="w-271px" />
    ),
    id: "total_harga",
    cell: (info) => info.row.original.amount * info.row.original.price,
  },
  {
    header: (props) => <LayananCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => (
      <LayananDetailActionsCell id={info.row.original.id as any} />
    ),
  },
];

export { layananDetailColumns };
