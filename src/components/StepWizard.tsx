import { useEffect, useState } from 'react';
import FirstStep from './uploadSteps/firstStep/FirstStep';
import SecondStep from './uploadSteps/secondStep/SecondStep';
import ThirdStep from './uploadSteps/thirdStep/ThirdStep';
import FourthStep from './uploadSteps/fourthStep/FourthStep';
import FifthStep from './uploadSteps/FifthStep';
import UploadMap from './uploadSteps/uploadMap';

export default function StepWizard() {
  const [step, setStep] = useState<number>(0);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [trackPoints, setTrackPoints] = useState<[]>(); // maybe an array of objects?
  const [waypoints, setWaypoints] = useState<[]>();
  const [noRecordedPoints, setNoRecordedPoints] = useState<boolean>(false);
  const [propertyEdits, setPropertyEdits] = useState<[]>();  // TODO not sure how these will be handled?
  const [photoList, setPhotoList] = useState<File[]>();
  // const [noRecordedPhotos, setNoRecordedPhotos] = useState<boolean>(false);
  const [bulkUpload, setBulkUpload] = useState<object>({});

  useEffect(() => {

    //TODO this needs to reset subsequent steps if an earlier step gets cleared
    if (!trackPoints || trackPoints.length === 0) {
      // setWaypoints([])
      // setPhotoList([])
      // setPropertyEdits(??)
    }
    if (!waypoints || waypoints.length === 0) {
      // setPhotoList([])
      // setPropertyEdits(??)
    }
  }, [trackPoints]);

  const submitBulkUpload = () => {
    console.log(bulkUpload);
    const data = {
      track: trackPoints,
      points: waypoints,
      photos: photoList,
    };
    setBulkUpload(data)
    console.log(data);
  };

  return (
    <div className="mx-10 my-3">
      {showMap && <UploadMap />}

      <FirstStep
        step={step}
        setStep={setStep}
        setShowMap={setShowMap}
        trackPoints={trackPoints}
        setTrackPoints={setTrackPoints}
      />

      <SecondStep
        step={step}
        setStep={setStep}
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        noRecordedPoints={noRecordedPoints}
        setNoRecordedPoints={setNoRecordedPoints}
      />

      <ThirdStep
        step={step}
        setStep={setStep}
        noRecordedPoints={noRecordedPoints}
        propertyEdits={propertyEdits}
        setPropertyEdits={setPropertyEdits}
      />

      <FourthStep
        step={step}
        setStep={setStep}
        noRecordedPoints={noRecordedPoints}
        photoList={photoList}
        setPhotoList={setPhotoList}
        // setNoRecordedPhotos={setNoRecordedPhotos}
      />

      <FifthStep
        step={step}
        setStep={setStep}
        submitBulkUpload={submitBulkUpload}
      />
    </div>
  );
}
