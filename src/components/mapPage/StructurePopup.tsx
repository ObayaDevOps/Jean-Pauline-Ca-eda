'use client';

import React from 'react';
import { Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import('@mapbox/tiny-sdf');

interface Props {
  activePoint: {
    id: string;
    org: string;
    properties: {};
    coordinates: [number, number];
  };
}

export default function StructurePopup({ activePoint }: Props) {
  const openLcxnUpdateTool = () => {
    console.log('Push to Lcxn Update Tool');
  };

  return (
    <div className="absolute flex w-full h-full z-50">
      <Popup
        anchor={'bottom'}
        offset={10}
        longitude={activePoint.coordinates[0]}
        latitude={activePoint.coordinates[1]}
      >
        <div className="text-md w-[12rem] h-[14rem] text-[14px] flex flex-col">
          <p className="text-lg mb-1">Structure</p>
          <div className="grow space-y-1">
            <p> {activePoint.id}</p>
            {activePoint.properties && (
              <>
                {Object.entries(activePoint.properties).map((key) => (
                  <p className="capitalize" key={key[0]}>
                    {key[0]} : {key[1]}
                  </p>
                ))}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={openLcxnUpdateTool}
            className="bg-primary-blue-100 p-1 text-neutral-black-02 rounded"
          >
            Update Location
          </button>
        </div>
      </Popup>
    </div>
  );
}
