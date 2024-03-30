"use client";

import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { PathLayer } from "deck.gl";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useStructures from "@/src/hooks/useStructures";
import useLines from "@/src/hooks/useLines";
import StructurePopup from "./StructurePopup";
import("@mapbox/tiny-sdf");

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZWR1YXJkbzAwMDAiLCJhIjoiY2xrdWpxNjJkMHFoaDNnbzRvMDUyamQxaiJ9.j4Zj8C7GKclIMvEYDRHJdw";

const INITIAL_VIEW_STATE = {
  longitude: -97.108,
  latitude: 32.944,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};
interface activePoint {
  id: string
  org: string
  properties: {}
  coordinates: [number, number]
}

export default function MainMap() {
  const [structurePoints, setStructurePoints] = useState<[]>([]);
  const [assetLines, setAssetLines] = useState<[]>([]);
  const [activePoint, setActivePoint] = useState<activePoint>({
    id: '',
    org:'',
    properties: {},
    coordinates: [0,0]
  });

  const { structures } = useStructures();
  const { lines } = useLines();

  // console.log(structures);
  // console.log(lines);

  useEffect(() => {
    if (structures) {
      const dataArray = structures.map((i) => ({
        id: i._id,
        org: i.org,
        properties: {
          lineName: i.properties.lineName,
          power: i.properties.power,
          osmId: i.properties.osmId,
          type: i.properties.type,
          material: i.properties?.material,
        },
        coordinates: [i.geometry.coordinates[0], i.geometry.coordinates[1]],
      }));

      setStructurePoints(dataArray);
    }
  }, [structures]);

  useEffect(() => {
    if (lines) {
      const lineDataArray = lines.map((i) => ({
        id: i._id,
        org: i.org,
        name: i.name,
        path: i.geometry.coordinates,
      }));
      setAssetLines(lineDataArray);
    }
  }, [lines]);

  function onPointSelect(d) {
    console.log(d.object);
    setActivePoint(d.object);
    // dispatch({ type: 'setActivePoint', payload: d.object.id });
  }

  const scatterPlot = new ScatterplotLayer({
    id: "points",
    data: structurePoints,
    pickable: true,
    opacity: 0.8,
    filled: true,
    radiusScale: 200,
    radiusMinPixels: 4,
    radiusMaxPixels: 25,
    getRadius: 5,
    getPosition: (d) => d.coordinates,
    getFillColor: () => [243, 86, 39, 98],
    onClick: (d) => onPointSelect(d),
  });

  const pathLayer = new PathLayer({
    id: "path-layer",
    data: assetLines,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: (d) => d.path,
    getColor: () => [243, 86, 39, 98],
    getWidth: (d) => 5,
    onClick: (d) => onPointSelect(d),
  });

  const getLayers = () => {
    const arr = [scatterPlot, pathLayer];
    return arr;
  };

  return (
    <div
      id="main-dashboard"
      className="relative h-full bg-neutral-black-20 w-full">
      <DeckGL
        id="deck-gl-obs"
        ContextProvider={MapProvider}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={getLayers()}>
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          logoPosition="bottom-right"
          attributionControl={true}
        >
          {/* {activePoint && activePoint.coordinates && (
            <StructurePopup activePoint={activePoint} />
          )} */}
        </Map>
      </DeckGL>
    </div>
  );
}
