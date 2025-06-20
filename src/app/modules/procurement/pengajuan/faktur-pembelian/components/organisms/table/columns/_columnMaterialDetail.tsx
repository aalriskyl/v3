import { ColumnDef } from "@tanstack/react-table";
import { MaterialDetailActionsCell } from "./MaterialDetailActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};

export const materialDetailColumns = (
  returPresent?: string | null
): ColumnDef<any>[] => [
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
    header: (props) => (
      <UserCustomHeader
        title={returPresent ? "Jumlah di Retur" : "Jumlah"}
        className="w-271px"
      />
    ),
    id: "amount",
    accessorKey: "amount",
    cell: (info) => formatDecimal(info.getValue() as number),
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
    cell: (info) => formatDecimal(info.getValue() as number),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Total Harga" className="w-271px" />
    ),
    id: "total_harga",
    cell: (info) => {
      const amount = info.row.original.amount;
      const price = info.row.original.price;
      return formatDecimal(amount * price);
    },
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => (
      <MaterialDetailActionsCell id={info.row.original.id as any} />
    ),
  },
];
