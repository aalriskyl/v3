import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { MaterialModel } from "../../../molecules/core/_models";
import { ModuleView, PaymentTermsType } from "../../../../core/_models";

type Props = {
  row: Row<any>;
};

const StockCustomRow: FC<Props> = ({ row }) => (
  <tr>
    {row.getVisibleCells().map((cell) => {
      return (
        <td
          key={cell.id}
          className={clsx({ "w-54px": cell.column.id === "actions" })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      );
    })}
  </tr>
);

export { StockCustomRow };
