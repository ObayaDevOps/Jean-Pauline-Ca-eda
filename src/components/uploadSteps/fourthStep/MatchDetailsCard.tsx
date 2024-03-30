import { useState } from 'react';
import {
  ExclamationCircleIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';

interface props {
  photoListRaw: Photo[];
  setPhotoListRaw: (photoList: Photo[]) => void;
  activePhoto: File;
}

interface Photo {
  photo: File;
}

export default function MatchDetailsCard({
  setPhotoListRaw,
  activePhoto,
  photoListRaw,
}: props) {
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);

  const removePhoto = () => {
    setPhotoListRaw(photoListRaw?.filter((el) => el.path !== activePhoto.path));
    setDeletePhoto(false);
  };
  const handleChangeMatch = () => {
    console.log('change match'); //TODO
  };
  const handleApproveMatch = () => {
    console.log('Approve match'); //TODO
  };

  return (
    <div className="w-full h-full border border-neutral-black-20 flex flex-col justify-between items-center rounded grow py-4 px-8">
      <div className="flex items-center space-x-2">
        <p className="text-neutral-black-80">Match Details</p>
        <InfoModal
          title="Match Details"
          text="description of information text here" //TODO
          height="h-96"
          width="w-[30em]"
          muted={true}
        />
      </div>
      {deletePhoto ? (
        <div className="w-full">
          <p className="flex items-center whitespace-nowrap text-neutral-black-80 text-sm font-medium">
            <ExclamationCircleIcon className="h-6 w-6 text-secondary-red-100 mr-2" />
            Remove{' '}
            <span className="font-semibold italic ml-1">
              {activePhoto?.name}
            </span>
          </p>
          <div className="flex mt-2 justify-end">
            <button
              type="button"
              onClick={() => setDeletePhoto(false)}
              className="text-neutral-black-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={removePhoto}
              className="rounded p-1 flex text-secondary-red-100 ml-4 text-sm"
            >
              Remove
              <TrashIcon className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-between items-center">
          <p className="font-semibold text-neutral-black-100">
            {activePhoto?.name}
          </p>
          <button
            type="button"
            onClick={() => {
              setDeletePhoto(true);
            }}
          >
            <TrashIcon className="text-neutral-black-40 hover:text-secondary-red-100 h-5 w-5" />
          </button>
        </div>
      )}

      <div className="border w-full h-0" />
      <div className=" text-sm w-full space-y-1">
        <div className="flex w-full items-center mb-5">
          <p className="uppercase text-neutral-black-60 font-medium">
            Matched Waypoint
          </p>
          <SparklesIcon className="text-neutral-black-60 h-5 w-5 ml-3" />
          <button
            type="button"
            onClick={handleChangeMatch}
            className="grow text-right text-xs uppercase text-neutral-black-40 hover:text-primary-blue-100 font-semibold"
          >
            Change
          </button>
        </div>
        <div className="w-full grid grid-cols-2 gap-y-2 whitespace-nowrap">
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            GPX#{' '}
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** 1290 **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            Lat
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** 32.99325 **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            Line{' '}
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** L120 **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
           Long{' '}
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** -96.23525 **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            Description{' '}
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** Erosion **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            Time{' '}
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** 3/29/2023 13:25:56 **
            </span>
          </p>
          <p className="text-neutral-black-100 uppercase font-medium text-xs">
            Elevation
            <span className="text-sm font-semibold capitalize ml-2 ">
              ** 319.5 ft **
            </span>
          </p>
        </div>
      </div>
      <Button text="Approve Match" onClick={handleApproveMatch} />
    </div>
  );
}
