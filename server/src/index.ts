import app from './server';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

// request https://nominatim.openstreetmap.org/search?street=Max-Türpe-Straße 58&format=json&addressdetails=1&limit=1&polygon_svg=1&postalcode=09122&city=Chemnitz with axios and log the result

// axios
//   .get(
//     'https://nominatim.openstreetmap.org/search?street=Max-Türpe-Straße 58&format=json&addressdetails=1&limit=1&polygon_svg=1&postalcode=09122&city=Chemnitz'
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
