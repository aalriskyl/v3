import { ListToolbar } from '@metronic/layout/components/form/components/header/ListToolbar'
import { UsersListSearchComponent } from './UsersListSearchComponent'

interface TableListHeaderProps {
  activeTab: 'Material' | 'Finish Goods'
  setActiveTab: (tab: 'Material' | 'Finish Goods') => void
}

const TableListHeader = ({ activeTab, setActiveTab }: TableListHeaderProps) => {

  return (
    <>
      <div className='ms-8 pt-6'>
        <div className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
          <div className='nav-item'>
            <button
              className={`nav-link fw-bold fs-5 ${activeTab === 'Material' ? 'active' : ''}`}
              onClick={() => setActiveTab('Material')}
            >
              Material
            </button>
          </div>
          <div className='nav-item'>
            <button
              className={`nav-link fw-bold fs-5 ${activeTab === 'Finish Goods' ? 'active' : ''}`}
              onClick={() => setActiveTab('Finish Goods')}
            >
              Finish Goods
            </button>
          </div>
        </div>
      </div>

      <div className='card-header border-0'>
        <UsersListSearchComponent />
        <div className='card-toolbar'>
          <ListToolbar />
        </div>
      </div>

    </>
  )
}

export { TableListHeader }