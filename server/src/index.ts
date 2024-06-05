import app from './server';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
