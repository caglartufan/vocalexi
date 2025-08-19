import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/buttons/button';
import { Badge } from '@/components/ui/badge';
import WordDetails from '@/components/blocks/word-details';
import { SearchIcon } from 'lucide-react';

export default function WordSearch() {
  return (
    <section className="flex flex-col items-center gap-y-2.5">
      <Input
        type="text"
        placeholder="Search word..."
        containerClassName="w-64"
        rightElementContainerClassName="right-1.5"
        rightElement={
          <Button
            className="size-7 bg-linear-to-b from-primary to-[#D470FF] rounded-full"
            size="icon"
          >
            <SearchIcon className="size-[15px]" width={16} height={16} />
          </Button>
        }
      />
      <span className="text-sm font-semibold">Previously searched words</span>
      <div className="flex gap-2 mb-8">
        <Badge variant="default" asChild>
          <Button variant="ghost" className="text-sm size-auto">
            cumbersome
          </Button>
        </Badge>
        <Badge variant="muted" asChild>
          <Button variant="ghost" className="text-sm size-auto">
            pompous
          </Button>
        </Badge>
        <Badge variant="muted" asChild>
          <Button variant="ghost" className="text-sm size-auto">
            magnificent
          </Button>
        </Badge>
      </div>
      <WordDetails />
    </section>
  );
}
