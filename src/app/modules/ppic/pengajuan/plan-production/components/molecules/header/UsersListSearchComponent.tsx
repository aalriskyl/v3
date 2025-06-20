import React, { useEffect, useState } from 'react';
import { KTIcon, useDebounce } from '@metronic/helpers';
import FilterModal from '../modals/FilterModal';
import { useQueryRequest } from '../core/QueryRequestProvider';
import { AddMaterialModal } from '../modals/AddMaterialModal';

const UsersListSearchComponent: React.FC = () => {
  const { updateState } = useQueryRequest();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [approvalDate, setApprovalDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 150);


  const toggleModal = () => setModalVisible(!isModalVisible);

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
          onChange={(e) => setSearchTerm(e.target.value)}
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

const UsersListSearchMaterialComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      {/* Search Input di sebelah kiri */}
      <div className="card-title">
        <div className="d-flex align-items-center position-relative my-1 pe-4">
          <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6 " />
          <input
            type="text"
            data-kt-user-table-filter="search"
            className="form-control w-250px ps-14 border border-2"
            placeholder="Cari"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Button Tambah di sebelah kanan */}
      <button
        type="button"
        className="btn  border border-2 border-primary text-primary"
        onClick={toggleModal}
      >
        Tambah
      </button>

      {/* Modal AddSupplier */}
      <AddMaterialModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={(data) => {
          console.log('Data material yang disimpan:', data);
          toggleModal();
        }}
      />
    </div>
  );
};

const UsersListSearchMaterialDetailComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      {/* Search Input di sebelah kiri */}
      <div className="card-title">
        <div className="d-flex align-items-center position-relative my-1 pe-4">
          <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6 " />
          <input
            type="text"
            data-kt-user-table-filter="search"
            className="form-control w-250px ps-14 border border-2"
            placeholder="Cari"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
    </div>
  );
};

export { UsersListSearchComponent, UsersListSearchMaterialComponent, UsersListSearchMaterialDetailComponent };
