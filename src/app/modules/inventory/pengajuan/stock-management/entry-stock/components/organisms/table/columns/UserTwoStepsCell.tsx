import { FC } from 'react';

type Props = {
  status?: string;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case 'Approved':
      badgeClass = 'badge-light-active'; // Abu-abu untuk draft
      break;
    case 'Rejected':
      badgeClass = 'badge-light-inactive'; // Biru untuk submitted
      break;
    case 'Draft':
      badgeClass = 'badge-light'; // Merah untuk rejected
      break;
    case 'Submitted':
      badgeClass = 'badge-light-success'; // Hijau untuk approved
      break;
    default:
      badgeClass = 'badge-light'; // Default (mungkin abu-abu)
      break;
  }

  return (
    <>
      {status && <div className={`badge ${badgeClass} fw-bolder text-capitalize`}>{status}</div>}
    </>
  );
};

export { UserTwoStepsCell };
