import React, { useEffect, useState } from 'react';
import LocationUpdateMap from './LocationUpdateMap';
import LocationUpdateHeader from './LocationUpdateHeader';
import Button from '../Button';

const DUMMY_STRUCTURE = {
  name: '**name',
  line: '**line',
  mile: '**mile',
  number: '**number',
  longitude: -97.1085,
  latitude: 32.9468,
};

export default function LocationUpdateTool() {
  const [newCoordinates, setNewCoordinates] = useState<[number, number]>([
    0, 0,
  ]);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (newCoordinates && newCoordinates[0] !== 0) {
      setIsConfirmDisabled(false);
    } else {
      setIsConfirmDisabled(true);
    }
  }, [newCoordinates]);

  const confirmPointUpdate = () => {
    console.log('new coords', newCoordinates);
  };
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col items-center my-8">
        <p className="text-2xl text-neutral-black-100 font-semibold capitalize">
          Update Structure Location
        </p>
        <p className="text-lg text-neutral-black-80">
          Upload the GPX files and images, add and make edits to the
          observations.{' '}
        </p>
      </div>
      <div className="mx-10">
        <LocationUpdateHeader structure={DUMMY_STRUCTURE} />

        <div className="border border-neutral-black-10 w-full mt-2 mb-5" />

        <LocationUpdateMap
          structure={DUMMY_STRUCTURE}
          newCoordinates={newCoordinates}
          setNewCoordinates={setNewCoordinates}
        />

        <div className="grid grid-cols-2 text-lg">
          <div className="p-10 text-neutral-black-100">
            <p className="text-2xl font-semibold mb-8">Current Location</p>
            <p>
              {DUMMY_STRUCTURE.longitude}, {DUMMY_STRUCTURE.latitude}
            </p>
          </div>
          <div className=" p-10 text-neutral-black-100">
            <p className="text-2xl font-semibold mb-8">New Location</p>
            {newCoordinates &&
            newCoordinates[0] !== 0 &&
            newCoordinates[1] !== 0 ? (
              <p>
                {newCoordinates[0]}, {newCoordinates[1]}{' '}
              </p>
            ) : (
              <p>No new location selected</p>
            )}
          </div>
        </div>
        <div className="rounded flex justify-end items-end my-32 space-x-8">
          <Button
            text="Confirm Location Update"
            onClick={confirmPointUpdate}
            disabled={isConfirmDisabled}
          />
        </div>
      </div>
    </div>
  );
}
