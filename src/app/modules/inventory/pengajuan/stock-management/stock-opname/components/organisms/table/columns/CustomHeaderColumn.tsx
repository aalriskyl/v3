import { FC } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { Model } from "../../../molecules/core/_models";
import { getAllOpnameType } from "../../../../core/_models";

type Props = {
  header: Header<getAllOpnameType[0], unknown>;
};

const CustomHeaderColumn: FC<Props> = ({ header }) => {
  return flexRender(header.column.columnDef.header, header.getContext());
};

export { CustomHeaderColumn };
