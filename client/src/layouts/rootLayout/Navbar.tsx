import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <header className="h-[80px] flex justify-between px-[3rem] py-[1rem] bg-primary-foreground items-center">
      <Link to="/">
        <h1 className="text-accent-foreground text-[1.3em]">GlintBot</h1>
      </Link>
      <div className="flex gap-[20px] justify-between ">
        <ModeToggle />
        <div className="flex items-center">
            {/* if not signedin show signin button */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
