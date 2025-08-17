'use client';
import WeeklyProgress from '@/components/blocks/weekly-progress';
import WordSearch from '@/components/blocks/word-search';

export default function HomePage() {
  return (
    <>
      <WeeklyProgress />
      <WordSearch />
    </>
  );

  // const { data: session } = useSession();
  // if (typeof session?.user !== 'undefined') {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <Button onClick={() => signIn()}>Sign in</Button>
  //     or
  //     <Button asChild>
  //       <Link href="/auth/sign-up">Sign up</Link>
  //     </Button>
  //   </>
  // );
}
