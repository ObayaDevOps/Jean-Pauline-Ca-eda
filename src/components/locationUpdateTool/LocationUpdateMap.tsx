'use client';

import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react/typed';
import { Map, Marker } from 'react-map-gl';
import { FlyToInterpolator } from 'deck.gl/typed';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import('@mapbox/tiny-sdf');

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -97.108,
  latitude: 32.944,
  zoom: 16,
  pitch: 0,
  bearing: 0,
};

interface Props {
  structure: structure;
  newCoordinates: [number, number];
  setNewCoordinates: (coords: [number, number]) => void;
}
interface structure {
  name: string;
  line: string;
  mile: string;
  number: string;
  longitude: number;
  latitude: number;
}

export default function LocationUpdateMap({
  structure,
  newCoordinates,
  setNewCoordinates,
}: Props) {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE);

  const getLatLong = (e: any) => {
    setNewCoordinates(e.coordinate);
  };

  useEffect(() => {
    if (structure && structure.longitude && structure.latitude) {
      setInitialViewState({
        ...initialViewState,
        longitude: structure.longitude,
        latitude: structure.latitude,
      });
    }
  }, [structure]);

  const centerMap = () => {
    setInitialViewState({
      ...initialViewState,
      longitude: structure.longitude,
      latitude: structure.latitude,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  return (
    <div
      id="main-dashboard"
      className="relative h-[32rem] bg-neutral-black-20 w-full overflow-hidden rounded-md"
    >
      <DeckGL
        onClick={getLatLong}
        id="deck-gl-obs"
        initialViewState={initialViewState}
        controller
      >
        <div className="absolute flex w-full justify-end">
          <CubeTransparentIcon
            className="m-3 h-12 w-12 p-2 text-neutral-black-02 bg-neutral-black-100 bg-opacity-90 rounded hover:brightness-125 z-20 pointer-events-auto"
            onClick={centerMap}
          />
        </div>
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          logoPosition="bottom-right"
          attributionControl={false}
        >
          <Marker
            color="#3477FF"
            longitude={structure.longitude}
            latitude={structure.latitude}
          />
          <Marker
            color="#12E6D4"
            scale={1.3}
            longitude={newCoordinates[0]}
            latitude={newCoordinates[1]}
          />
        </Map>
      </DeckGL>
    </div>
  );
}
