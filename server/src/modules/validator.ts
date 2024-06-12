import { body } from 'express-validator';
import { handleInputErrors } from './middleware';

export const loginValidator = [
  body('email', 'Email is required').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
  handleInputErrors,
];

// createNewUserValidator
// Validate name, email, and password fields

export const createNewUserValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Email is required').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
  handleInputErrors,
];
