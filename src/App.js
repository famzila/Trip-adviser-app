import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api/index';
import Header from './components/Header/header';
import List from './components/List/list';
import Map from './components/Map/map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let latitude = 48.856614;
    let longitude = 2.3522219;
    setCoords({ lat: latitude, lng: longitude });
    
    // Uncomment for geolocalization
    // navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    //   setCoords({ lat: latitude, lng: longitude });
    // });
  }, []);

  // Reexecute when rating has changed
  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    if(filtered){
      setFilteredPlaces(filtered);
    }
  }, [rating]);

  // Reexecute when type or bounds have changed
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      if(coords){
        getWeatherData(coords.lat, coords.lng)
          .then((data) => setWeatherData(data));
      }
      if(type){
        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating('');
            setIsLoading(false);
          });
      }
    }
  }, [bounds, type]);

  const onLoad = (autoComplete) => setAutocomplete(autoComplete);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;