import { useState, useEffect } from 'react';
import StepIndicator from '@/src/components/StepIndicator';
import { createPhotoArray } from '@/src/app/utils/pointFormatters';
import StepSummary from '@/src/components/StepSummary';
import BulkImageDrop from '@/src/components/BulkImageDrop';
import classNames from '@/src/app/utils/classNames';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';

interface UploadStep {
  step: number;
  fileList: File;
  csvData: File;
  setFileList: (csv: File) => void;
  setStep: (step: number) => void;
}

export default function ThirdStep({
  step,
  fileList,
  csvData,
  setFileList,
  setStep,
}: UploadStep) {
  const [rejectedFileList, setRejectedFileList] = useState([]);
  const [isDisabled, setIsDisabled] = useState([]);
  const [csvPhotoList, setCsvPhotoList] = useState([]);
  const [unmatchedPhotoList, setUnmatchedPhotoList] = useState({
    missing: [],
    extra: [],
  });

  useEffect(() => {
    const fullList = [];
    csvData?.data.forEach((row) => {
      const itemArray = createPhotoArray(row);
      itemArray.forEach((img) => fullList.push(img));
    });

    setCsvPhotoList(fullList);
  }, [csvData]);

  useEffect(() => {
    function validPhotoList(csvList, uploadList) {
      if (csvList.length > 0) return csvPhotoList.length >= uploadList.length;
      if (csvList.length === 0 && uploadList.length === 0) return true;

      return false;
    }
    if (
      validPhotoList(csvPhotoList, fileList) &&
      csvPhotoList.length === fileList.length
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (fileList.length > 0 && csvPhotoList.length > 0) {
      const extraImages = fileList.filter(
        (img) => !csvPhotoList.some((x) => img.name === x)
      );
      const missingImages = csvPhotoList.filter(
        (img) => !fileList.some((x) => img === x.name)
      );
      setUnmatchedPhotoList({
        extra: extraImages,
        missing: missingImages,
      });
    }
  }, [step, csvData, fileList, csvPhotoList]);

  const clearFilesHandler = () => {
    setFileList([]);
    setUnmatchedPhotoList({
      missing: [],
      extra: [],
    });
  };

  const fileRejectionItems = rejectedFileList.map(({ file, errors }) => (
    <li key={file.path} className="p-1">
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code} className="text-red-vivid-300">
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  const extraPhotoList = unmatchedPhotoList.extra.map((file) => (
    <li key={file.path}>{file.name}</li>
  ));
  const missingPhotoList = unmatchedPhotoList.missing.map((file) => (
    <li key={file}>{file}</li>
  ));

  return (
    <div className="flex">
      <StepIndicator step={step} thisStep={3} />

      <div className="w-full pl-4 ">
        {step !== 2 && fileList && fileList.length > 0 ? (
          <StepSummary
            onClick={() => setStep(2)}
            mainText={'Photos added'}
            chipText={`${fileList.length} Photos Added`}
          />
        ) : (
          <div className="flex items-center">
            <p
              className={classNames(
                'font-medium',
                step < 2 ? 'text-neutral-black-40 ' : 'text-neutral-black-100'
              )}
            >
              Add Photos
            </p>

            <InfoModal
              title="Adding Photos"
              text="description of information text here" //TODO
              height="h-96"
              width="w-[30em]"
              muted={step < 2}
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col">
              <BulkImageDrop
                setFileList={setFileList}
                fileList={fileList}
                setRejectedFileList={setRejectedFileList}
                rejectedFileList={rejectedFileList}
              />
              <div className="p-2 text-sm">
                {rejectedFileList.length > 0 && (
                  <div className="ml-2 text-xs">
                    <h4 className="font-semibold text-cool-grey-400">
                      Rejected files
                    </h4>
                    <ul>{fileRejectionItems}</ul>
                  </div>
                )}

                {csvPhotoList.length > 0 && (
                  <p>{csvPhotoList.length} images referenced in the CSV data</p>
                )}

                {fileList.length > 0 && (
                  <p>{fileList.length} images pending upload</p>
                )}

                {fileList.length > csvPhotoList.length && (
                  <>
                    <p className="text-orange-vivid-500">
                      Currently, there are photos pending upload that do not
                      have a match in the CSV
                    </p>
                    <button
                      type="button"
                      onClick={clearFilesHandler}
                      className="my-3 h-8 rounded border px-3 text-red-vivid-500 hover:border-orange-vivid-600"
                    >
                      Clear All Photos
                    </button>
                  </>
                )}

                {fileList.length < csvPhotoList.length && (
                  <p className="font-medium text-yellow-vivid-700">
                    The CSV references {csvPhotoList.length - fileList.length}{' '}
                    images that are not in the image upload list
                  </p>
                )}

                {unmatchedPhotoList.missing.length > 0 && (
                  <ul className="flex w-full flex-wrap gap-x-2 whitespace-nowrap py-2 font-semibold">
                    <span className="mr-2 text-red-vivid-600">
                      Missing Photos ({missingPhotoList.length})
                    </span>
                    {missingPhotoList}
                  </ul>
                )}
                {unmatchedPhotoList.extra.length > 0 && (
                  <ul className="flex w-full flex-wrap gap-x-2 whitespace-nowrap py-2 font-semibold">
                    <span className="mr-2 text-indigo-vivid-500">
                      {' '}
                      Unused Photos ({extraPhotoList.length})
                    </span>
                    {extraPhotoList}
                  </ul>
                )}
              </div>
            </div>
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
