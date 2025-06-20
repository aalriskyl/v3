import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { ListDataType } from "../../../core/_model";

type Props = {
  header: Header<ListDataType, unknown>;
};

const ModuleHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { ModuleHeaderColumn };
