import axios from 'axios';


const API_URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlacesData = async (sw, ne) => {
    try {
        const options = {
            method: 'GET',
            url: API_URL,
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': 'f6ac3734d4mshc3e97ae05773fa0p15abfcjsn4cd3b0a5cfd3'
            }
          };
        const { data: { data } } = await axios.get(API_URL, options);
        return data;
    } catch (error) {
        console.log(error);
    }
}