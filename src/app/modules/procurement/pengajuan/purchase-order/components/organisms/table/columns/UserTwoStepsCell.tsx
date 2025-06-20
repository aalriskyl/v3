import { FC } from 'react';

type Props = {
  status?: string;
};

const UserTwoStepsCell: FC<Props> = ({ status }) => {
  // Format the status to handle "PartialDelivered"
  const formattedStatus = status === 'PartiallyDelivered' ? 'Partially Delivered' : status;

  let badgeClass = '';

  switch (formattedStatus) {
    case 'Draft':
      badgeClass = 'badge-draft';
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
    case 'Partially Delivered': // Updated to match the formatted status
      badgeClass = 'badge-light-partial';
      break;
    case 'Undelivered':
      badgeClass = 'badge-draft';
      break;
    case 'Unpaid':
      badgeClass = 'badge-draft';
      break;
    case 'Partially-Paid':
      badgeClass = 'badge-light-partial';
      break;
    case 'Fully Paid':
      badgeClass = 'badge-light-active';
      break;
    case 'Fully Delivered':
      badgeClass = 'badge-light-active';
      break;
    default:
      badgeClass = 'badge-light';
      break;
  }

  return (
    <>
      {formattedStatus && (
        <div className={`badge ${badgeClass} fw-bold text-capitalize`}>
          {formattedStatus}
        </div>
      )}
    </>
  );
};

export { UserTwoStepsCell };