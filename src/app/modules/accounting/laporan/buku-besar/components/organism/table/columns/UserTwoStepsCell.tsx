import { FC } from 'react';

interface UserTwoStepsCellProps {
  status: boolean;
}

const ModuleTwoStepsCell: FC<UserTwoStepsCellProps> = ({ status }) => {
  const badgeClass = status ? 'badge-light-active' : 'badge-light-inactive';

  return (
    <div className={`badge ${badgeClass} fw-bolder text-capitalize`}>
      {status ? 'Active' : 'Inactive'}
    </div>
  );
};

export { ModuleTwoStepsCell };
