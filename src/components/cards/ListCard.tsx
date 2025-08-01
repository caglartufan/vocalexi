import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ListCard({
  title,
  wordCount,
  lastQuizAt,
}: Readonly<{
  title: string;
  wordCount: number;
  lastQuizAt: string;
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Button></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{wordCount} kelime içerir</p>
      </CardContent>
      <CardFooter>
        <p>{lastQuizAt}</p>
      </CardFooter>
    </Card>
  );
}
