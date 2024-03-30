import React, { FC, useEffect, useState, useRef } from "react";
import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface DataType {
  priority: string;
  observationDate: string;
  status: string;
  type: string;
  geometry: [number, number];
}

interface ObservationsMapProps {
  data: DataType[];
}

const ObservationsMap: FC<ObservationsMapProps> = ({ data }) => {
  const [popupInfo, setPopupInfo] = useState<DataType | null>(null);
  const mapRef = useRef<any>();

  const toggle3D = () => {
    const map = mapRef.current.getMap();
    map.easeTo({ pitch: map.getPitch() === 0 ? 60 : 0 });
  };

  useEffect(() => {
    const button = document.createElement("button");
    button.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-compass";
    button.title = "Toggle 2D/3D";
    button.addEventListener("click", toggle3D);

    const mapElement = document.getElementsByClassName(
      ".mapboxgl-ctrl-top-right"
    );
    console.log("mapElement", mapElement);
    if (mapElement) {
      // mapElement.appendChild(button);
    }
  }, [popupInfo]);
  return (
    <>
      {" "}
      {/* <button onClick={handleClick}>Toggle 2D/3D</button>{" "} */}
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiZWR1YXJkbzAwMDAiLCJhIjoiY2xrdWpxNjJkMHFoaDNnbzRvMDUyamQxaiJ9.j4Zj8C7GKclIMvEYDRHJdw"
        mapStyle="mapbox://styles/mapbox/light-v11"
        initialViewState={{
          latitude: 35.668641,
          longitude: -138.750567,
          zoom: 3,
          pitch: 0,
          bearing: 0,
        }}
        maxZoom={20}
        minZoom={3}>
        {data &&
          data.map((item, index) => (
            <Marker
              key={index}
              latitude={item.geometry[0]}
              longitude={item.geometry[1]}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => setPopupInfo(item)}>
              {popupInfo && item.id == popupInfo.id ? (
                <img src="/icons/marker.png" className="w-7 h-7 mt-5" />
              ) : item.priority === "High" ? (
                <div className="bg-yellow-400 rounded-full h-2 w-2 border border-black-500"></div>
              ) : item.priority === "Maintenance" ? (
                <div className="bg-blue-400 rounded-full h-2 w-2 border border-black-500"></div>
              ) : (
                item.priority === "Critical" && (
                  <div className="bg-red-400 rounded-full h-2 w-2 border border-black-500"></div>
                )
              )}
            </Marker>
          ))}
        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="bottom"
            offsetTop={30}
            closeOnClick={false}
            latitude={popupInfo.geometry[0]}
            longitude={popupInfo.geometry[1]}
            onClose={() => setPopupInfo(null)}
            className=" rounded-xl">
            <div
              style={{ width: "150px", height: "70px" }}
              className="pl-4 flex">
              <div className="w-[50%] text-zinc-600">
                <p>Company</p>
                <p>Type</p>
                <p>Date</p>
                <p>Status</p>
              </div>
              <div className="w-[50%]">
                <p>Company</p>
                <p>{popupInfo.type}</p>
                <p>{popupInfo.observationDate}</p>
                <p>{popupInfo.status}</p>
              </div>
            </div>
          </Popup>
        )}

        <FullscreenControl position="top-right" />
        <NavigationControl showCompass={false} position="top-right" />
      </Map>
    </>
  );
};

export default ObservationsMap;
