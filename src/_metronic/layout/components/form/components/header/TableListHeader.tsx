import { ListToolbar } from './ListToolbar'
// import { UsersListSearchComponent } from './UsersListSearchComponent'

const TableListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <ListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { TableListHeader }
