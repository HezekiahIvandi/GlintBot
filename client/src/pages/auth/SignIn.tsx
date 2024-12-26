import {useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useAuth} from "@/providers/AuthProvider";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignInPage = ()=> {
  const {login, errorMsg, successMsg, isLoading, clearMsg} = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    const isLoginSuccess = await login(email, password);
    if(isLoginSuccess){
        setPassword("")
        setEmail("")
        navigate("/")
        toast.success("Sign in successful!",{position: "bottom-right"})
    }
  }

  //Clear errorMsg and successMsg 
  useEffect(()=>{
    console.log("Run: Cleared msg in sign in page");
    clearMsg()
  }, []);

  return (
    <Card className="w-full max-w-sm mx-auto mt-[2%]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          {
          errorMsg? (
            <div className=" text-[#ff0000] px-2 py-1 text-center relative">
              {errorMsg}
            </div>
          ):
          (successMsg? (
            <div className=" text-[#2afe2a] px-2 py-1 text-center relative">
              {successMsg}
            </div>
          )
            : <CardDescription className="text-center">Enter your email and password to sign in</CardDescription>)
        }
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">{isLoading? "Logging-in...": "Sign in"}</Button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignInPage;
