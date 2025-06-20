import { ColumnDef } from "@tanstack/react-table";
import { UserTwoStepsCell } from "./UserTwoStepsCell";
import { UserActionsCell } from "./UserActionsCell";
import { UserCustomHeader } from "./UserCustomHeader";
import { Model } from "../../../molecules/core/_models";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../../../service/axiosInstance";
import { RejectedConfirmationModal } from "@metronic/layout/components/form/organism/RejectedModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { ListView } from "../../../../core/_models";

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};

const viewColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-43px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader
        title="Nomor Pembayaran Faktur Penjualan"
        className="w-279px"
      />
    ),
    id: "no_payment_sales_invoice",
    accessorKey: "no_payment_sales_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Sales Invoice" className="w-279px" />
    ),
    id: "sales_invoice.no_sales_invoice",
    accessorKey: "sales_invoice.no_sales_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Grand Total" className="w-173px" />
    ),
    id: "sales_invoice.grand_total",
    accessorKey: "sales_invoice.grand_total",
    cell: (info) => `Rp. ${formatDecimal(info.getValue() as number)}`,
  },
  {
    header: (props) => <UserCustomHeader title="Dibayar" className="w-173px" />,
    id: "amount",
    accessorKey: "amount",
    cell: (info) => `Rp. ${formatDecimal(info.getValue() as number)}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Sisa Pembayaran" className="w-173px" />
    ),
    id: "sales_invoice.total_paid",
    accessorKey: "sales_invoice.total_paid",
    cell: (info) => `Rp. ${formatDecimal(info.getValue() as number)}`,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Status" className="w-101px text-center" />
    ),
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

export { viewColumns };
