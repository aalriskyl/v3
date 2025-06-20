// Import necessary modules and components
import { ColumnDef } from "@tanstack/react-table";
import { UserCustomHeader } from "./UserCustomHeader";
import { UserActionsCell } from "./UserActionsCell";
import { Model } from "../../../molecules/core/_models";
import { UserTwoStepsCell } from "../../../../../../../pengajuan/stock-management/entry-stock/components/organisms/table/columns/UserTwoStepsCell";

// Function to format date strings
const formatDate = (date: string | any) => {
  if (!date) return "-"; // Return dash if no date is provided
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date)); // Format date in Indonesian locale
};

// Define the columns for the entry table
const entryColumns: ColumnDef<Model>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1, // Display row index + 1
  },
  {
    header: (props) => <UserCustomHeader title="Gudang" className="w-271px" />,
    id: "warehouse.name",
    accessorKey: "warehouse.name", // Access warehouse name from data
  },
  {
    header: (props) => (
      <UserCustomHeader title="Material" className="w-271px" />
    ),
    id: "material.name",
    accessorKey: "material.name", // Access material name from data
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Awal" className="w-271px" />
    ),
    id: "stock_awal",
    accessorKey: "stock_awal", // Access initial stock from data
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Quantity" className="w-271px" />
    ),
    id: "amount",
    accessorKey: "amount", // Access stock quantity from data
  },
  {
    header: (props) => (
      <UserCustomHeader title="Stok Akhir" className="w-271px" />
    ),
    id: "stock_akhir",
    accessorKey: "stock_akhir", // Access final stock from data
  },
  {
    header: (props) => (
      <UserCustomHeader title="Satuan Uom" className="w-271px" />
    ),
    id: "material.uom_default.name",
    accessorKey: "material.uom_default.name", // Access unit of measure from data
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-271px" />,
    id: "tipe",
    accessorKey: "type",
    cell: (info) => (info.getValue() === 0 ? "IN" : "OUT"),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tipe Dokumen" className="w-271px" />
    ),
    id: "doc_type",
    accessorKey: "doc_type", // Access unit of measure from data
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
  //   header: (props) => <User CustomHeader title="Aksi" className="w-20px" />,
  //   id: 'actions',
  //   cell: (info) => <User ActionsCell id={info.row.original.id} />, // Optional actions cell
  // },
];

// Export the defined columns for use in other components
export { entryColumns };
