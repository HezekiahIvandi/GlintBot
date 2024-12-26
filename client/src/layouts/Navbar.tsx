import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


const Navbar = () => {
  const {user, isLoading, logout}  = useAuth();

  const handleLogout = async ()=>{
    const isLogoutSuccessful = await logout();
    if(isLogoutSuccessful){
      toast.success("Logout successful!", {position: "bottom-right"})
    }
  }
  return (
    <header className="h-[80px] flex justify-between px-[3rem] py-[1rem] bg-primary-foreground items-center">
      <Link to="/">
        <h1 className="text-accent-foreground text-[1.3em]">GlintBot</h1>
      </Link>
      <div className="flex gap-[20px] justify-between ">
        <ModeToggle />
        <div className="flex items-center">
            {/* if not signedin show signin button */}
            { user? 
             <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading? "Logging out..." : "Log out"}
          </Button> : 
          <Button variant={"default"}>
          <Link to="/sign-in">Sign In </Link>
        </Button>
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
