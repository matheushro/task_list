import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from '@/services/auth';
import { FaGoogle } from "react-icons/fa";


export default function Home() {
  return (
    <div className="container h-screen flex items-center justify-center align-middle">
      <Card className="flex flex-col w-96">
        <CardHeader className='text-center'>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose how to login</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow grid gap-4">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <Button variant={'outline'} className='w-full gap-5' type="submit">
              <FaGoogle size={20} />
              Login with Google Account
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="mt-auto">
          <Button className="w-full">Selecione o destaque </Button>
        </CardFooter> */}
      </Card>
    </div>

    
  )
}
