import { FC } from 'react';

type Props = {
  status?: boolean; // Terima boolean dari response
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';
  let displayText = '';

  switch (status) {
    case true:
      badgeClass = 'badge-light-active';
      displayText = 'Active';
      break;
    case false:
      badgeClass = 'badge-light-inactive';
      displayText = 'Inactive';
      break;
    default:
      badgeClass = 'badge-light';
      displayText = 'Unknown';
      break;
  }

  return (
    <>
      {status !== undefined && (
        <div className={`badge ${badgeClass} fw-bolder text-capitalize`}>
          {displayText}
        </div>
      )}
    </>
  );
};
export { UserTwoStepsCell };