import React, { useEffect, useState, useRef } from "react";
import { KTIcon, useDebounce } from "../../../../../../../../_metronic/helpers";
import FilterModal from "../modals/FilterModal";
import { useQueryRequest } from "../core/QueryRequestProvider";
import LinkButtonBorder from "@metronic/layout/components/buttons/LinkButtonBorder";
import { AddSupplierModal } from "../modals/AddSupplierModal";
import { useParams } from "react-router-dom";
import { Supplier } from "../core/_models";
import { useMaterials } from "../../template/ParentMaterialsTableLayout";
import { useUomContext } from "../../template/UomTableLayout";
import { useSupplier } from "../../template/SupplierTableLayout";
import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";

export interface SupplierUom {
  supplier_id: string;
  priority_supplier: number;
  default_supplier: boolean;
  buy_price: number;
}
export interface UsersListSearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const UsersListSearchComponent: React.FC = () => {
  const { setSearchTerm } = useMaterials();
  const [searchTerm, setSearchTermLocal] = useState<string>("");
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

        {isModalVisible && <FilterModal closeModal={toggleModal} />}
      </div>
    </div>
  );
};

export default UsersListSearchComponent;

const UsersListSearchUomComponent: React.FC = () => {
  const { setSearchTerm } = useUomContext();
  const [searchTerm, setSearchTermLocal] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const { materialId } = useParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermLocal(value);
    setSearchTerm(value); // update search term di context
  };

  return (
    <div className="card-title">
      <LinkButtonBorder
        to={`/inventory/masterdata/materials/detailmaterial/${materialId}/newuom`}
        title="Tambah"
        className="mx-8"
      />
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
        <div className="ms-4">
          <ListToolbar
            urlImport={`/inventory/master-data/material/uom/import/${materialId}`}
            showExportButton={false}
            templatePath="material/material-uom-import.xlsx"
          />
        </div>
      </div>
    </div>
  );
};

const UsersListSearchUomDetailComponent: React.FC = () => {
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

const UsersListSearchSupplierComponent: React.FC = () => {
  const { setSearchTerm } = useSupplier();
  const [searchTerm, setSearchTermLocal] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const { id } = useParams();

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermLocal(value);
    setSearchTerm(value); // update search term di context
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
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
            onChange={handleSearchChange}
          />
        </div>
        <div className="ms-4">
          <ListToolbar
            urlImport={`/inventory/master-data/material/supplier/import/${id}`}
            showExportButton={false}
            templatePath="material/material-supplier-import.xlsx"
          />
        </div>
      </div>

      {/* <button
        type="button"
        className="btn border border-2 border-primary text-primary"
        onClick={toggleModal}
      >
        Tambah
      </button> */}

      <AddSupplierModal
        show={isModalVisible}
        handleClose={toggleModal}
        onSubmit={() => {
          toggleModal();
        }}
      />
    </div>
  );
};

const UsersListSearchSupplierDetailComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    </div>
  );
};

export {
  UsersListSearchComponent,
  UsersListSearchUomComponent,
  UsersListSearchSupplierComponent,
  UsersListSearchUomDetailComponent,
  UsersListSearchSupplierDetailComponent,
};
