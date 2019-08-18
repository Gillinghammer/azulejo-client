import React, { useState, useEffect } from "react";
import MapBox from "./components/MapBox";
import Menu from "./components/Menu";

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "/";

const styles = {
  mobile: {
    container: { display: "flex", flexDirection: "column-reverse" },
    map: { height: "40vh", width: "100vw" }
  },
  desktop: {
    container: { display: "flex", flexDirection: "row" },
    map: { height: "100vh", width: "100vw" }
  }
};

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
  const { loading, data } = useFetch(`${baseUrl}gps`);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={styles.mobile.container}>
          <Menu features={shuffle(data.features)} />
          <MapBox styles={styles} data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
