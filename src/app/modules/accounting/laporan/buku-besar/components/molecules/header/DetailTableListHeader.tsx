import { ListToolbar } from "./ListToolbar";
import { UsersListSearchDetail } from "./UsersListSearchComponent";

const DetailTableListHeader = () => {
  return (
    <div className="card-header border-0 pt-6">
      <UsersListSearchDetail />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        {/* <ListToolbar /> */}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { DetailTableListHeader };
