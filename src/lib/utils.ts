import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FormikProps } from 'formik';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shouldShowFormikError<T>(
  formik: FormikProps<T>,
  fieldName: keyof T,
) {
  return (
    typeof formik.errors[fieldName] === 'string' &&
    (formik.touched[fieldName] as boolean)
  );
}
