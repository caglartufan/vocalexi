import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons/button';
import { Volume2Icon } from 'lucide-react';
import SwitchLanguageButton from '@/components/ui/buttons/switch-language-button';

export default function WordDetailsFull({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div className="flex flex-col gap-y-3">
      <SwitchLanguageButton />
      <div className={cn('flex flex-col', className)}>
        <div className="flex items-center gap-x-3">
          <Button className="size-7 rounded-full" size="icon">
            <Volume2Icon />
          </Button>
          <div>
            <h3 className="text-xl font-semibold">cumbersome</h3>
            <h4 className="text-sm mb-1 font-light">/ˈkəmbərsəm/</h4>
          </div>
        </div>
        <ol className="list-decimal list-inside flex flex-col gap-y-2">
          <li>
            large or heavy and therefore difficult to carry or use; unwieldy.
          </li>
          <li>slow or complicated and therefore inefficient</li>
        </ol>
        <div className="mt-4">
          <h5 className="text-lg font-semibold mb-1">Used in sentences:</h5>
          <ol className="list-decimal list-inside flex flex-col gap-y-2">
            <li>
              &#34;The shoes were too big on my feet, and they felt very{' '}
              <b>cumbersome.</b>&#34;
            </li>
            <li>
              &#34;Carrying the heavy box down the stairs was very{' '}
              <b>cumbersome</b>.&#34;
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
