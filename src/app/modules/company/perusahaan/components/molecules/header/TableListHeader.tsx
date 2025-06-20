import React, { useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import { UsersListSearchComponent } from './UsersListSearchComponent';
import FilterModal from '../modals/FilterModal';
import { useListView } from '../core/ListViewProvider';
import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar';
import { FilterValues } from './filters';



const TableListHeader: React.FC = () => {
  const { selected } = useListView();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <div className="card-header border-0 pt-6">
      <div className="d-flex">
        <UsersListSearchComponent />
        <div className="my-4">
          {/* <button
            type="button"
            className="btn btn-light border border-2 me-3"
            onClick={toggleModal}
          >
            <KTIcon iconName="filter" className="fs-2" />
            Filter
          </button> */}
        </div>
      </div>
      <div className="card-toolbar">
        <ListToolbar 
          urlImport={"/company/management-company/company/import"}
        />
      </div>
      {/* {isModalVisible && (
        <FilterModal
          closeModal={toggleModal}
          onFilter={handleFilter}
          currentFilters={filters} // <-- Pass the `filters` prop
        />
      )} */}
    </div>
  );
};

export { TableListHeader };