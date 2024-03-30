import classNames from '@/src/app/utils/classNames';
import StepIndicator from '@/src/components/StepIndicator';
import StepSummary from '@/src/components/StepSummary';
import DropZone from '@/src/components/DropZone';
import { useState, useEffect } from 'react';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';
import RangeSelectorCard from './RangeSelectorCard';
import GPXListCard from './GPXListCard';

const DUMMY_DATA = {
  startDate: '05/23/23 8:30AM',
  endDate: '06/15/23 2:30PM',
  infoText: 'description of information text here', //TODO
};

interface UploadStepProps {
  step: number;
  setStep: (step: number) => void;
  setShowMap: (showMap: boolean) => void;
  trackPoints: trackPointProp[];
  setTrackPoints: (points: string) => void;
}

interface trackPointProp {
  file: File;
  name: string;
}

export default function FirstStep({
  step,
  setStep,
  setShowMap,
  trackPoints,
  setTrackPoints,
}: UploadStepProps) {
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [trackPointsRaw, setTrackPointsRaw] = useState<File[]>();

  useEffect(() => {
    if (trackPointsRaw && trackPointsRaw.length > 0) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [trackPointsRaw]);

  const confirmTrackPoints = () => {
    //TODO
    // use trackPointsRaw to create a new single file that includes all of the
    setTrackPoints(trackPointsRaw);
    setStep(step + 1);
    // console.log(trackPointsRaw);

    const reader = new FileReader();
    reader.readAsText(trackPointsRaw[0]);
    reader.onloadend = () => {
      console.log(reader.result);
    };
  };

  return (
    <div className={classNames('flex mt-8')}>
      <StepIndicator step={step} thisStep={1} />

      <div className="w-full pl-4 ">
        {trackPoints && trackPoints.length > 0 ? (
          <StepSummary
            onClick={() => setStep(0)}
            mainText={'Flight Track Uploaded'}
            chipText={`Trimmed to: ${DUMMY_DATA.startDate} - ${DUMMY_DATA.endDate}`}
          />
        ) : (
          <div className="flex items-center">
            <p className="text-neutral-black-100 font-medium">
              Add <span className="font-semibold italic">track_points.gpx</span>{' '}
              files
            </p>
            <InfoModal
              title="Add track_points.gpx Files"
              text={DUMMY_DATA.infoText}
              height="h-96"
              width="w-[30em]"
            />
          </div>
        )}
        {step === 0 && (!trackPointsRaw || trackPointsRaw.length === 0) && (
          <div className="mb-8">
            <DropZone
              setFileList={setTrackPointsRaw}
              type={'application/gpx+xml'}
            />
          </div>
        )}
        {step === 0 && trackPointsRaw && trackPointsRaw.length > 0 && (
          <>
            <div className="flex my-3 ">
              <RangeSelectorCard
                startDateTime={startDateTime}
                setStartDateTime={setStartDateTime}
                endDateTime={endDateTime}
                setEndDateTime={setEndDateTime}
              />

              <GPXListCard
                trackPointsRaw={trackPointsRaw}
                setTrackPointsRaw={setTrackPointsRaw}
                setTrackPoints={setTrackPoints}
              />
            </div>
            <div className="rounded flex justify-end items-center my-6 space-x-8">
              <Button text="Continue" onClick={confirmTrackPoints} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
