import { ColumnDef } from "@tanstack/react-table";
import { ServiceActionsCell } from "./ServiceActionsCell";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { ServiceHeader } from "./ServiceHeader";
import { ListDataType } from "../../../core/_model";
import { useHelper } from "../../../molecules/core/HelperContext";

const coaColumns: ColumnDef<ListDataType>[] = [
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => {
      const { pagination } = useHelper();

      return (
        pagination.pageIndex * pagination.pageSize -
        pagination.pageSize +
        info.row.index +
        1
      );
    },
  },
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="Nama" className="w-400px" />
    ),
    id: "name",
    accessorKey: "name",
  },
  {
    header: (props) => (
      <ServiceHeader
        tableProps={props}
        title="Nomor Akun"
        className="w-300px"
      />
    ),
    id: "no_account",
    accessorKey: "no_account",
  },
  {
    header: (props) => (
      <ServiceHeader
        tableProps={props}
        title="Akun Induk"
        className="w-400px"
      />
    ),
    id: "Akun Index",
    accessorKey: "parent_account.name",
    cell: (info) => info.row.original.parent_account?.name || "-",
  },
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="Status" className="w-100px" />
    ),
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <ServiceHeader tableProps={props} title="Aksi" className="w-54px" />
    ),
    id: "actions",
    cell: (info) => <ServiceActionsCell id={info.row.original.id} />,
  },
];

export { coaColumns };
