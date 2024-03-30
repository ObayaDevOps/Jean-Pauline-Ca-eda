import { useState, useEffect } from 'react';
import StepIndicator from '@/src/components/StepIndicator';
import classNames from '@/src/app/utils/classNames';
import StepSummary from '@/src/components/StepSummary';
import { useCSVReader } from 'react-papaparse';
import CsvDataTable from '@/src/components/csvUpload/CsvDataTable';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';

interface UploadStep {
  step: number;
  csvData: File;
  setCsvData: (csv: File) => void;
  setStep: (step: number) => void;
}

export default function SecondStep({
  step,
  csvData,
  setCsvData,
  setStep,
}: UploadStep) {
  const [csvFile, setCsvFile] = useState<File>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { CSVReader } = useCSVReader();

  function removeFileHandler() {
    setCsvFile(null);
    setCsvData(null);
  }

  useEffect(() => {
    if (csvData && csvData.errors.length < 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [csvData]);

  return (
    <div className="flex">
      <StepIndicator step={step} thisStep={2} />

      <div className="w-full pl-4 ">
        {step !== 1 && csvData ? (
          <StepSummary
            onClick={() => setStep(1)}
            mainText={'CSV added'}
            chipText={`CSV: ${csvFile.name}`}
          />
        ) : (
          <div className="flex items-center">
            <p
              className={classNames(
                'font-medium',
                step < 1 ? 'text-neutral-black-60 ' : 'text-neutral-black-100'
              )}
            >
              Select a CSV to upload
            </p>

            <InfoModal
              title="Selecting a CSV to Upload"
              text="description of information text here" //TODO
              height="h-96"
              width="w-[30em]"
              muted={step < 1}
            />
          </div>
        )}

        {step === 1 && (
          <>
            <CSVReader
              onUploadAccepted={(results, file) => {
                setCsvData(results);
                setCsvFile(file);
              }}
              config={{
                header: true,
                dynamicTyping: true,
                transform: (val) => val.trim(),
                transformHeader: (val) => val.trim(),
              }}
            >
              {({ getRootProps, ProgressBar }) => (
                <div>
                  <div className="flex mt-4 space-x-6">
                    <button
                      type="button"
                      {...getRootProps()}
                      className="h-8 w-44 rounded bg-primary-blue-100 px-2 font-medium font-semibold text-neutral-black-02 hover:brightness-110"
                    >
                      Browse files
                    </button>
                    <div className="h-8 w-64 truncate border-b border-b-neutral-black-40 p-1 ">
                      {csvFile && csvFile.name ? (
                        <p className="font-medium">{csvFile.name}</p>
                      ) : (
                        <p className="text-neutral-black-40">Select a file</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={removeFileHandler}
                      className={classNames(
                        'h-8 rounded px-3 hover:brightness-110',
                        csvFile
                          ? 'text-neutral-black-02 bg-extended-yellow-120 font-semibold '
                          : 'text-neutral-black-40 border'
                      )}
                    >
                      Clear
                    </button>
                  </div>
                  <ProgressBar
                    style={{
                      backgroundColor: '#17E589',
                      marginTop: '8px',
                    }}
                  />
                </div>
              )}
            </CSVReader>
            <div className=" max-h-96 overflow-y-auto lg:max-h-[50vh]  mt-3 scrollbar">
              {csvData && <CsvDataTable data={csvData} />}
            </div>
            {csvData && csvData.errors.length > 0 && (
              <div className="my-3">
                <p>CSV Error Detected </p>
                {csvData.errors.map((error) => (
                  <p key={error[0].row}>
                    {error[0].message} at{' '}
                    <span className="font-semibold">Row {error[0].row}</span>
                  </p>
                ))}
              </div>
            )}
            <div className="rounded flex justify-end items-center my-6 ">
              <Button
                text="Continue"
                onClick={() => setStep(step + 1)}
                disabled={isDisabled}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
