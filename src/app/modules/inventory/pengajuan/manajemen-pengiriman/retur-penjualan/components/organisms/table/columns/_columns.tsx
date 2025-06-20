import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { CatatanPengirimanModel } from "../../../molecules/core/_models";
import { ListView } from "../../../../core/_models";
import { useHelper } from "../../../molecules/core/HelperContext";
import { formatDateToMonthYear } from "../../../../../../../../../helper/formatDate";

const formatDate = (date: Date): string => {
  // Gunakan objek Date langsung
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const usersColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
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
      <UserCustomHeader title="Nomor Retur Penjualan" className="w-200px" />
    ),
    id: "no_retur_sales",
    accessorKey: "no_retur_sales",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Retur Pembelian" className="w-200px" />
    ),
    id: "retur_purchase",
    cell: (info) =>
      `${info.row.original.retur_purchase?.no_retur_purchase || "-"}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Pengiriman" className="w-130px" />
    ),
    id: "delivery_note",
    accessorKey: "delivery_note",
    cell: (info) =>
      `${info.row.original.delivery_note?.no_delivery_note || "-"}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Opsi Pengembalian" className="w-130px" />
    ),
    id: "retur_option",
    accessorKey: "retur_option",
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
    header: (props) => <UserCustomHeader title="Status" className="w-130px" />,
    id: "status",
    accessorKey: "status",
    cell: (info) => <UserTwoStepsCell status={info.row.original.status} />,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Aksi" className="w-10px text-center" />
    ),
    id: "actions",
    cell: (info) => (
      <UserActionsCell
        id={info.row.original.id as any}
        status={info.row.original.status}
      />
    ),
  },
];

export { usersColumns };
