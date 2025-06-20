import { useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import ExportModal from '@metronic/layout/components/modals/Export';
import ImportModal from '@metronic/layout/components/modals/Import';

const BrandListToolbar = () => {
  const [isExportModalVisible, setExportModalVisible] = useState(false);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [isImportSuccessVisible, setIsImportSuccessVisible] = useState(false);
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);

  const openExportModal = () => setExportModalVisible(true);
  const openImportModal = () => setImportModalVisible(true);

  const handleExportConfirm = () => {
    console.log('Export confirmed');
    setIsExportSuccessVisible(true);
  };

  const handleImportConfirm = (file: File) => {
    console.log('Import confirmed with file:', file.name);
    setIsImportSuccessVisible(true);
  };

  const handleCloseExport = () => {
    setExportModalVisible(false);
    setIsExportSuccessVisible(false);
  };

  const handleCloseImport = () => {
    setImportModalVisible(false);
    setIsImportSuccessVisible(false);
  };

  return (
    <div className="d-flex justify-content-end">
      {/* Export Button */}
      <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={openExportModal}
      >
        <KTIcon iconName="exit-down" className="fs-2 text-center mt-1" />
        Export
      </button>

      {/* Import Button */}
      <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={openImportModal}
      >
        <KTIcon iconName="exit-up" className="fs-2 mb-1" />
        Import
      </button>

      {/* Export Modal */}
      {isExportModalVisible && (
        <ExportModal
          closeModal={handleCloseExport}
          onConfirm={handleExportConfirm}
          showSuccess={isExportSuccessVisible}
        />
      )}

      {/* Import Modal */}
      {isImportModalVisible && (
        <ImportModal
          closeModal={handleCloseImport}
          onConfirm={handleImportConfirm}
          showSuccess={isImportSuccessVisible}
        />
      )}
    </div>
  );
};

export { BrandListToolbar };