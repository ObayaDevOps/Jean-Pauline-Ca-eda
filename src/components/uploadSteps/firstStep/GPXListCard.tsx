import {
  ExclamationCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import classNames from '@/src/app/utils/classNames';
import { useState } from 'react';

const DUMMY_DATA = {
  rangeUsed: '2 hrs, 12 min/4 hrs, 32 min Used',
};

interface Props {
  trackPointsRaw: trackPointProp[];
  setTrackPointsRaw: (points: trackPointProp[]) => void;
  setTrackPoints: (points: []) => void;
}

interface trackPointProp {
  file: File;
  name: string;
}

export default function GPXListCard({
  trackPointsRaw,
  setTrackPointsRaw,
  setTrackPoints,
}: Props) {
  const [additionalGPX, setAdditionalGPX] = useState<File | null>(null);
  const [duplicateFile, setDuplicateFile] = useState<boolean>(false);
  const [fileToBeDeleted, setFileToBeDeleted] = useState<File | null>(null);
  const [deleteAllFiles, setDeleteAllFiles] = useState<boolean>(false);

  const handleAddAdditionalGPX = () => {
    //TODO - this feels clunky
    // also file input needs to be cleared on upload
    const fileMatch = trackPointsRaw?.filter(
      (el) => el.name === additionalGPX?.name
    );
    if (additionalGPX && fileMatch?.length === 0) {
      setTrackPointsRaw([...trackPointsRaw, additionalGPX]);
    } else {
      setDuplicateFile(true);
      setTimeout(() => {
        setDuplicateFile(false);
      }, 3000);
    }
  };
  const handleUploadAdditionalFile = (e: any) => {
    setAdditionalGPX(e.target.files[0]);
  };

  const removeSingleFile = (file: File) => {
    setTrackPointsRaw(trackPointsRaw?.filter((el) => el.name !== file.name));
    setFileToBeDeleted(null);
  };

  const resetTrackPoints = () => {
    setTrackPointsRaw([]);
    setTrackPoints([]);
    setDeleteAllFiles(false);
  };

  return (
    <div className="border border-dashed border-[3px] rounded min-h-[24em] w-2/5 flex flex-col items-center pt-4 pb-10 px-8">
      <p className="text-neutral-black-80 mb-3">Add additional GPX files</p>
      <div className="grow w-full">
        <div className="flex items-center w-full mb-3 ">
          {deleteAllFiles ? (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-secondary-red-100 mr-1" />
              <p className="text-neutral-black-80 font-medium grow">
                Remove all Current Files?
              </p>
              <button
                type="button"
                onClick={() => setDeleteAllFiles(false)}
                className="text-neutral-black-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetTrackPoints}
                className="border border-secondary-red-100 rounded p-1 flex text-secondary-red-100 ml-4 text-sm"
              >
                Remove
                <TrashIcon className="h-5 w-5 ml-1" />
              </button>
            </>
          ) : (
            <>
              <p className="text-neutral-black-80 font-semibold grow">
                Current Files
              </p>
              <p className="text-neutral-black-60 font-medium">
                Clear All Files
              </p>
              <button type="button" onClick={() => setDeleteAllFiles(true)}>
                <XCircleIcon className="h-5 w-5 ml-2 text-neutral-black-60" />
              </button>
            </>
          )}
        </div>
        {trackPointsRaw && trackPointsRaw.length > 0 && (
          <>
            {trackPointsRaw.map((source: { name: string }) => (
              <div key={source.name} className="w-full pb-3 ">
                {source === fileToBeDeleted ? (
                  <div className="w-full flex justify-between items-center text-sm">
                    <ExclamationCircleIcon className="h-5 w-5 text-secondary-red-100 mr-1" />
                    <p className="text-neutral-black-100 mr-1 font-medium">
                      Remove
                    </p>
                    <p className="text-neutral-black-100 italic font-medium grow">
                      {source.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFileToBeDeleted(null)}
                      className="text-neutral-black-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSingleFile(source)}
                      className="border border-secondary-red-100 rounded p-1 flex text-secondary-red-100 ml-2"
                    >
                      Remove
                      <TrashIcon className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center">
                    <p className="text-neutral-black-100 font-medium italic ">
                      {source.name}
                    </p>
                    <p className="text-neutral-black-60 font-medium text-sm truncate mx-4 grow">
                      {DUMMY_DATA.rangeUsed}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFileToBeDeleted(source)}
                    >
                      <XCircleIcon className="h-5 w-5 ml-2 text-neutral-black-60" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <p
        className={classNames(
          'px-2 w-full text-secondary-red-100 transition-opacity duration-75 ease-in',
          duplicateFile ? 'opacity-100' : 'opacity-0'
        )}
      >
        File already in list!
      </p>
      <div className="flex w-full ">
        <input
          type="file"
          name="additionalGPX"
          id="additionalGPX"
          accept='.gpx, .xml'
          //TODO adding value makes it throw an error
          // value={additionalGPX}
          onChange={(e) => handleUploadAdditionalFile(e)}
          placeholder="Select File"
          className="border rounded mr-2 block w-full text-sm text-neutral-black-60 file:invisible file:w-0 pt-0.5 focus:outline-none "
        />
        <button
          type="button"
          onClick={handleAddAdditionalGPX}
          disabled={!additionalGPX}
          className="bg-primary-blue-100 rounded-md text-white font-medium px-4 py-1 disabled:bg-neutral-black-40"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
