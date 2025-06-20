import React, { useState, useRef, useEffect } from 'react'; // <-- Tambahkan useRef dan useEffect
import { KTIcon } from '@metronic/helpers';
import FilterModal from '../modals/FilterModal';
import { FilterValues } from './filters';


interface UsersListSearchComponentProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: any) => void;
  filters: any;
}

const UsersListSearchComponent: React.FC<UsersListSearchComponentProps> = ({
  onSearch,
  onFilter,
  filters
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Tambahkan ref untuk menyimpan timeout
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchTerm(filters.search || '');
  }, [filters.search]);

  // Cleanup timeout saat komponen unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear timeout sebelumnya
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set timeout baru dengan delay 300ms
    searchTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleApplyFilter = (newFilters: any) => {
    onFilter({
      ...filters,
      ...newFilters
    });
    toggleModal();
  };

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
            initialFilters={filters || {}}
            onApply={handleApplyFilter}
            closeModal={toggleModal}
          />
        )}
      </div>
    </div>
  );
};

export { UsersListSearchComponent };