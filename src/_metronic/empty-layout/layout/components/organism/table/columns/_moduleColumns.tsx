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
      <ModuleHeader tableProps={props} title="Nama" className="w-800px" />
    ),
    id: "name",
    accessorKey: "name",
  },
  {
    header: (props) => (
      <ModuleHeader
        tableProps={props}
        title="Nomor Akun"
        className="w-800px"
      />
    ),
    id: "no_account",
    accessorKey: "no_account",
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Status" className="w-46px" />
    ),
    id: "status",
    accessorKey: "status",
    cell: (info) => <ModuleTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "actions",
    cell: (info) => <ModuleActionsCell id={info.row.original.id} />,
  },
];

export { moduleColumns };
