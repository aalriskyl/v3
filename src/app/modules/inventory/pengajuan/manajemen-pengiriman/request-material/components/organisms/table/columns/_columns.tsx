import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { Model } from "../../../molecules/core/_models";
import { formatDateToMonthYear } from "../../../../../../../../../helper/formatDate";

const usersColumns = (status: string): ColumnDef<any>[] => [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Material Request" className="w-370px" />
    ),
    id: "no_material_request",
    accessorKey: "no_material_request",
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-370px" />,
    id: "type",
    accessorKey: "type",
    cell: (info) => {
      const typeValue = info.getValue() as string;
      return typeValue === "Warehouse"
        ? "External"
        : typeValue === "Supplier"
        ? "Internal"
        : typeValue; // fallback for other values
    },
  },
  {
    header: (props) => (
      <UserCustomHeader title="Supplier" className="w-130px" />
    ),
    id: "supplier",
    accessorKey: "supplier",
    cell: (info) => info.row.original.supplier?.name || "-",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Pembuatan" className="w-130px" />
    ),
    id: "created_at",
    accessorKey: "created_at",
    cell: (info) => formatDateToMonthYear(info.getValue() as string),
  },
  {
    header: (props) => <UserCustomHeader title="Status" className="w-10px" />,
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => <UserCustomHeader title="Aksi" className="w-20px" />,
    id: "actions",
    cell: (info) => (
      <UserActionsCell
        id={info.row.original.id}
        status={info.row.original.status}
      />
    ),
  },
];

export { usersColumns };
