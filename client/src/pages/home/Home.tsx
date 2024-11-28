import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
//test
const req = async function(){
 //just a test
  try{
    const response = await fetch('http://localhost:3000/get/currentUserToken', {
      method: "GET",
      credentials: "include"
    })

    const data = await response.json();

    if(!response.ok){
      console.log("failed")
    };

    console.log(data);
  }catch(e){
    console.error(e);
    
  }
}

const Home = () => {
  const {logout} = useAuth();
  return (
    <div className="flex px-[4rem] justify-center mt-[4rem]">
      <div className="flex justify-center w-fit gap-[1rem]">
        <div className="w-[400px]">
          <h1 className="text-secondary-foreground text-[1.3em]">GlintBot</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
            quaerat accusantium nesciunt sed saepe fuga, quae porro perspiciatis
            dignissimos pariatur cumque hic ipsam omnis deleniti dolor aut ipsa
            fugiat!
          </p>
        </div>
        <div>
          <Button variant={"default"}>
            <Link to="/dashboard">Get started </Link>
          </Button>
          <Button onClick={req}>
            Req cookies token
          </Button>
          <Button onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
