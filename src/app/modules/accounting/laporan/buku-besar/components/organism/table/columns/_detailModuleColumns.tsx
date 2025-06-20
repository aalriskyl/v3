import { ColumnDef } from "@tanstack/react-table";
import { ModuleActionsCell } from "./ModuleActionsCell";
import { ModuleTwoStepsCell } from "./UserTwoStepsCell";
import { ModuleHeader, DetailModuleHeader } from "./ModuleHeader";
import { DetailDataType, ListDataType } from "../../../core/_model";

const detailModuleColumns: ColumnDef<DetailDataType>[] = [
  {
    header: (props) => (
      <DetailModuleHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Tanggal"
        className="w-800px"
      />
    ),
    id: "CreatedAt",
    accessorKey: "CreatedAt",
    cell: (info) => formatDate(info.getValue() as string),
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Transaksi"
        className="w-800px"
      />
    ),
    id: "transaksi",
    cell: (info) => {
      const rowData = info.row.original;
      // Cek sumber transaksi dan ambil nomor transaksi yang sesuai
      if (rowData.sales_invoice?.no_sales_invoice) {
        return rowData.sales_invoice.no_sales_invoice;
      } else if (rowData.purchase_invoice?.no_purchase_invoice) {
        return rowData.purchase_invoice.no_purchase_invoice;
      } else if (rowData.payment_sales_invoice?.no_payment_sales_invoice) {
        return rowData.payment_sales_invoice.no_payment_sales_invoice;
      } else if (rowData.payment_purchase_invoice?.no_payment_purchase_invoice) {
        return rowData.payment_purchase_invoice.no_payment_purchase_invoice;
      } else {
        return "-"; // Jika tidak ada sumber transaksi yang tersedia
      }
    },
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Nomor Dokumen"
        className="w-800px"
      />
    ),
    id: "coa.no_account",
    accessorKey: "coa.no_account",
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Debit"
        className="w-800px"
      />
    ),
    id: "debit",
    cell: (info) => {
      const type = info.row.original.type;
      const amount = info.row.original.amount;
      return type === "Debit" ? toIDR(amount) : "-";
    },
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Credit"
        className="w-800px"
      />
    ),
    id: "credit",
    cell: (info) => {
      const type = info.row.original.type;
      const amount = info.row.original.amount;
      return type === "Kredit" ? toIDR(amount) : "-";
    },
  },
  {
    header: (props) => (
      <DetailModuleHeader
        tableProps={props}
        title="Saldo"
        className="w-800px"
      />
    ),
    id: "saldo_akhir",
    accessorKey: "saldo_akhir",
    cell: (info) => toIDR(info.getValue() as number | null | undefined),
  },
];

const formatDate = (date: string) => {
  if (!date || isNaN(new Date(date).getTime())) return "-"; // Check for invalid date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
};

const toIDR = (value: number | null | undefined) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value ?? 0);
};

export { detailModuleColumns };