import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { PaymentTerms, Service } from "../../../molecules/core/_models";
import { PaymentTermsType } from "../../../core/_models";

type Props = {
  header: Header<PaymentTermsType, unknown>;
};

const PaymentHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { PaymentHeaderColumn };
