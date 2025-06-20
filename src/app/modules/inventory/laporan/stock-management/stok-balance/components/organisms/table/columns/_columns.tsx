import { ColumnDef } from "@tanstack/react-table";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserActionsCell } from "./UserActionsCell";
import { Model } from "../../../molecules/core/_models";
import { UserTwoStepsCell } from "../../../../../../../pengajuan/stock-management/entry-stock/components/organisms/table/columns/UserTwoStepsCell";

const entryColumns: ColumnDef<Model>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader title="Gudang" className="w-271px" />,
    id: "warehouse",
    accessorKey: "warehouse_name",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Material" className="w-271px" />
    ),
    id: "material",
    accessorKey: "material_name",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stock Akhir" className="w-271px" />
    ),
    id: "stock",
    accessorKey: "stock_akhir",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan Uom" className="w-271px" />
    ),
    id: "uom",
    accessorKey: "uom",
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-271px" />,
    id: "tipe",
    accessorKey: "type",
    cell: (info) => (info.getValue() === 0 ? "IN" : "OUT"),
  },
];

export { entryColumns };
