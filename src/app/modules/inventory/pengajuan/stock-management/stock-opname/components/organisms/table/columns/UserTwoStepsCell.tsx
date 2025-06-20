import { FC } from 'react';

type Props = {
  status?: string;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case 'Draft':
      badgeClass = 'badge-light-secondary'; 
      break;
    case 'Approved':
      badgeClass = 'badge-light-active'; 
      break;
    case 'Rejected':
      badgeClass = 'badge-light-inactive';
      break;
    case 'Submitted':
      badgeClass = 'badge-light-success'; 
      break;
    default:
      badgeClass = 'badge-light'; 
      break;
  }

  return (
    <>
      {status && <div className={`badge ${badgeClass} fw-bolder text-capitalize`}>{status}</div>}
    </>
  );
};

export { UserTwoStepsCell };
