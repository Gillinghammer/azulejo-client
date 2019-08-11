import React, { useState, useEffect } from "react";
import MapBox from "./components/MapBox";
import Menu from "./components/Menu";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};

function App() {
  const { loading, data } = useFetch("http://localhost:3001/gps");

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex" }}>
          <Menu features={shuffle(data.features)} />
          <MapBox data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
