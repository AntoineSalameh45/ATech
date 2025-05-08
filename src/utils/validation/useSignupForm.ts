import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').nonempty('Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits')
    .nonempty('Phone number is required'),
});

export type SignUpFormInputs = z.infer<typeof schema>;

const useSignUpForm = () => {
  return useForm<SignUpFormInputs>({
    resolver: zodResolver(schema),
  });
};

export default useSignUpForm;
