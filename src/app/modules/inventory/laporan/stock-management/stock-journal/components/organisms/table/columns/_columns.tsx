import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { CatatanPengirimanModel } from "../../../molecules/core/_models";

const formatDate = (date: string | any) => {
  if (!date) return "-"; // Return dash if no date is provided
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date)); // Format date in Indonesian locale
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
    id: "material.name",
    accessorKey: "material.name",
  },
  // {
  //   header: (props) => (
  //     <UserCustomHeader title="Stok Awal" className="w-271px" />
  //   ),
  //   id: "stock_awal",
  //   accessorKey: "stock_awal",
  // },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Quantity" className="w-271px" />
    ),
    id: "amount",
    accessorKey: "amount",
  },
  // {
  //   header: (props) => (
  //     <UserCustomHeader title="Stok Akhir" className="w-271px" />
  //   ),
  //   id: "stock_akhir",
  //   accessorKey: "stock_akhir",
  // },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan Uom" className="w-271px" />
    ),
    id: "material.uom_default.name",
    accessorKey: "material.uom_default.name",
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-271px" />,
    id: "tipe",
    accessorKey: "type",
    cell: (info) => (info.getValue() === 0 ? "IN" : "OUT"),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Posting" className="w-46px" />
    ),
    id: "CreatedAt",
    accessorKey: "CreatedAt", // Access creation date from data
    cell: (info) => formatDate(info.getValue()), // Format the date using formatDate function
  },
  // {
  //   header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
  //   id: "actions",
  //   cell: (info) => <UserActionsCell id={info.row.original.id} />,
  // },
];

export { usersColumns };
