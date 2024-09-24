import {SignInButton} from "@clerk/nextjs"

export default async function Home() {


  return (
    <main className="">
      <div className="">
        <SignInButton />
      </div>
    </main>
  );
}
