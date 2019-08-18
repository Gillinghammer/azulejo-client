import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  interactive: false,
  accessToken:
    "pk.eyJ1IjoiZ2lsbGluZ2hhbW1lciIsImEiOiJjanhncGdlbWIwZHV2M25sOTRrejAxdXh2In0.1NBBK0vBhittPri4JX8prg"
});

// https://docs.mapbox.com/mapbox-gl-js/style-spec/#types-layout

function MapBox({ data, styles }) {
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
      style="mapbox://styles/mapbox/satellite-streets-v10?optimize=true"
      containerStyle={styles.mobile.map}
    >
      <Layer
        type="symbol"
        id="marker"
        layout={{
          "icon-image": "marker-15",
          "icon-size": 3,
          "icon-pitch-alignment": "auto"
        }}
      >
        {data.features.map((feature, index) => (
          <Feature key={feature} coordinates={feature.geometry.coordinates} />
        ))}
      </Layer>
    </Map>
  );
}

export default MapBox;
