import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, ListIcon, Volume2Icon } from 'lucide-react';

export default function WordDetails({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn(
        'flex justify-between gap-x-3 text-xs font-semibold',
        className,
      )}
    >
      <div>
        <Button className="size-7 rounded-full" size="icon">
          <Volume2Icon />
        </Button>
      </div>
      <div className="flex flex-col w-60">
        <h3 className="text-lg">cumbersome</h3>
        <h4 className="text-xs mb-1">/ˈkəmbərsəm/</h4>
        <ol className="list-decimal list-inside flex flex-col gap-y-2">
          <li>
            large or heavy and therefore difficult to carry or use; unwieldy.
          </li>
          <li>slow or complicated and therefore inefficient</li>
        </ol>
        <hr className="my-3 mx-1" />
        <div>
          <h5 className="text-sm mb-1">Used in sentences</h5>
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
      <div className="flex flex-col items-center gap-y-3">
        <Button className="size-6" size="icon" variant="ghost">
          <BookmarkIcon className="size-5 fill-primary stroke-primary" />
        </Button>
        <Button className="size-6 rounded-sm" size="icon">
          <ListIcon />
        </Button>
      </div>
    </div>
  );
}
