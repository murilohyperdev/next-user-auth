"use client";

import { Button } from "@/app/ui/button";
import { authenticate } from "@/app/lib/actions";
import { useRouter } from 'next/navigation'



export default function LoginForm() {

  const router = useRouter()

  const handleSubmit = async (event :any) => {
    event.preventDefault()
    
    try {
      const formData = new FormData(event.currentTarget)
      const response = await authenticate(undefined, formData)

      if (!!response.error) {
        throw new Error('falid login')
      } else {
        router.push('/dashboard');
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="email">Login</label>
      <input type="text" name="email" id="email" />
      <br />
      <label htmlFor="password">Password</label>
      <input 
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      type="password" name="password" id="password" />
      <br />
      <Button type="submit" className="mt-4 w-full">
        Log in
      </Button>
    </form>
  );
}
