import { useState } from 'react';
import {
  ExclamationCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import classNames from '@/src/app/utils/classNames';

const DUMMY_DATA = {
  pointsUsed: '104/255 Points Used',
};

interface Props {
  waypointsRaw: waypointProp[];
  setWaypointsRaw: (points: waypointProp[]) => void;
  setWaypoints: (points: []) => void;
}

interface waypointProp {
  file: File;
  name: string;
}

export default function WaypointGPXListCard({
  waypointsRaw,
  setWaypointsRaw,
  setWaypoints,
}: Props) {
  const [,] = useState<File[]>();
  const [additionalGPX, setAdditionalGPX] = useState<File | null>(null);
  const [duplicateFile, setDuplicateFile] = useState<boolean>(false);
  const [fileToBeDeleted, setFileToBeDeleted] = useState<File | null>(null);
  const [deleteAllFiles, setDeleteAllFiles] = useState<boolean>(false);

  const handleAddAdditionalGPX = () => {
    //TODO - this feels clunky
    // also file input needs to be cleared on upload
    const fileMatch = waypointsRaw?.filter(
      (el) => el.name === additionalGPX?.name
    );
    if (additionalGPX && fileMatch?.length === 0) {
      setWaypointsRaw([...waypointsRaw, additionalGPX]);
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
    setWaypointsRaw(waypointsRaw?.filter((el) => el.name !== file.name));
  };

  const resetWaypoints = () => {
    setWaypointsRaw([]);
    setWaypoints([]);
    setDeleteAllFiles(false);
  };
  return (
    <div className="border border-dashed border-[3px] border-neutral-black-40 rounded grow  w-1/3 flex flex-col items-center pt-4 pb-10 px-8">
      <p className="text-neutral-black-80 mb-5">Add additional GPX files</p>
      <div className="grow w-full">
        <div className="flex items-center w-full mb-3 ">
          {deleteAllFiles ? (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-secondary-red-100 mr-1" />
              <p className="text-neutral-black-60 font-medium grow">
                Remove all Current Files?
              </p>
              <button
                type="button"
                onClick={() => setDeleteAllFiles(false)}
                className="text-neutral-black-80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetWaypoints}
                className="p-1 flex text-secondary-red-100 ml-4 text-sm"
              >
                Remove
                <TrashIcon className="h-5 w-5 ml-1" />
              </button>
            </>
          ) : (
            <>
              <p className="text-neutral-black-100 font-semibold grow">
                Current Files
              </p>
              <div className="flex items-center">
                <p className="text-neutral-black-60 font-medium">
                  Clear All Files
                </p>
                <button type="button" onClick={() => setDeleteAllFiles(true)}>
                  <XCircleIcon className="h-5 w-5 ml-2 text-neutral-black-60" />
                </button>
              </div>
            </>
          )}
        </div>
        {waypointsRaw && waypointsRaw.length > 0 && (
          <>
            {waypointsRaw.map((source: { name: string }) => (
              <div key={source.name} className="w-full pb-3 ">
                {source === fileToBeDeleted ? (
                  <div className="w-full flex justify-between items-center text-sm">
                    <ExclamationCircleIcon className="h-5 w-5 text-secondary-red-100 mr-1" />
                    <p className="text-neutral-black-80 mr-1 font-medium">
                      Remove
                    </p>
                    <p className="text-neutral-black-80 italic font-medium grow">
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
                      className="p-1 flex text-secondary-red-100 ml-4"
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
                      {DUMMY_DATA.pointsUsed}
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
        <input //TODO
          type="file"
          name="additionalGPX"
          id="additionalGPX"
          accept='.gpx, .xml'
          onChange={(e) => handleUploadAdditionalFile(e)}
          // value={endDateTime}
          placeholder="Select File"
          className="border rounded mr-2 block w-full text-sm text-neutral-black-80 file:invisible file:w-0 pt-0.5 focus:outline-none "
        />{' '}
        <button
          type="button"
          onClick={handleAddAdditionalGPX}
          disabled={!additionalGPX}
          className="border border-primary-blue-100 rounded-md text-primary-blue-100 font-semibold px-4 py-1 disabled:border-neutral-black-20 disabled:text-neutral-black-40"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
