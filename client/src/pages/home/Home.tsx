import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const {user} = useAuth();
  return (
    <div className="flex px-[4rem] justify-center mt-[4rem]">
      <div className="flex justify-center w-fit gap-[1rem]">
        <div className="w-[400px]">
          <h1 className="text-secondary-foreground text-[1.3em]">GlintBot</h1>
          <p>
            Meet Glintbot, your AI astronomy expert. 
            From planets to distant galaxies, get instant, accurate answers to all your cosmic questions, 
            whether you're a curious beginner or experienced stargazer.
          </p>
        </div>
        <div>
          <Button variant={"default"}>
            <Link to="/dashboard">
            {user? "Dashboard" : "Get started"}
            </Link>
          </Button>

          
        </div>
      </div>
    </div>
  );
};

export default Home;
