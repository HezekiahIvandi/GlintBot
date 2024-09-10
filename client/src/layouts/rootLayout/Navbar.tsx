import { Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <header className="flex justify-between px-[4rem] py-[1.5rem] bg-primary-foreground items-center">
      <Link to="/">
        <h1 className="text-accent-foreground text-[1.3em]">GlintBot</h1>
      </Link>
      <div className="flex gap-[20px] justify-between ">
        <ModeToggle />
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
