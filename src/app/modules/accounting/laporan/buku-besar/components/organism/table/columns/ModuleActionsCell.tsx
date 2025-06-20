import { FC, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "@metronic/helpers";

type Props = {
  id: any;
};

const ModuleActionsCell: FC<Props> = ({ id }) => {

  return <>
    <Link
      to={`detail/${id}`}
      className='text-left'
    >
      <span className="fs-7 text-success">
        Detail
      </span>

    </Link>
  </>;
};

export { ModuleActionsCell };
