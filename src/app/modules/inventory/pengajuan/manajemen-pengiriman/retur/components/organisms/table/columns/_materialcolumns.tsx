import { ColumnDef } from "@tanstack/react-table";
import { MaterialActionsCell } from "./MaterialActionsCell";
import { MaterialCustomHeader } from "./MaterialCustomHeader";
import { MaterialManajemenPengeriman } from "../../../template/RefactoredForm";
import { ID } from "@metronic/helpers";

const materialColumns: ColumnDef<any>[] = [
  {
    header: (props) => <MaterialCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <MaterialCustomHeader title="Material" className="w-370px" />
    ),
    id: "material",
    accessorKey: "material.name",
    cell: (info) => info.getValue(),
  },
  {
    header: (props) => (
      <MaterialCustomHeader title="Jumlah" className="w-370px" />
    ),
    id: "jumlah",
    accessorKey: "amount",
  },
  {
    header: (props) => (
      <MaterialCustomHeader title="Satuan UOM" className="w-370px" />
    ),
    id: "satuan_uom",
    accessorKey: "material_uom.uom_actual.name",
    cell: (info) => info.getValue(),
  },
  {
    header: (props) => <MaterialCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => <MaterialActionsCell id={info.row.original.id} />,
  },
];

export { materialColumns };
