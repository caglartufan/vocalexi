import React from 'react';
import { FormikProps } from 'formik';
import { shouldShowFormikError } from '@/lib/utils';
import { Check } from 'lucide-react';

// Create a reusable icon component for success state
export const SuccessIcon = () => <Check className="h-4 w-4 text-success" />;

// Helper function to determine input variant
export function getInputVariant<T>(
  formik: FormikProps<T>,
  fieldName: keyof T,
): 'default' | 'error' | 'success' {
  if (!formik.touched[fieldName]) return 'default';
  return formik.errors[fieldName] ? 'error' : 'success';
}

// Helper function to check if field has error
export function hasFormikFieldError<T>(
  formik: FormikProps<T>,
  fieldName: keyof T,
): boolean {
  return shouldShowFormikError<T>(formik, fieldName);
}
