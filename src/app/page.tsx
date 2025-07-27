'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  if (typeof session?.user !== 'undefined') {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  // return (
  //   <div className="flex flex-col gap-y-4">
  //     <ListCard
  //       title="Default"
  //       wordCount={8}
  //       lastQuizAt="Son sınav: 2 saat önce"
  //     />
  //     <ListCard
  //       title="Animals"
  //       wordCount={23}
  //       lastQuizAt="Henüz sınav olunmadı"
  //     />
  //   </div>
  // );
}
