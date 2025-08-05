import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: [
          'border-input',
          'focus-visible:border-ring',
          'focus-visible:ring-ring/50',
          'focus-visible:ring-[3px]',
        ],
        error: [
          'border-error',
          'focus-visible:border-error',
          'focus-visible:ring-error/50',
          'focus-visible:ring-[3px]',
          'placeholder:text-error/60',
        ],
        success: [
          'border-success',
          'focus-visible:border-success',
          'focus-visible:ring-success/50',
          'focus-visible:ring-[3px]',
          'placeholder:text-success/60',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, rightElement, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className }),
            rightElement && 'pr-10',
          )}
          ref={ref}
          data-slot="input"
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
