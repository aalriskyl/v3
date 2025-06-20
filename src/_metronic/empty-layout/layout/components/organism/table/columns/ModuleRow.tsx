import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { ListDataType } from "../../../core/_model";

type Props = {
  row: Row<ListDataType>;
};

const ModuleRow: FC<Props> = ({ row }) => (
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

export { ModuleRow };
