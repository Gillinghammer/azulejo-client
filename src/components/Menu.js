import React, { useState, useEffect } from "react";
import ReactList from "react-list";
const staticUrl =
  "https://res.cloudinary.com/dcjgbhye1/image/upload/v1565551211/tiles/";

const listRef = React.createRef();
const containerRef = React.createRef();

function Menu({ features }) {
  const [loading, setLoading] = useState(false);
  const [tiles, updateTiles] = useState(features);
  const [activeIndex, updateActive] = useState(null);

  function renderItem(index, key) {
    const imageLocation = tiles[index].properties.file;
    return (
      <div
        key={key}
        style={{
          // border: index === activeIndex ? "4px solid white" : "none",
          opacity: index !== activeIndex ? "0.25" : "1",
          transition: "opacity 1s ease-in-out",
          boxSizing: "border-box",
          display: "inline-block",
          width: "500px",
          height: "100vh",
          maxHeight: "500px",
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
      onScroll={s => {
        let [first, last] = listRef.current.getVisibleRange();
        console.log({ first, last });
        if (activeIndex != first) {
          updateActive(first);
          let coords = tiles[first].geometry.coordinates;
          window.mapObject.flyTo({
            center: coords,
            bearing: Math.random() * (180 - 0) + 0,
            pitch: 180,
            zoom: 19,
            speed: 1,
            curve: 1,
            easing(t) {
              return t;
            }
          });
        }
      }}
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "inline-block"
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          height: "100vh",
          maxHeight: "400px",
          backgroundColor: "black",
          color: "white",
          padding: "20px 40px",
          wordWrap: "break-word",
          whiteSpace: "normal",
          float: "left"
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
            style={{
              color: "white",
              fontWeight: "light",
              fontStyle: "italic"
            }}
            href="https://docs.mapbox.com/"
          >
            with Mapbox
          </a>{" "}
          ) to share these photos.
        </p>
        <h2 style={{ float: "right" }}>Scroll ></h2>
      </div>
      <ReactList
        ref={listRef}
        axis="x"
        itemRenderer={renderItem}
        length={tiles.length}
        type="simple"
        style={{ flex: 1 }}
      />
    </div>
  );
}

export default Menu;
