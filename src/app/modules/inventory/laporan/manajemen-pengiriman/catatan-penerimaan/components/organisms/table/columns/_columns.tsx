import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { CatatanPenerimaanModel } from "../../../molecules/core/_models";
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

const usersColumns: ColumnDef<any>[] = [
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
      <UserCustomHeader title="Nomor Catatan" className="w-370px" />
    ),
    id: "no_received_note",
    accessorKey: "no_received_note",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Purchase Request" className="w-130px" />
    ),
    id: "purchase_order",
    accessorKey: "purchase_order",
    cell: (info) =>
      `${(info.row.original as any).purchase_order?.no_purchase_order || "-"}`,
  },
  {
    header: (props) => <UserCustomHeader title="Tipe" className="w-370px" />,
    id: "type",
    accessorKey: "type",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Customer / Supplier" className="w-370px" />
    ),
    id: "konsumen",
    accessorFn: (row) => row.customer?.name || row.supplier?.name || "N/A", // Fallback to supplier if customer is null
    cell: (info) => info.getValue(),
  },
  {
    header: (props) => <UserCustomHeader title="Gudang" className="w-130px" />,
    id: "warehouse",
    accessorKey: "warehouse",
    cell: (info) => `${info.row.original.warehouse?.name || "-"}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Pembuatan" className="w-130px" />
    ),
    id: "CreatedAt",
    accessorKey: "CreatedAt",
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
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
];

export { usersColumns };
