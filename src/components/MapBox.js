import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  ScaleControl,
  ZoomControl,
  GeoJSONLayer
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  interactive: false,
  accessToken:
    "pk.eyJ1IjoiZ2lsbGluZ2hhbW1lciIsImEiOiJjanhncGdlbWIwZHV2M25sOTRrejAxdXh2In0.1NBBK0vBhittPri4JX8prg"
});

// https://docs.mapbox.com/mapbox-gl-js/style-spec/#types-layout

function MapBox({ data }) {
  const lisboaCoords = [-9.142685, 38.736946];
  const startingZoom = [11];

  return (
    <Map
      center={lisboaCoords}
      zoom={startingZoom}
      pitch={[90]}
      bearing={[-20]}
      onStyleLoad={(map, load) => {
        window.mapObject = map;
        console.log("map on style load", map, load, window);
      }}
      style="mapbox://styles/gillinghammer/cjz66ih1y0zk61dnx8a5ci9om"
      containerStyle={{ height: "100vh", width: "100vw" }}
    >
      <ScaleControl />
      <ZoomControl />
      <Layer
        type="symbol"
        id="marker"
        layout={{
          "icon-image": "marker-15",
          "icon-size": 1.5,
          "icon-pitch-alignment": "auto"
        }}
      >
        {data.features.map((feature, index) => (
          <Feature
            key={feature}
            // onClick={evt => {
            //   console.log(evt, feature);
            //   evt.map.flyTo({
            //     center: evt.lngLat,
            //     bearing: Math.random() * (180 - 0) + 0,
            //     pitch: 220,
            //     zoom: 18,
            //     speed: 1,
            //     curve: 1,
            //     easing(t) {
            //       return t;
            //     }
            //   });
            // }}
            coordinates={feature.geometry.coordinates}
          />
        ))}
      </Layer>
    </Map>
  );
}

export default MapBox;
