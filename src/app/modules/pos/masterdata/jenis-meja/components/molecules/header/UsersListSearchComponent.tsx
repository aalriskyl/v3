import React, { useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import FilterModal from '../modals/FilterModal';

interface UsersListSearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const UsersListSearchComponent: React.FC<UsersListSearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [approvalDate, setApprovalDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger callback
  };

  return (
    <div className="card-title">
      <div className="d-flex align-items-center position-relative my-1 pe-4">
        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6 " />
        <input
          type="text"
          data-kt-user-table-filter="search"
          className="form-control w-250px ps-14 border border-2"
          placeholder="Cari"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-light border border-2 me-3"
        onClick={toggleModal}
      >
        <KTIcon iconName="filter" className="fs-2" />
        Filter
      </button>

      {isModalVisible && (
        <FilterModal
          submissionDate={submissionDate}
          setSubmissionDate={setSubmissionDate}
          approvalDate={approvalDate}
          setApprovalDate={setApprovalDate}
          status={status}
          setStatus={setStatus}
          closeModal={toggleModal}
        />
      )}
    </div>
  );
};

export { UsersListSearchComponent };
