import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons/button';
import { BookmarkIcon, PlusIcon, Volume2Icon } from 'lucide-react';
import { Word } from '@/types/types';
import reactStringReplace from 'react-string-replace';
import { useRef } from 'react';

export default function WordDetails({
  className,
  word,
}: Readonly<{ className?: string; word?: Word }>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudioHandler = async () => {
    if (typeof word === 'undefined' || word.audioURL === null) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(word.audioURL);
    }

    await audioRef.current.play();
  };

  if (!word) return null;

  return (
    <div className={cn('flex justify-between gap-x-3', className)}>
      <div>
        <Button
          className="size-7 rounded-full"
          size="icon"
          onClick={playAudioHandler}
          disabled={!word.audioURL}
        >
          <Volume2Icon />
        </Button>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl leading-snug font-semibold">{word.word}</h3>
        {(word.ipa !== null || word.romanization !== null) && (
          <h4 className="text-sm mb-1 font-light">
            {word.ipa || word.romanization}
          </h4>
        )}
        <ol className="list-decimal list-inside flex flex-col gap-y-2">
          {word.meanings.map((meaning, index) => (
            <li key={index}>{meaning}</li>
          ))}
        </ol>
        <hr className="my-3 mx-1" />
        <div>
          <h5 className="text-lg font-semibold mb-1">Used in sentences:</h5>
          <ol className="list-decimal list-inside flex flex-col gap-y-2">
            {word.examples[word.language].map((example, index) => (
              <li key={index}>
                &#34;
                {reactStringReplace(example, word.word, (match, matchIndex) => (
                  <b key={matchIndex}>{match}</b>
                ))}
                &#34;
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <Button className="size-6 rounded-sm" size="icon">
          <PlusIcon />
        </Button>
        <Button className="size-6" size="icon" variant="ghost">
          <BookmarkIcon className="size-5 fill-primary stroke-primary" />
        </Button>
      </div>
    </div>
  );
}
