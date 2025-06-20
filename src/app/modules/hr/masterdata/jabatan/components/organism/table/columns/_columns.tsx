import { ColumnDef } from "@tanstack/react-table";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { ListView } from "../../../../core/_models";
import { formatDateToMonthYear } from "../../../../../../../../helper/formatDate";
import { useHelper } from "../../../molecules/core/HelperContext";

const jabatanColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => (
      <UserCustomHeader tableProps={props} title="No" className="w-10px" />
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
      <UserCustomHeader
        tableProps={props}
        title="Nama Jabatan"
        className="w-370px"
      />
    ),
    id: "name",
    accessorKey: "name",
  },
  {
    header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Tanggal Dibuat"
        className="w-370px"
      />
    ),
    id: "created_at",
    accessorKey: "CreatedAt",
    cell: (info) => formatDateToMonthYear(info.row.original.CreatedAt),
  },
  {
    header: (props) => (
      <UserCustomHeader tableProps={props} title="Aksi" className="w-20px" />
    ),
    id: "actions",
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
];

export { jabatanColumns };
