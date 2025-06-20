import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { LayananActionsCell } from "./LayananActionsCell";
import { LayananModel } from "../../../molecules/core/_models";
import { LayananCustomHeader } from "./LayananCustomHeader";

const layananColumns: ColumnDef<LayananModel>[] = [
  {
    header: (props) => <LayananCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Layanan" className="w-271px" />
    ),
    id: "service",
    accessorKey: "service",
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Jumlah" className="w-271px" />
    ),
    id: "amount",
    accessorKey: "amount",
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Supplier" className="w-271px" />
    ),
    id: "supplier",
    accessorKey: "supplier",
  },
  {
    header: (props) => (
      <LayananCustomHeader title="Price" className="w-271px" />
    ),
    id: "price",
    accessorKey: "price",
  },
  {
    header: (props) => <LayananCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => <LayananActionsCell id={info.row.original.id as any} />,
  },
];

export { layananColumns };
