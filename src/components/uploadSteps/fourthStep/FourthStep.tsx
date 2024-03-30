import { useEffect, useState } from 'react';
import classNames from '@/src/app/utils/classNames';
import StepIndicator from '@/src/components/StepIndicator';
import StepSummary from '@/src/components/StepSummary';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';
import UploadPhotos from './UploadPhotos';
import BulkImageDrop from '@/src/components/BulkImageDrop';
import PhotoCarousel from './ImageCarousel';
import MatchDetailsCard from './MatchDetailsCard';

interface UploadStepProps {
  step: number;
  setStep: (step: number) => void;
  noRecordedPoints: boolean;
  photoList: string;
  setPhotoList: (photoList: Photo[]) => void;
  setNoRecordedPhotos: (noPhotos: boolean) => void;
}

interface Photo {
  photo: File;
}

export default function FourthStep({
  step,
  setStep,
  noRecordedPoints,
  photoList,
  setPhotoList,
}: // setNoRecordedPhotos,
UploadStepProps) {
  const [photoListRaw, setPhotoListRaw] = useState<Photo[]>([]);
  const [additionalPhotos, setAdditionalPhotos] = useState<Photo[]>([]);
  const [rejectedFileList, setRejectedFileList] = useState<Photo[]>([]);
  const [activePhoto, setActivePhoto] = useState<File>(photoListRaw[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);

  useEffect(() => {
    if (activeIndex) {
      setActivePhoto(photoListRaw[activeIndex]);
    } else {
      setActivePhoto(photoListRaw[0]);
    }
  }, [activeIndex, photoListRaw]);

  useEffect(() => {
    const arr = photoListRaw.concat(additionalPhotos);
    const uniqueArr = [];

    arr.forEach((obj) => {
      let found = false;
      uniqueArr.forEach((uniqueObj) => {
        if (uniqueObj.path === obj.path) {
          found = true;
        }
      });
      if (!found) {
        uniqueArr.push(obj);
      }
    });
    setPhotoListRaw(uniqueArr);
  }, [additionalPhotos]);

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

  const removePhoto = () => {
    setPhotoListRaw(photoListRaw?.filter((el) => el.path !== activePhoto.path));
    setDeletePhoto(false);
  };

  const confirmPhotos = () => {
    setPhotoList(photoListRaw);
    setStep(step + 1);
    // setNoRecordedPhotos(false);
  };
  const confirmNoPhotos = () => {
    setPhotoList([]);
    setStep(step + 1);
    // setNoRecordedPhotos(true);
  };

  return (
    <div className={classNames('flex')}>
      <StepIndicator step={step} thisStep={4} noPoints={noRecordedPoints} />
      <div className="w-full pl-4">
        {photoList ? (
          <StepSummary
            onClick={() => setStep(3)}
            mainText={'Photos Added'}
            chipText={
              photoList === '0'
                ? 'No photos added'
                : `${photoList.length} Photos Approved`
            }
          />
        ) : (
          <div
            className={classNames(
              'flex items-center',
              noRecordedPoints && 'opacity-30 '
            )}
          >
            <p
              className={classNames(
                'font-medium',
                step < 3 ? 'text-neutral-black-60 ' : 'text-neutral-black-100'
              )}
            >
              Add Photos
            </p>

            <InfoModal
              title="Adding Photos"
              text="description of information text here" //TODO
              height="h-96"
              width="w-[30em]"
              muted={step < 3}
            />
          </div>
        )}

        {step === 3 && photoListRaw && photoListRaw.length === 0 && (
          <UploadPhotos
            setPhotoListRaw={setPhotoListRaw}
            setRejectedFileList={setRejectedFileList}
            confirmNoPhotos={confirmNoPhotos}
          />
        )}

        {step === 3 && photoListRaw && photoListRaw.length > 0 && (
          <>
            <div className="flex items-center space-x-4 my-1">
              <div className="border border-neutral-black-10 w-full h-0" />
              <p className="text-neutral-black-100 font-medium whitespace-nowrap">
                <span className="font-semibold mr-1">
                  0 / {photoListRaw.length}
                </span>
                Matches Approved
              </p>
              <div className="border border-neutral-black-10 w-full h-0" />
            </div>
            <div className="flex mt-2">
              <PhotoCarousel
                photoListRaw={photoListRaw}
                activeIndex={activeIndex}
                activePhoto={activePhoto}
                setActiveIndex={setActiveIndex}
              />
              <div className=" w-1/3 flex flex-col items-center space-y-3 ">
                <div className="w-full">
                  <BulkImageDrop
                    setFileList={setAdditionalPhotos}
                    small={true}
                    setRejectedFileList={setRejectedFileList}
                  />
                </div>
                <MatchDetailsCard
                  setPhotoListRaw={setPhotoListRaw}
                  activePhoto={activePhoto}
                  photoListRaw={photoListRaw}
                />
              </div>
            </div>
            <div className="rounded flex justify-end items-center my-6 space-x-8">
              <Button text="Continue" onClick={confirmPhotos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
