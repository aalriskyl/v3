import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialDetailActionsCell } from "./MaterialDetailActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { MaterialModel } from "../../../molecules/core/_models";

const materialDetailColumns: ColumnDef<MaterialModel>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Material" className="w-271px" />
    ),
    id: "material",
    accessorKey: "material.name",
    cell: (info) => info.getValue() as string,
  },
  {
    header: (props) => <UserCustomHeader title="Jumlah" className="w-271px" />,
    id: "amount",
    accessorKey: "amount",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan UOM" className="w-271px" />
    ),
    id: "uom",
    accessorKey: "material_uom.uom_actual.name",
    cell: (info) => info.getValue() as string,
  },
  {
    header: (props) => <UserCustomHeader title="Harga" className="w-271px" />,
    id: "harga",
    accessorKey: "price",
  },
  {
    header: (props) => <UserCustomHeader title="Barang Dikirim" className="w-271px" />,
    id: "amount_delivered",
    accessorKey: "amount_delivered",
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => (
      <MaterialDetailActionsCell id={info.row.original.id as any} />
    ),
  },
];

export { materialDetailColumns };
