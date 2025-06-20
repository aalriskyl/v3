import clsx from "clsx";
import { FC, useMemo } from "react";
// import { initialQueryState } from '@metronic/helpers'
// import { useQueryRequest } from '../../../molecules/core/QueryRequestProvider'
import { HeaderContext } from "@tanstack/react-table";
import { ListView } from "../../../../core/_models";

type Props = {
  className?: string;
  title?: string;
  tableProps: HeaderContext<ListView, unknown>;
};

const UserCustomHeader: FC<Props> = ({ className, title, tableProps }) => {
  return <td className={clsx(className, "p-4")}>{title}</td>;
};

export { UserCustomHeader };
