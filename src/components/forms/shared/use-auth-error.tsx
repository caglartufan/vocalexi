'use client';
import { useState } from 'react';
import { FormError, initialFormError } from './form-error-alert';

export function useAuthError() {
  const [error, setError] = useState<FormError>(initialFormError);

  const clearError = () => setError(initialFormError);

  const setAuthError = (message: string, title?: string) => {
    setError({
      title: title || null,
      body: message,
      shouldShow: true,
    });
  };

  const setComplexError = (title: string | null, errors: string[]) => {
    setError({
      title,
      body: (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ),
      shouldShow: true,
    });
  };

  return {
    error,
    clearError,
    setAuthError,
    setComplexError,
  };
}
