import Button from '@/src/components/Button';
import BulkImageDrop from '@/src/components/BulkImageDrop';

interface props {
  setPhotoListRaw: (photoList: Photo[]) => void;
  setRejectedFileList: (photoList: Photo[]) => void;
  confirmNoPhotos(): any;
}

interface Photo {
  photo: File;
}

export default function UploadPhotos({
  setPhotoListRaw,
  setRejectedFileList,
  confirmNoPhotos,
}: props) {
  return (
    <>
      <BulkImageDrop
        setFileList={setPhotoListRaw}
        setRejectedFileList={setRejectedFileList}
      />

      <div className="flex items-center space-x-7 my-8">
        <div className="border border-neutral-black-10 w-full h-0" />
        <p className="text-neutral-black-60">or</p>
        <div className="border border-neutral-black-10 w-full h-0" />
      </div>
      <div className="flex justify-center items-center my-3 text-neutral-black-100">
        <p>
          If you did not encounter anything to report during this patrol, please
          select continue to move onto the last step.
        </p>
      </div>
      <div className="rounded flex justify-end items-center my-6 space-x-8">
        <Button text="Continue" onClick={confirmNoPhotos} />
      </div>
    </>
  );
}
