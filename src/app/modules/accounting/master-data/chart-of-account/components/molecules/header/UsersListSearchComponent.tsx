import React, { useEffect, useState } from "react";
import { KTIcon, useDebounce } from "@metronic/helpers";
import FilterModal from "../modals/FilterModal";
import { useQueryRequest } from "../core/QueryRequestProvider";
import { AddSupplierModal } from "../modals/AddSupplierModal";
import { useHelper } from "../core/HelperContext";

const UsersListSearchComponent: React.FC = () => {
  const { setSearchTerm } = useHelper();
  const [searchTerm, setSearchTermLocal] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
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
    </div>
  );
};

const UsersListSearchSupplierComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      {/* Search Input di sebelah kiri */}
      <div className="card-title">
        <div className="d-flex align-items-center position-relative my-1 pe-4">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6 "
          />
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
      {/* <button
        type="button"
        className="btn  border border-2 border-primary text-primary"
        onClick={toggleModal}
      >
        Tambah
      </button> */}

      {/* Modal AddSupplier */}
      <AddSupplierModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={(data) => {
          console.log("Data supplier yang disimpan:", data);
          toggleModal();
        }}
      />
    </div>
  );
};

const UsersListSearchSupplierDetailComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    </div>
  );
};

export {
  UsersListSearchComponent,
  UsersListSearchSupplierComponent,
  UsersListSearchSupplierDetailComponent,
};
