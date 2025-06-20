import { FC } from 'react';

type Props = {
  status?: boolean;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case true:
      badgeClass = 'badge-light-active'; // Blue for submitted
      break;
    case false:
      badgeClass = 'badge-light-inactive'; // Red for rejected
      break;
    default:
      badgeClass = 'badge-light'; // Default (maybe grey)
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