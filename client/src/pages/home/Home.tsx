import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-red-700">Home</h1>
      <Link to="/dashboard">Dashboard</Link>
      <Button variant={"default"}>Get Started</Button>
    </div>
  );
};

export default Home;
