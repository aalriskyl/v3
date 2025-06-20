import { ColumnDef } from "@tanstack/react-table";
import { ModuleActionsCell } from "./ModuleActionsCell";
import { ModuleTwoStepsCell } from "./UserTwoStepsCell";
import { ModuleHeader } from "./ModuleHeader";
import { ListDataType } from "../../../core/_model";

const moduleColumns: ColumnDef<ListDataType>[] = [
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <ModuleHeader
        tableProps={props}
        title="Akun"
        className="w-800px"
      />
    ),
    id: "coa_name",
    accessorKey: "coa_name",
  },
  {
    header: (props) => (
      <ModuleHeader
        tableProps={props}
        title="Total Debit"
        className="w-800px"
      />
    ),
    id: "total_debit",
    accessorKey: "total_debit",
    cell: (info) => toIDR(info.getValue() as number | null | undefined), // Format ke IDR
  },
  {
    header: (props) => (
      <ModuleHeader
        tableProps={props}
        title="Total Credit"
        className="w-800px"
      />
    ),
    id: "total_credit",
    accessorKey: "total_credit",
    cell: (info) => toIDR(info.getValue() as number | null | undefined), // Format ke IDR
  },
  {
    header: (props) => (
      <ModuleHeader
        tableProps={props}
        title="Total Saldo"
        className="w-800px"
      />
    ),
    id: "total_saldo",
    accessorKey: "total_saldo",
    cell: (info) => toIDR(info.getValue() as number | null | undefined), // Format ke IDR
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "actions",
    cell: (info) => <ModuleActionsCell id={info.row.original.coa_id} />,
  },
];

const toIDR = (value: number | null | undefined) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value ?? 0);
};

export { moduleColumns };