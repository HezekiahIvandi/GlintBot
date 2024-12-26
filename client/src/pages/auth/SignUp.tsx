
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'


const SignUpPage = () => {
  const {register, errorMsg, successMsg, isLoading} = useAuth();
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle account registering logic here
    const isRegisterSuccess = await register(name, email, password);
    if(isRegisterSuccess){
      setName("");
      setEmail("");
      setPassword("");
      navigate("/sign-in");
      toast.success("Registration successful! Please sign in",{position: "bottom-right"})
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
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
            : <CardDescription className="text-center">Create an account to get started</CardDescription>)
        }
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <Button type="submit" className="w-full">{isLoading? "Registering..." : "Sign Up"}</Button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/sign-in" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignUpPage;
