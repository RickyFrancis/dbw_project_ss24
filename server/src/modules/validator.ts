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

export const createNewUserValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Email is required').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),

  // Address validations for an array of addresses
  body('addresses').isArray().withMessage('Addresses must be an array'),
  body('addresses.*.street', 'Street address is required').not().isEmpty(),
  body('addresses.*.city', 'City is required').not().isEmpty(),
  body('addresses.*.postalCode', 'Postal code is required')
    .not()
    .isEmpty()
    .matches(/^\d{5}(-\d{4})?$/, 'i'),
  body('addresses.*.country', 'Country is required').not().isEmpty(),

  // Optional fields for each address in the array
  body('addresses.*.street2').optional(),
  body('addresses.*.state').optional(),
  body('addresses.*.primaryAddress').optional(),

  handleInputErrors,
];

export const updateUserValidator = [
  body('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Name is required if provided'),

  // Email and password are optional, validate only if provided
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage('The minimum password length is 8 characters'),

  handleInputErrors,
];

export const createAddressValidator = [
  // Add address validations
  body('address.street', 'Street address is required').not().isEmpty(),
  body('address.city', 'City is required').not().isEmpty(),
  body('address.postalCode', 'Postal code is required').not().isEmpty(),
  body('address.country', 'Country is required').not().isEmpty(),
  // Optional fields
  body('address.street2').optional(),
  body('address.state').optional(),
  handleInputErrors,
  body('addresses.*.primaryAddress').optional(),

  handleInputErrors,
];

export const updateAddressValidator = [
  // Add address validations
  body('address.street', 'Street address is required').not().isEmpty(),
  body('address.city', 'City is required').not().isEmpty(),
  body('address.postalCode', 'Postal code is required').not().isEmpty(),
  body('address.country', 'Country is required').not().isEmpty(),
  // Optional fields
  body('address.street2').optional(),
  body('address.state').optional(),
  handleInputErrors,
  body('addresses.*.primaryAddress').optional(),
  handleInputErrors,
];

export const getDistanceValidator = [
  body('coords1', 'coords1 is required').exists().notEmpty(),
  body('coords1.latitude', 'coords1.latitude is required and must be a number')
    .exists()
    .isFloat(),
  body(
    'coords1.longitude',
    'coords1.longitude is required and must be a number'
  )
    .exists()
    .isFloat(),

  body('coords2', 'coords2 is required').exists().notEmpty(),
  body('coords2.latitude', 'coords2.latitude is required and must be a number')
    .exists()
    .isFloat(),
  body(
    'coords2.longitude',
    'coords2.longitude is required and must be a number'
  )
    .exists()
    .isFloat(),
  handleInputErrors,
];
