import { FC } from 'react';

type Props = {
  status?: boolean;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case true:
      badgeClass = 'badge-light-active';
      break;
    case false:
      badgeClass = 'badge-light-inactive';
      break;
    default:
      badgeClass = 'badge-light';
      break;
  }

  return (
    <>
      {status !== undefined && (
        <div className={`badge ${badgeClass} fw-bolder text-capitalize`}>
          {status ? 'Active' : 'Inactive'}
        </div>
      )}
    </>
  );
};

export { UserTwoStepsCell };