import classNames from '@/src/app/utils/classNames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface UploadStepProps {
  photoListRaw: Photo[];
  activeIndex: number;
  activePhoto: File;
  setActiveIndex: (index: number) => void;
}

interface Photo {
  photo: File;
}

export default function PhotoCarousel({
  photoListRaw,
  activeIndex,
  setActiveIndex,
  activePhoto,
}: UploadStepProps) {
  const nextActivePhoto = () => {
    if (activeIndex < photoListRaw.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  const lastActivePhoto = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="border border-neutral-black-20 rounded h-full w-2/3 mr-3 p-3">
      <div className="grow h-[30em] bg-neutral-black-10 flex items-center justify-center rounded">
        {photoListRaw && activePhoto && (
          <img
            src={`${URL.createObjectURL(activePhoto)}`}
            alt="Location Photo"
            // className="object-cover"
            id="locationPhoto"
            className="h-full rounded"
          />
        )}
      </div>
      <div className="w-full flex items-center mt-2 ">
        <button type="button" onClick={lastActivePhoto}>
          <ChevronLeftIcon
            className={classNames(
              'h-7 w-7 ',

              activeIndex > 0
                ? 'text-neutral-black-60'
                : 'text-neutral-black-10'
            )}
          />
        </button>
        <div className="w-full flex space-x-1 mx-1 overflow-x-auto">
          {photoListRaw.map((photo, index) => (
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              key={index}
              className={classNames(
                "h-12 p-1 overflow-hidden",
                index === activeIndex && 'bg-primary-blue-10 border border-primary-blue-20 rounded'
              )}
              
            >
              <img
                src={`${URL.createObjectURL(photo)}`}
                alt="Location Photo"
                // className="object-cover"
                id="locationPhoto"
                className="h-full"
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={nextActivePhoto}>
          <ChevronRightIcon
            className={classNames(
              'h-7 w-7 ',
              activeIndex < photoListRaw.length - 1
              ? 'text-neutral-black-60'
              : 'text-neutral-black-10'
            )}
          />
        </button>
      </div>
    </div>
  );
}
