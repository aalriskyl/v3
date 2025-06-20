import clsx from "clsx";
import { FC } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { ListDataType, SubRowType } from "../../../core/_model";

type Props = {
  row: Row<ListDataType>;
};

const ServiceRow: FC<Props> = ({ row }) => (
  <>
    {/* Parent Row */}
    <tr>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={clsx({
            "text-center": cell.column.id === "aksi",
            "align-middle": true,
          })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>

    {/* Expanded Sub-Rows */}
    {row.getIsExpanded() && (
      <tr>
        <td colSpan={row.getVisibleCells().length} className="p-0">
          <div style={{ paddingLeft: "3.3rem" }}> {/* Padding for alignment */}
            <table className="table align-middle table-border-dashed table-bordered fs-7 w-100">
              <thead>
                <tr>
                  <th className="text-start" style={{ width: '300px' }}>Akun</th>
                  <th className="text-start" style={{ width: '160px' }}>Debit</th>
                  <th className="text-start" style={{ width: '160px' }}>Kredit</th>
                </tr>
              </thead>
              <tbody>
                {row.original.subRows?.map((subRow: SubRowType) => (
                  <tr key={subRow.id}>
                    <td className="text-start">
                      <span>{subRow.akun}</span>
                    </td>
                    <td className="text-start">{subRow.debit}</td>
                    <td className="text-end">{subRow.credit}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="fw-bold">
                <tr>
                  <td className="text-start">Total</td>
                  <td className="text-end">{row.original.totalDebit}</td>
                  <td className="text-end">{row.original.totalCredit}</td>
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