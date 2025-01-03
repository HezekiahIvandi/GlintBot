import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";



const Home = () => {
  const {user, fetchWithTokenRefresh} = useAuth();

  const getuser = async()=>{
    try{
      const res = await fetchWithTokenRefresh("http://localhost:3000/get/currentUserToken", {
        method: "GET",
      });
      const data = await res.json();
      if(!res.ok) return console.log(data.error);
      console.log("GET BUTTON RESPONSE: ", data);
    }catch(e){
      console.error(e); 
    }
  }
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
          

          <div className="mt-[2rem]">
            <Button onClick={getuser}>
              Get user
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
