import React, { useState, useEffect } from "react";
import ReactList from "react-list";
const staticUrl = "http://localhost:3001/";

const listRef = React.createRef();
const containerRef = React.createRef();

function Menu({ features }) {
  const [loading, setLoading] = useState(false);
  const [tiles, updateTiles] = useState(features);
  const [activeIndex, updateActive] = useState(null);

  function renderItem(index, key) {
    const imageLocation = tiles[index].properties.file.replace("jpg", "webp");
    return (
      <div
        key={key}
        style={{
          width: "100%",
          height: "700px",
          backgroundImage: `url(${staticUrl + imageLocation})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={foo => {
        // console.log("scroolll", listRef.current);
        let [first, last] = listRef.current.getVisibleRange();
        console.log(first, last);
        if (activeIndex != first) {
          updateActive(first);
          let coords = tiles[first].geometry.coordinates;
          window.mapObject.flyTo({
            center: coords,
            bearing: Math.random() * (180 - 0) + 0,
            pitch: 220,
            zoom: 20,
            speed: 1.5,
            curve: 1,
            easing(t) {
              return t;
            }
          });
        }
      }}
      style={{
        backgroundColor: "white",
        width: "475px",
        height: "100vh",
        overflow: "scroll"
      }}
    >
      <div
        style={{
          minHeight: "500px",
          backgroundColor: "black",
          color: "white",
          padding: "20px 40px"
        }}
      >
        <h1>Azulejos</h1>
        <p style={{ lineHeight: "22px" }}>
          I had an incredible opportunity to live in Lisbon, Portugal for two
          years. It struck me how beautiful many of the buildings in the city
          were. The facades of these buildings are ornately decorated with
          tiles, called <strong>Azulejos</strong> from the Arabic word{" "}
          <span style={{ fontStyle: "italic" }}>az-zulayj</span>, meaning
          "polished-stone".
        </p>
        <p style={{ lineHeight: "22px" }}>
          While living in Lisbon I took many photographs of my favorite Azulejos
          using my phone which saved the GPS coordinates for each photo. I
          decided to build an interactive map ({" "}
          <a
            target="_blank"
            style={{ color: "white", fontWeight: "light", fontStyle: "italic" }}
            href="https://docs.mapbox.com/"
          >
            with mapbox
          </a>{" "}
          ) to share these photos.
        </p>
        <p style={{ lineHeight: "22px" }}>Scroll down to begin.</p>
      </div>
      <ReactList
        ref={listRef}
        itemRenderer={renderItem}
        length={tiles.length}
        type="uniform"
      />
    </div>
  );
}

export default Menu;
