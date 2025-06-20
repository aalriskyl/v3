import clsx from "clsx";
import { FC, useMemo } from "react";
import { HeaderContext } from "@tanstack/react-table";
import { ListDataType } from "../../../core/_model";

type Props = {
  className?: string;
  title?: string;
  tableProps: HeaderContext<ListDataType, unknown>;
};
const ModuleHeader: FC<Props> = ({ className, title, tableProps }) => {
  const id = tableProps.column.id;

  return <td className={clsx(className, "p-4")}>{title}</td>;
};

export { ModuleHeader };
