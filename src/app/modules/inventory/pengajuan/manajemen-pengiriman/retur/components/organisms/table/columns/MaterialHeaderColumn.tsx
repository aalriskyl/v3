import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { MaterialManajemenPengeriman } from "../../../template/RefactoredForm";
type Props = {
  header: Header<MaterialManajemenPengeriman, unknown>;
};

const MaterialHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { MaterialHeaderColumn };
