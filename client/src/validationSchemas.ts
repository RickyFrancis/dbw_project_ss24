import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const registrationSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email('Invalid email')
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'The minimum password length is 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'The minimum password length is 8 characters' }),
    street: z.string().min(1, { message: 'Street address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().optional(),
    postalCode: z
      .string()
      .min(1, { message: 'Postal code is required' })
      .regex(/^\d{5}(-\d{4})?$/, 'Postal code is invalid'),
    country: z.string().min(1, { message: 'Country is required' }),
    primaryAddress: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This highlights the confirmPassword field if validation fails
  });

export const profileUpdateSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email('Invalid email')
      .min(1, { message: 'Email is required' }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure both password and confirmPassword are at least 8 characters long if provided
      if (data.password && data.password.length < 8) {
        return false;
      }
      if (data.confirmPassword && data.confirmPassword.length < 8) {
        return false;
      }
      return true;
    },
    {
      message: 'Password must be at least 8 characters long',
      path: ['password'], // Highlight the password field if validation fails
    }
  )
  .refine(
    (data) => {
      // Check if password is provided
      if (data.password && data.password.length > 0) {
        // Ensure confirmPassword is also provided and matches password
        return data.password === data.confirmPassword;
      }
      // If no password is provided, do not enforce confirmPassword checks
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'], // Highlight the confirmPassword field if validation fails
    }
  )
  .refine(
    (data) => {
      // Ensure that if password is provided, confirmPassword must also be provided
      if (data.password && !data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Confirm password is required if password is set',
      path: ['confirmPassword'], // Highlight the confirmPassword field if validation fails
    }
  );

export const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street address is required' }),
  street2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().optional(),
  postalCode: z
    .string()
    .min(1, { message: 'Postal code is required' })
    .regex(/^\d{5}(-\d{4})?$/, 'Postal code is invalid'),
  country: z.string().min(1, { message: 'Country is required' }),
  primaryAddress: z.boolean().optional(),
});
