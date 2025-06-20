import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { Model } from "../../../molecules/core/_models";

type Props = {
  row: Row<Model>;
};

const CustomRow: FC<Props> = ({ row }) => (
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

export { CustomRow };
