import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignInPage = ()=> {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string|null>(null);
  const [successMessage, setSuccessMessage] = useState<string|null>(null)
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    try{

      const response = await fetch("http://localhost:3000/api/v1/signin", {
        credentials: 'include',
        method: "POST",
        headers:{
          "Content-type": "Application/json"
        },
        body: JSON.stringify({
          email, password
        }),
      });

      const data = await response.json()

      if(!response.ok){
        setError(data.error || "Sign-in went wrong!");
        return
      }

      //handle successful signin
      setError(null)
      setSuccessMessage('Signup successful!');
      console.log(data);

      //clear form
      setPassword("")
      setEmail("")

      //redirect
      // setTimeout(() => {
      //   navigate('/dashboard');
      // }, 5000);

    }catch(e){
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
      console.error(e)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto mt-[2%]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          {
          error? (
            <div className=" text-[#ff0000] px-2 py-1 text-center relative">
              {error}
            </div>
          ):
          (successMessage? (
            <div className=" text-[#2afe2a] px-2 py-1 text-center relative">
              {successMessage}
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
          <Button type="submit" className="w-full">Sign In</Button>
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
