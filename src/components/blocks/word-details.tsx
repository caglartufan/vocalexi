import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons/button';
import { BookmarkIcon, ListIcon, PlusIcon, Volume2Icon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function WordDetails({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div className={cn('flex justify-between gap-x-3', className)}>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-7 rounded-full" size="icon">
              <Volume2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Listen to the pronunciation</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">cumbersome</h3>
        <h4 className="text-sm mb-1 font-light italic">/ˈkəmbərsəm/</h4>
        <ol className="list-decimal list-inside flex flex-col gap-y-2">
          <li>
            large or heavy and therefore difficult to carry or use; unwieldy.
          </li>
          <li>slow or complicated and therefore inefficient</li>
        </ol>
        <hr className="my-3 mx-1" />
        <div>
          <h5 className="mb-1">Used in sentences:</h5>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-6 rounded-sm" size="icon">
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to a list</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-6 rounded-sm" size="icon" asChild>
              <Link href="/quick-quiz">
                <ListIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Take a quick quiz</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-6" size="icon" variant="ghost">
              <BookmarkIcon className="size-5 fill-primary stroke-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bookmark the word</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
