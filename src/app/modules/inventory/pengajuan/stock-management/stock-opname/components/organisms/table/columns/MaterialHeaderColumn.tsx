import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
type Props = {
  header: Header<any, unknown>;
};

const MaterialHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { MaterialHeaderColumn };
