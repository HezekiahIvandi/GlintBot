import { Link, Outlet } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header className="flex justify-between px-[4rem] py-[2rem] bg-[grey]">
        <Link to="/">
          <h1>GlintBot</h1>
        </Link>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
