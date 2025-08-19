import { ArrowRightLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/buttons/button';

export default function HeaderToolbar() {
  return (
    <div className="flex items-center justify-between">
      <Button>
        <Image
          src="https://flagcdn.com/20x15/gb.png"
          alt="English"
          width={20}
          height={15}
        />
        <ArrowRightLeft size={16} />
        <Image
          src="https://flagcdn.com/20x15/tr.png"
          alt="Turkish"
          width={20}
          height={15}
        />
      </Button>
      <Button variant="ghost" size="icon" className="size-9">
        <Search />
      </Button>
    </div>
  );
}
