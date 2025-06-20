import { ListToolbar } from "@metronic/layout/components/form/components/header/ListToolbar";
import { useListView } from "../core/ListViewProvider";
import {
  UsersListSearchComponent,
  UsersListSearchMaterialComponent,
  UsersListSearchMaterialDetailComponent,
} from "./UsersListSearchComponent";
import clsx from "clsx";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";

const TableListHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        <ListToolbar />
        {/* end::Group actions */}
      </div>

      {/* <select name="gender" className={clsx("form-select")}>
        {[
          { value: "male", label: "Gudang 1" },
          { value: "female", label: "Gudang 2" },
        ].map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </select> */}
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListMaterialHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchMaterialComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}

        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

const TableListMaterialDetailHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchMaterialDetailComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}

        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export {
  TableListHeader,
  TableListMaterialHeader,
  TableListMaterialDetailHeader,
};
