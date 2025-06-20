import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { LayananDetailActionsCell } from "./LayananDetailActionsCell";
import { LayananModel } from "../../../molecules/core/_models";
import { LayananCustomHeader } from "./LayananCustomHeader";

const layananDetailColumns: ColumnDef<LayananModel>[] = [
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
      <LayananCustomHeader title="Harga" className="w-271px" />
    ),
    id: "harga",
    accessorKey: "price",
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
