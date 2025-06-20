import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { ListDataType } from "../../../core/_model";

type Props = {
  row: Row<ListDataType>;
};

const ServiceRow: FC<Props> = ({ row }) => (
  <>
    <tr>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={clsx({
            "max-w-55px": cell.column.id === "actions",
            "text-center": cell.column.id === "aksi",
          })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>

    {row.getIsExpanded() && (
      <tr className="bg-light">
        <td colSpan={row.getVisibleCells().length}>
          <div className="p-4">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th className="w-50%">Akun</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                </tr>
              </thead>
              <tbody>
                {row.original.subRows?.map((subRow, index) => (
                  <tr key={subRow.id}> {/* Gunakan ID unik */}
                    <td className="ps-5">{subRow.no_account}</td>
                    <td>{subRow.totalDebit}</td>
                    <td>{subRow.totalCredit}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="fw-bold">
                <tr>
                  <td>Total</td>
                  <td>{row.original.totalDebit}</td>
                  <td>{row.original.totalCredit}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </td>
      </tr>
    )}
  </>
);

export { ServiceRow };