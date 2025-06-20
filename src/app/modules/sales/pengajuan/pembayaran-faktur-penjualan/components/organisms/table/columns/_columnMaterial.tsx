import { ColumnDef } from "@tanstack/react-table";
// import { UserTwoStepsCell } from './UserTwoStepsCell'
import { MaterialActionsCell } from "./MaterialActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { MaterialModel } from "../../../molecules/core/_models";

const materialColumns: ColumnDef<MaterialModel>[] = [
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
    accessorKey: "material",
  },
  {
    header: (props) => <UserCustomHeader title="Jumlah" className="w-271px" />,
    id: "jumlah",
    accessorKey: "jumlah",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan UOM" className="w-271px" />
    ),
    id: "uom",
    accessorKey: "uom",
  },
  {
    header: (props) => <UserCustomHeader title="Harga" className="w-271px" />,
    id: "harga",
    accessorKey: "harga",
  },
  {
    header: (props) => <UserCustomHeader title="Barcode" className="w-271px" />,
    id: "barcode",
    accessorKey: "barcode",
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => <MaterialActionsCell id={info.row.original.id as any} />,
  },
];

export { materialColumns };
