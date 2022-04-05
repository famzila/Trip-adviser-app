import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

// import mapStyles from '../../mapStyles';
import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates }) => {
  const classes = useStyles;
  const isMobile = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <section>
        <GoogleMapReact
          className={classes.mapContainer}
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
          }}
          bootstrapURLKeys={{ key: "AIzaSyDm_2BJNpBHKA-fY7zVn5PZORUTnt0ZTS8" }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          options={""}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={() => {
            return null;
          }}
        ></GoogleMapReact>
      </section>
    </>
  );
};

export default Map;
