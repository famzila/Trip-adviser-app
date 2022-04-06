import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

// import mapStyles from '../../mapStyles';
import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles;
  const isDesktop = useMediaQuery('(min-width:600px)');

  const defaultImg =
  "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";

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
        >
            { places?.map((place, index) => (
                <div key={index} className={ classes.makerContainer} lat={Number(place.latitude)} lng = {Number(place.longitude)}>
                    {isDesktop 
                      ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                      : (
                        <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                            <img
                              className={classes.pointer}
                              src={place.photo ? place.photo.images.large.url : defaultImg}
                            />
                            <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                        </Paper>
                      )}
                </div>
            ))}
        </GoogleMapReact>
      </section>
    </>
  );
};

export default Map;
