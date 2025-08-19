import { cn } from '@/lib/utils';

function DailyProgressCircle({
  number,
  isAchieved,
}: Readonly<{ number: number; isAchieved: boolean }>) {
  return (
    <div className="flex flex-col items-center gap-y-0.5">
      <div
        className={cn(
          'flex items-center justify-center size-8 font-semibold text-primary text-lg rounded-full border border-primary',
          {
            'bg-primary text-white': isAchieved,
          },
        )}
      >
        {number}
      </div>
      <span className="text-primary text-xs font-bold">day</span>
    </div>
  );
}

export default function WeeklyProgress() {
  return (
    <section>
      <p className="text-sm font-semibold text-center mb-7">
        You are on a roll! Keep learning new words to gain knowledge!
      </p>
      <div>
        <p className="text-sm font-semibold text-muted-foreground text-center mb-1.5">
          Week 1
        </p>
        <div className="flex items-center justify-center gap-x-4">
          {Array.from({ length: 7 }, (_, i) => (
            <DailyProgressCircle key={i} number={i + 1} isAchieved={i < 6} />
          ))}
        </div>
      </div>
    </section>
  );
}
