import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorMessageProps {
  message: string;
  className?: string;
}

export function FormErrorMessage({ message, className }: FormErrorMessageProps) {
  return (
    <small className={cn('text-error flex items-center gap-1 mt-1 px-3', className)}>
      <AlertCircle className="h-3 w-3" />
      <span>{message}</span>
    </small>
  );
}
