'use client';

import React from 'react';
import DeckGL from '@deck.gl/react/typed';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -97.108,
  latitude: 32.944,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};

export default function UploadMap() {
  return (
    <div
      id="main-dashboard"
      className="relative h-80 bg-neutral-black-20 w-full overflow-hidden rounded-md"
    >
      <DeckGL id="deck-gl-obs" initialViewState={INITIAL_VIEW_STATE} controller>
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          logoPosition="bottom-right"
          attributionControl={false}
        />
      </DeckGL>
    </div>
  );
}
