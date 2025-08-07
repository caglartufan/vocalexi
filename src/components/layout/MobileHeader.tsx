import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, LanguagesIcon, MenuIcon } from 'lucide-react';

export default function MobileHeader() {
  return (
    <div className="flex items-end  px-7 pb-4 h-[105px] rounded-b-4xl bg-primary text-white shadow-md">
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
            <span className="leading-none text-xs font-semibold">Language</span>
            <ChevronDownIcon size={14} />
          </Button>
          <Button className="bg-tertiary rounded-sm size-6" size="icon">
            <MenuIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
