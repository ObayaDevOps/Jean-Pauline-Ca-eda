import { useState } from 'react';
import classNames from '@/src/app/utils/classNames';
import StepIndicator from '@/src/components/StepIndicator';
import StepSummary from '@/src/components/StepSummary';
import DropZone from '@/src/components/DropZone';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';
import WaypointTable from './WaypointTable';
import WaypointGPXListCard from './WaypointGPXListCard';

const dummy_waypoints = [
  {
    id: 1,
    gpxId: 2816,
    time: '2023-03-29 13:15:56	',
    longitude: '-96.69825	',
    latitude: '32.50709',
    elevation: '	343.0',
  },
  {
    id: 2,
    gpxId: 2817,
    time: '2023-03-29 13:20:42	',
    longitude: '-96.699197',
    latitude: '32.58588',
    elevation: '	310.3',
  },
  {
    id: 3,
    gpxId: 2818,
    time: '2023-03-29 13:23:07	',
    longitude: '-96.73889	',
    latitude: '32.62597',
    elevation: '	299.0',
  },
  {
    id: 4,
    gpxId: 2819,
    time: '2023-03-03 22:57:33	',
    longitude: '-99.14713	',
    latitude: '35.83766',
    elevation: '	688.1 ',
  },
  {
    id: 5,
    gpxId: 2820,
    time: '2023-03-29 13:42:39	',
    longitude: '-97.03205	',
    latitude: '32.52206',
    elevation: '	379.3',
  },
  {
    id: 6,
    gpxId: 2821,
    time: '2023-03-29 13:44:50	',
    longitude: '-97.02976	',
    latitude: '32.47817',
    elevation: '	386.0',
  },
  {
    id: 7,
    gpxId: 2822,
    time: '2023-03-29 14:41:29	',
    longitude: '-96.48379	',
    latitude: '31.37035',
    elevation: '	309.6',
  },
  {
    id: 8,
    gpxId: 2823,
    time: '2023-03-29 14:43:40	',
    longitude: '-96.50066	',
    latitude: '31.32107',
    elevation: '	304.6',
  },
  {
    id: 9,
    gpxId: 2824,
    time: '2023-03-29 14:45:29	',
    longitude: '-96.50390	',
    latitude: '31.31947',
    elevation: '	266.4',
  },
  {
    id: 10,
    gpxId: 2825,
    time: '	2023-03-29 15:01:55',
    longitude: '	-96.39824',
    latitude: '	31.31229',
    elevation: '	250.3',
  },
  {
    id: 11,
    gpxId: 2826,
    time: '	2023-03-29 15:03:49',
    longitude: '	-96.37505',
    latitude: '	31.25687',
    elevation: '	236.1',
  },
  {
    id: 12,
    gpxId: 2827,
    time: '	2023-03-29 15:08:25',
    longitude: '	-96.34227',
    latitude: '	31.13548',
    elevation: '	271.9',
  },
  {
    id: 13,
    gpxId: 2828,
    time: '	2023-03-29 16:24:19',
    longitude: '	-95.89173',
    latitude: '	30.09626',
    elevation: '	242.3',
  },
  {
    id: 14,
    gpxId: 2829,
    time: '	2023-03-29 17:42:30',
    longitude: '	-96.26491',
    latitude: '	30.80513',
    elevation: '	241.1',
  },
  {
    id: 15,
    gpxId: 2830,
    time: '	2023-03-29 18:03:01',
    longitude: '	-95.98172',
    latitude: '	31.28274',
    elevation: '	278.1',
  },
];
const DUMMY_DATA = {
  includedPoints: 112,
  totalPoints: 431,
};

interface UploadStep {
  step: number;
  setStep: (step: number) => void;
  waypoints: [];
  setWaypoints: (points: []) => void;
  noRecordedPoints: boolean;
  setNoRecordedPoints: (points: boolean) => void;
}

