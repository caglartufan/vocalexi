import { Button } from '@/components/ui/buttons/button';
import ReactCountryFlag from 'react-country-flag';
import { ArrowRightLeftIcon } from 'lucide-react';

export default function SwitchLanguageButton() {
  return (
    <Button variant="ghost">
      <div className="flex items-center gap-x-1.5">
        <ReactCountryFlag
          countryCode="us"
          className="rounded-full aspect-4/3 size-5! object-cover"
          svg
        />
        <span>English</span>
      </div>
      <ArrowRightLeftIcon className="size-4" />
      <div className="flex items-center gap-x-1.5">
        <ReactCountryFlag
          countryCode="tr"
          className="rounded-full aspect-4/3 size-5! object-cover"
          svg
        />
        <span>Türkçe</span>
      </div>
    </Button>
  );
}
