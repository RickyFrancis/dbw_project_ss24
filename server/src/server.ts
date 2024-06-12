import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, login } from './handlers/user';
import { handleInputErrors } from './modules/middleware';
import { body } from 'express-validator';
import { createNewUserValidator, loginValidator } from './modules/validator';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('hello from server');
  res.status(200);
  res.json({
    message: 'Hello from server!',
  });
});

app.use('/api', protect, router);
app.post('/user', createNewUserValidator, createNewUser);
app.post('/login', loginValidator, login);

export default app;
