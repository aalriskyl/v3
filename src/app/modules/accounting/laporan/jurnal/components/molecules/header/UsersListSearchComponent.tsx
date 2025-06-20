import React, { useEffect, useState } from "react";
import { KTIcon } from "@metronic/helpers";
import FilterModal from "../modals/FilterModal";
import { useJournal } from "../../core/useContext";

const UsersListSearchComponent: React.FC = () => {
  const { setSearchTerm, isSimplified, toggleSimplified, fetchJournalEntries } =
    useJournal();
  const [searchTerm, setSearchTermLocal] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSimplifyToggle = () => {
    toggleSimplified();
    // Optionally refresh data when toggling
    fetchJournalEntries();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchTerm);
    }, 800);
    return () => clearTimeout(handler);
  }, [searchTerm, setSearchTerm]);

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
        {isModalVisible && <FilterModal closeModal={toggleModal} />}
      </div>
      <button
        type="button"
        className={`btn border border-2 me-3 ${
          isSimplified ? "btn-primary" : "btn-light"
        }`}
        onClick={handleSimplifyToggle}
      >
        <KTIcon
          iconName={isSimplified ? "abstract-4" : "abstract-11"}
          className="fs-2"
        />
        {isSimplified ? "Detailed View" : "Simplify"}
      </button>
    </div>
  );
};

export { UsersListSearchComponent };
