import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { MaterialModel } from "../../../molecules/core/_models";
import { ModuleView, PaymentTermsType } from "../../../../core/_models";

type Props = {
  header: Header<any, unknown>;
};

const StockHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { StockHeaderColumn };
