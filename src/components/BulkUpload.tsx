import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DataUploadHeader from './DataUploadHeader';
import StepWizard from './StepWizard';
import CSVUpload from './csvUpload/CSVUpload';

export default function BulkUpload() {
  const [uploadType, setUploadType] = useState<string>('');
  return (
    <>
      {!uploadType && (
        <div className="w-full flex flex-col items-center my-8">
          <p className="text-2xl text-neutral-black-100 font-semibold capitalize">
            Bulk Observation Upload
          </p>
          <p className="text-lg text-neutral-black-80 mt-2">
            Would you like to upload a pre-made CSV or start from scratch?
          </p>
          <div className="mt-10 w-96 flex flex-col space-y-6 text-neutral-black-100">
            <button
              type="button"
              onClick={() => setUploadType('csv')}
              className="border rounded flex justify-between items-center p-6 text-xl font-medium hover:text-primary-blue-100 hover:border-primary-blue-100 group"
            >
              <p>Upload CSV</p>
              <ChevronRightIcon className="w-8 h-8 group-hover:text-primary-blue-100" />{' '}
            </button>
            <button
              type="button"
              onClick={() => setUploadType('scratch')}
              className="border rounded flex justify-between items-center p-6 text-xl font-medium hover:text-primary-blue-100 hover:border-primary-blue-100 group"
            >
              <p>Start from scratch</p>
              <ChevronRightIcon className="w-8 h-8 group-hover:text-primary-blue-100 " />{' '}
            </button>
          </div>
        </div>
      )}

      {uploadType && uploadType === 'csv' && <CSVUpload />}
      {uploadType && uploadType === 'scratch' && (
        <div className="w-full">
          <DataUploadHeader />
          <StepWizard />
        </div>
      )}
    </>
  );
}
