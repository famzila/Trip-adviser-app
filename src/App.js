import React, { useEffect, useState } from "react";
// Normalizing the style with Material's CssBaseline
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/header";
import List from "./components/List/list";
import Map from "./components/Map/map";
import Place from "./components/Place/place";
import Footer from "./components/Footer/footer";
import { getPlacesData } from "./api";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  // dependency set to [coordinates, bounds], whenver they are updated relaunch the apie.
  useEffect(() => {
    if (bounds) {
      getPlacesData(bounds.sw, bounds.ne).then(data => {
        console.log(data);
        setPlaces(data);
      })
    }

  }, [coordinates, bounds])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }} >
        {/* On mobile devices the item takes the whole place (12), on medium devices only (4) */}
        <Grid item ws={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item ws={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} places = {places} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default App;
