// columns/_moduleColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { ModuleHeader } from "./ModuleHeader";
import { ListDataType } from "../../../core/_model";

export const moduleColumns: ColumnDef<ListDataType>[] = [
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="No" className="w-50px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Akun" className="w-300px" />
    ),
    id: "akun",
    accessorKey: "akun",
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Tanggal" className="w-150px" />
    ),
    id: "tanggal",
    accessorKey: "tanggal",
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Total Debit" className="w-200px" />
    ),
    id: "totalDebit",
    accessorKey: "totalDebit",
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Total Kredit" className="w-200px" />
    ),
    id: "totalKredit",
    accessorKey: "totalKredit",
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "aksi",
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: '0 8px'
        }}
      >
        {row.getIsExpanded() ? '▼' : '▶'}
      </button>
    ),
  },
];