'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/buttons/button';
import {
  ChevronDownIcon,
  CircleArrowLeftIcon,
  LanguagesIcon,
  MenuIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BackButton from '@/components/ui/buttons/back-button';
import { useNav } from '@/context/nav-context';

export default function MobileHeader() {
  const { routeConfig } = useNav();
  const shouldShowTitle = Boolean(routeConfig?.title);

  return (
    <div>
      <div
        className={cn(
          'flex items-end px-7 py-4 rounded-b-4xl bg-primary text-white relative z-50',
          shouldShowTitle ? 'shadow-sm' : 'shadow-md',
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Image
              src="/images/person.jpg"
              alt="Person"
              width={480}
              height={480}
              className="size-8 border border-white rounded-full"
            />
            <span className="font-semibold text-2xl">John Smith</span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-1 bg-transparent shadow-none h-auto">
              <div className="bg-white p-0.5 rounded-xs">
                <LanguagesIcon size={10} className="text-primary size-[13px]" />
              </div>
              <span className="leading-none text-xs font-semibold">
                Language
              </span>
              <ChevronDownIcon size={14} />
            </Button>
            <Button className="bg-tertiary rounded-sm size-6" size="icon">
              <MenuIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* TODO: Add a slide down animation to below part when title is shown */}
      {shouldShowTitle && (
        <div
          className={cn(
            'bg-secondary pt-8 -mt-8 shadow-md',
            routeConfig?.className,
          )}
        >
          <div className="flex items-center gap-x-1 px-6 py-2">
            <BackButton variant="ghost" size="icon" className="size-8">
              <CircleArrowLeftIcon className="size-6 text-black" />
            </BackButton>
            <h1 className="text-black text-xl font-bold">
              {routeConfig?.title}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
