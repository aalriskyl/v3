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
import { formatDateToMonthYear } from "../../../../../../../../helper/formatDate";

const viewColumns: ColumnDef<ListView>[] = [
  {
    header: (props) => <UserCustomHeader title="No" className="w-10px" />,
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <UserCustomHeader title="Nomor Purchase Request" className="w-900px" />
    ),
    id: "purchase_order",
    accessorKey: "purchase_order.no_purchase_order",
  },
  {
    header: (props) => (
      <UserCustomHeader title="Tanggal Pembuatan" className="w-900px" />
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
