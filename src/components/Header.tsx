import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./Logo";
import { checkUser } from "@/lib/checkUser";


const Header = async () => {

  const user = await checkUser()

  return (
    <nav className="flex h-20 items-center justify-between border-b shadow-b-md px-10">
      <Link href="/">
      <Logo />
      </Link>
      <div className="flex items-center gap-3">
            
          <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
          </SignedOut>
          <SignedIn>
          <Link href="/create-recipe">Create Recipe</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
            <UserButton />
          </SignedIn>
        
      </div>
    </nav>
  );
};

export default Header;
