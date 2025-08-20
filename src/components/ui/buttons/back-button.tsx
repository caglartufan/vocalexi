'use client';
import { CircleArrowLeftIcon } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/buttons/button';
import { useRouter } from 'next/navigation';

export default function BackButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button {...props} onClick={router.back}>
      <CircleArrowLeftIcon className="size-6 text-black" />
    </Button>
  );
}
