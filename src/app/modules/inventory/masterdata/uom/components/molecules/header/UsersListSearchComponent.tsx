import React, { useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import FilterModal from '../modals/FilterModal';
import { useUom } from '../../template/UomTableLayout';

interface UsersListSearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const UsersListSearchComponent: React.FC = () => {
  const { setSearchTerm } = useUom();
  const [searchTerm, setSearchTermLocal] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermLocal(value);
    setSearchTerm(value); // update search term di context
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <div className="card-title">
      <div className="d-flex align-items-center position-relative my-1 pe-4">
        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
        <input
          type="text"
          data-kt-user-table-filter="search"
          className="form-control w-250px ps-14 border border-2"
          placeholder="Cari"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="position-relative d-inline-block">
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
            closeModal={toggleModal}
          />)}
      </div>
    </div>
  );
};

export { UsersListSearchComponent };
