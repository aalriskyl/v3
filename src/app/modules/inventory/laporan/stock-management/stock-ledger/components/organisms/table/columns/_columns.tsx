import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { CatatanPengirimanModel } from "../../../molecules/core/_models";

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const usersColumns: ColumnDef<CatatanPengirimanModel>[] = [
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
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Awal" className="w-271px" />
    ),
    id: "stock",
    accessorKey: "stock_awal",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Quantity" className="w-271px" />
    ),
    id: "quantity",
    accessorKey: "amount",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Akhir" className="w-271px" />
    ),
    id: "stock_akhir",
    accessorKey: "stock_akhir",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan Uom" className="w-271px" />
    ),
    id: "uom",
    accessorKey: "material.uom_default.name",
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-271px" />,
    id: "tipe",
    accessorKey: "type",
    cell: (info) => (info.getValue() === 0 ? "IN" : "OUT"),
  },
  {
    header: (props) => <UserCustomHeader title="Tipe Dokumen" className="w-46px" />,
    id: "date",
    accessorKey: "doc_type",
    // cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Posting" className="w-271px" />
    ),
    id: "CreatedAt",
    accessorKey: "CreatedAt",
    cell: (info) => formatDate(new Date(info.getValue() as string) as Date),
  },
  
];

export { usersColumns };
