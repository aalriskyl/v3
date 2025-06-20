import { FC } from 'react';

type Props = {
  status?: string;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case 'Draft':
      badgeClass = 'badge-draft'; 
      break;
    case 'Active':
      badgeClass = 'badge-light-active'; // Biru untuk submitted
      break;
    case 'Inactive':
      badgeClass = 'badge-light-inactive'; // Merah untuk rejected
      break;
    case 'Approved':
      badgeClass = 'badge-light-success'; // Hijau untuk approved
      break;
    default:
      badgeClass = 'badge-light'; // Default (mungkin abu-abu)
      break;
  }

  return (
    <>
      {status && <div className={`badge ${badgeClass} fw-bold text-capitalize`}>{status}</div>}
    </>
  );
};

export { UserTwoStepsCell };
