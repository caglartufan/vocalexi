import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FormHeaderProps {
  title: string;
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        href="/"
        className="flex flex-col items-center gap-2 font-medium"
      >
        <div className="flex items-center justify-center gap-x-[11px] rounded-md">
          <Image
            src="/images/logo.png"
            alt="Vocalexi Logo"
            width={56.64}
            height={47.2}
            className="w-14"
          />
          <h1 className="text-3xl font-bold">Vocalexi</h1>
          <span className="sr-only">Vocalexi</span>
        </div>
      </Link>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}
