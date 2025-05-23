import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .nonempty('First name is required'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email format')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
});

export type SignUpFormInputs = z.infer<typeof schema>;

const useSignUpForm = () => {
  return useForm<SignUpFormInputs>({
    resolver: zodResolver(schema),
  });
};

export default useSignUpForm;
