import { FC } from 'react';

type Props = {
  status?: string;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case 'Draft':
      badgeClass = 'badge-light-secondary'; // Abu-abu untuk draft
      break;
    case 'Submitted':
      badgeClass = 'badge-light-success'; // Biru untuk submitted
      break;
    case 'Rejected':
      badgeClass = 'badge-light-warning'; // Merah untuk rejected
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
