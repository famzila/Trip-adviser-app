import React from "react";
// Normalizing the style with Material's CssBaseline
import { CssBaseline, Grid} from "@material-ui/core";

import Header from "./components/Header/header";
import List from "./components/List/list";
import Map from "./components/Map/map";
import Place from "./components/Place/place";
import Footer from "./components/Footer/footer";


function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style= {{ width: "100%" }} >
        {/* On mobile devices the item takes the whole place (12), on medium devices only (4) */}
          <Grid item ws={12} md={4}>
              <List />
          </Grid>
          <Grid item ws={12} md={8}>
              <Map />
          </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default App;
