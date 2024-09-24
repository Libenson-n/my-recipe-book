import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";


const Header = async () => {
  

  return (
    <nav className="flex h-20 items-center justify-between border-b shadow-md px-10">
      <Link href="/">
      </Link>
      <div className="flex items-center gap-3">
            <Link href="/create-recipe">Create Recipe</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
          <SignInButton mode="modal"/>
        
      </div>
    </nav>
  );
};

export default Header;
