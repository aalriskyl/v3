import { ColumnDef } from "@tanstack/react-table";
import { ModuleHeader } from "./ModuleHeader";
import { ListDataType, SubRowType } from "../../../core/_model";

export const moduleColumns: ColumnDef<ListDataType>[] = [
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Akun" className="w-300px" />
    ),
    id: "akun",
    accessorKey: "name", // Use "name" from ListDataType
    cell: (info) => {
      const row = info.row;
      const value = info.getValue() as string; // Explicitly type the value
      return (
        <div className="w-300px">
          {row.getIsExpanded() ? (
            <div>
              <div>{value}</div>
              {row.original.subRows?.map((subRow, index) => ( // Access subRows from row.original
                <div key={index}>{subRow.akun}</div> // No need to cast, subRow is already SubRowType
              ))}
            </div>
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Tanggal" className="w-160px" />
    ),
    id: "tanggal",
    accessorKey: "tanggal", // Use "tanggal" from ListDataType
    cell: (info) => {
      const row = info.row;
      const value = info.getValue() as string; // Explicitly type the value
      return (
        <div>
          {row.getIsExpanded() ? (
            <div>
              <div>{value}</div>
              {row.original.subRows?.map((subRow, index) => ( // Access subRows from row.original
                <div key={index}>{subRow.akun}</div> // No need to cast, subRow is already SubRowType
              ))}
            </div>
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Total Debit" className="w-160px" />
    ),
    id: "totalDebit",
    accessorKey: "totalDebit", // Use "totalDebit" from ListDataType
    cell: (info) => {
      const row = info.row;
      const value = info.getValue() as string; // Explicitly type the value
      return (
        <div>
          {row.getIsExpanded() ? (
            <div>
              <div>{value}</div>
              {row.original.subRows?.map((subRow, index) => ( // Access subRows from row.original
                <div key={index}>{subRow.debit}</div> // No need to cast, subRow is already SubRowType
              ))}
            </div>
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Total Kredit" className="w-160px" />
    ),
    id: "totalKredit",
    accessorKey: "totalCredit", // Use "totalCredit" from ListDataType
    cell: (info) => {
      const row = info.row;
      const value = info.getValue() as string; // Explicitly type the value
      return (
        <div>
          {row.getIsExpanded() ? (
            <div>
              <div>{value}</div>
              {row.original.subRows?.map((subRow, index) => ( // Access subRows from row.original
                <div key={index}>{subRow.credit}</div> // No need to cast, subRow is already SubRowType
              ))}
            </div>
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    header: (props) => (
      <ModuleHeader tableProps={props} title="Aksi" className="w-10px" />
    ),
    id: "aksi",
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        style={{
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: "0 8px",
        }}
      >
        {row.getIsExpanded() ? "▼" : "▶"}
      </button>
    ),
  },
];