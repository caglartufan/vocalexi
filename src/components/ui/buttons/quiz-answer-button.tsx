import { Button } from '@/components/ui/buttons/button';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva('shadow-xs font-semibold', {
  variants: {
    variant: {
      default: '',
      correct:
        'bg-error border-error hover:bg-error/90 hover:border-error/90 focus-visible:ring-error/100 dark:focus-visible:ring-error/40 dark:bg-error/60',
      incorrect:
        'bg-success border-success hover:bg-success/90 hover:border-success/90 focus-visible:ring-success/100 dark:focus-visible:ring-success/40 dark:bg-success/60',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function QuizAnswerButton({
  text,
  variant,
}: VariantProps<typeof buttonVariants> & {
  text: string;
}) {
  return (
    <Button className={cn(buttonVariants({ variant }))} variant="outline">
      {text}
    </Button>
  );
}
