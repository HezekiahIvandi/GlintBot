import { Link, Outlet } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <Link to="/">
          <h1>Navbar</h1>
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
