import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { PaymentTerms, Service } from "../../../molecules/core/_models";
import { PaymentTermsType } from "../../../core/_models";

type Props = {
  row: Row<PaymentTermsType>;
};

const PaymentRow: FC<Props> = ({ row }) => (
  <tr>
    {row.getVisibleCells().map((cell) => {
      return (
        <td
          key={cell.id}
          className={clsx({ "max-w-55px": cell.column.id === "actions" })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      );
    })}
  </tr>
);

export { PaymentRow };
