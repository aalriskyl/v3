import { useEffect, useState } from 'react';
import { KTIcon } from '../../../../../../_metronic/helpers';

const UsersListFilter = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [organizationName, setOrganizationName] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [industry, setIndustry] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const toggleModal = () => setModalVisible(!isModalVisible);

  const filterData = () => {
    // Handle the filtering logic here
    console.log('Filtering with organizationName:', organizationName, 'city:', city, 'industry:', industry, 'status:', status);
    setModalVisible(false); // Close the modal after applying filters
  };

  const resetData = () => {
    setOrganizationName(undefined);
    setCity(undefined);
    setIndustry(undefined);
    setStatus(undefined);
  };

  const closeModal = () => setModalVisible(false);


  return (
    <>
      {/* Filter Button */}
      <button
        type="button"
        className="btn btn-light border border-2 me-3"
        disabled={false} // Add your loading condition here if needed
        onClick={toggleModal}
      >
        <KTIcon iconName="filter" className="fs-2" />
        Filter
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document"
            style={{ maxWidth: "360px" }}>
            <div className="modal-content px-2 py-8">
              <div className="text-start">
                <h1 className="modal-title fw-bold font-secondary mx-7">Filter</h1>
              </div>
              <div className="modal-body">
                {/* Organization Name Input */}
                <div className="mb-4">
                  <label className="form-label fs-6 fw-bold">Nama Organisasi</label>
                  <input
                    type="text"
                    className="form-control form-control"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>

                {/* City Dropdown */}
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bold">Kota</label>
                  <select
                    className="form-select form-select"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  >
                    <option value="">Select option</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Surabaya">Surabaya</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                {/* Industry Dropdown */}
                <div className="mb-10">
                  <label className="form-label fs-6">Industri</label>
                  <select
                    className="form-select form-select"
                    onChange={(e) => setIndustry(e.target.value)}
                    value={industry}
                  >
                    <option value="">Select option</option>
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                {/* Status Dropdown */}
                <div className="mb-10">
                  <label className="form-label fs-6">Status</label>
                  <select
                    className="form-select form-select"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="">Select option</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="text-center row mx-4">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn px-12 text-primary py-3 border w-100 border-primary me-2"
                    onClick={closeModal}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-12 py-3 fw-bold px-6 w-100 border border-primary"
                    onClick={closeModal} // update this as needed
                  >
                    Simpan
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { UsersListFilter };
