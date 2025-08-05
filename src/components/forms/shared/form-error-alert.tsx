'use client';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export type FormError = {
  title?: React.ReactNode;
  body: React.ReactNode;
  shouldShow: boolean;
};

export const initialFormError: FormError = {
  title: 'Error',
  body: null,
  shouldShow: false,
};

interface FormErrorAlertProps {
  error: FormError;
}

export function FormErrorAlert({ error }: FormErrorAlertProps) {
  if (!error.shouldShow) {
    return null;
  }

  return (
    <Alert variant="error">
      <AlertCircle className="h-4 w-4" />
      {error.title && <AlertTitle>{error.title}</AlertTitle>}
      {error.body && <AlertDescription>{error.body}</AlertDescription>}
    </Alert>
  );
}
