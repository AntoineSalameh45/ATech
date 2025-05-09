import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
