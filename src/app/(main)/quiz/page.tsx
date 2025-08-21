'use client';
import SwitchLanguageButton from '@/components/ui/buttons/switch-language-button';
import { Button } from '@/components/ui/buttons/button';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import QuizAnswerButton from '@/components/ui/buttons/quiz-answer-button';
import { useNav } from '@/context/nav-context';
import { useEffect } from 'react';

export default function Page() {
  const { setRouteConfig } = useNav();

  useEffect(() => {
    setRouteConfig({
      title: 'Quiz',
      className: 'bg-amber-300',
    });

    return () => {
      setRouteConfig(null);
    };
  }, [setRouteConfig]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SwitchLanguageButton />
      <div className="w-full">
        <div className="flex items-center justify-between w-full mb-3">
          <Button variant="link">
            <ChevronsLeftIcon />
            <span>Previous</span>
          </Button>
          <Button variant="link">
            <span>Next</span>
            <ChevronsRightIcon />
          </Button>
        </div>
        <h3 className="text-sm font-semibold mb-1">Question 1 of 10</h3>
        <p className="mb-8">
          What is the most appropriate synonym for the word magnificent?
        </p>
        <div className="flex flex-col gap-4">
          <QuizAnswerButton text="Ordinary" />
          <QuizAnswerButton text="Beautiful" variant="correct" />
          <QuizAnswerButton text="Boring" variant="incorrect" />
          <QuizAnswerButton text="Tiny" />
        </div>
        <div className="flex flex-col gap-y-2 text-error mt-8">
          <p>
            Sorry. That’s not the correct answer. The word cumbersome means
            unwieldy.
          </p>
          <p>
            “The shoes were big on my feet, and the felt very <b>cumbersome</b>
            .”
          </p>
        </div>
      </div>
    </div>
  );
}
