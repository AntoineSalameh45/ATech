import { FieldErrors, UseFormReturn } from 'react-hook-form';

export type ProductFormProps = {
  form: UseFormReturn<any>;
  errors?: FieldErrors<any>;
  styles: any;
  onSelectLocation: () => void;
};
