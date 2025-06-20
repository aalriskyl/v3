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

// Define formatDecimal first so it can be used in the columns
const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const viewColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Pembayaran Faktur" className="w-266px" />
    ),
    id: "no_payment_purchase_invoice",
    accessorKey: "no_payment_purchase_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Faktur Pembelian" className="w-266px" />
    ),
    id: "purchase_invoice.no_purchase_invoice",
    accessorKey: "purchase_invoice.no_purchase_invoice",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Grand Total" className="w-266px" />
    ),
    id: "purchase_invoice.grand_total",
    accessorKey: "purchase_invoice.grand_total",
    cell: (info) => formatDecimal(info.getValue() as number),
  },
  {
    header: (props) => <UserCustomHeader title="Dibayar" className="w-266px" />,
    id: "amount",
    accessorKey: "amount",
    cell: (info) => formatDecimal(info.getValue() as number),
  },
  {
    header: (props) => (
      <UserCustomHeader title="Status" className="w-50px text-center" />
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