export default function SecondStep({
  step,
  setStep,
  waypoints,
  setWaypoints,
  noRecordedPoints,
  setNoRecordedPoints,
}: UploadStep) {
  const [waypointsRaw, setWaypointsRaw] = useState<File[]>();

  const confirmWaypoints = () => {
    //TODO this will be updated to use the raw waypoints create a new clean array? to set the waypoints state
    setWaypoints(waypointsRaw);
    setNoRecordedPoints(false);
    setStep(step + 1);
  };
  const confirmNoWaypoints = () => {
    setWaypoints([]);
    setWaypointsRaw([]);
    setNoRecordedPoints(true);
    setStep(4);
  };

  return (
    <div className={classNames('flex')}>
      <StepIndicator step={step} thisStep={2} />
      <div className="w-full pl-4">
        {waypoints ? (
          <StepSummary
            onClick={() => setStep(1)}
            mainText={'Waypoints Uploaded'}
            chipText={
              noRecordedPoints
                ? 'No points recorded'
                : `Included Waypoints: ${DUMMY_DATA.includedPoints} / ${DUMMY_DATA.totalPoints}`
            }
          />
        ) : (
          <div className="flex items-center">
            <p
              className={classNames(
                'font-medium',
                step < 1 ? 'text-neutral-black-60 ' : 'text-neutral-black-100'
              )}
            >
              Add <span className="font-semibold italic">waypoints.gpx</span>{' '}
              files
            </p>

            <InfoModal
              title="Add waypoints.gpx Files"
              text="description of information text here" //TODO
              height="h-96"
              width="w-[30em]"
              muted={step < 1}
            />
          </div>
        )}

        {step === 1 && (!waypointsRaw || waypointsRaw.length === 0) && (
          <>
            <DropZone setFileList={setWaypointsRaw} />
            <div className="flex items-center space-x-7 my-8">
              <div className="border border-neutral-black-10 w-full h-0" />
              <p className="text-neutral-black-80">or</p>
              <div className="border border-neutral-black-10 w-full h-0" />
            </div>
            <div className="flex justify-center items-center my-3 text-neutral-black-100">
              <p>
                If you did not encounter anything to report during this patrol,
                please select continue to move onto the last step.{' '}
              </p>
            </div>
            <div className="rounded flex justify-end items-center my-6 space-x-8">
              <Button text="Continue" onClick={confirmNoWaypoints} />
            </div>
          </>
        )}
        {step === 1 && waypointsRaw && waypointsRaw.length > 0 && (
          <>
            <div className="flex w-full border-b mt-3 px-2 space-x-20">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-neutral-black-60 text-md">
                  Included Waypoints
                </p>
                <p className="font-medium text-neutral-black-100 text-3xl">
                  {DUMMY_DATA.includedPoints}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-neutral-black-60 text-md">
                  Total
                </p>
                <p className=" text-neutral-black-60 text-3xl">
                  {DUMMY_DATA.totalPoints}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-neutral-black-60 text-md">
                  {' '}
                  Excluded
                </p>
                <p className="text-neutral-black-60 text-3xl">
                  {DUMMY_DATA.totalPoints - DUMMY_DATA.includedPoints}
                </p>
              </div>
              <div className="flex grow items-end justify-end p-1">
                <p className="text-neutral-black-100">
                  Learn more about how these points are selected.
                </p>
                <InfoModal
                  title="Included Waypoints"
                  text="description of information text here" //TODO
                  height="h-96"
                  width="w-[30em]"
                  muted={true}
                />
              </div>
            </div>
            <div className="flex my-5 ">
              <WaypointTable waypoints={dummy_waypoints} />
              <WaypointGPXListCard
                waypointsRaw={waypointsRaw}
                setWaypointsRaw={setWaypointsRaw}
                setWaypoints={setWaypoints}
              />
            </div>
            <div className="rounded flex justify-end items-center my-6 space-x-8">
              <Button text="Continue" onClick={confirmWaypoints} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
