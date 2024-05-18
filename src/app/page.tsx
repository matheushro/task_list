import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from '@/services/auth';


export default function Home() {
  return (
    <div className="container h-screen flex items-center justify-center align-middle">
      <Card className="flex flex-col w-96">
        <CardHeader className='text-center'>
          <CardTitle>Realize login</CardTitle>
          <CardDescription>Escolha a forma de login</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow grid gap-4">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <Button className='w-full' type="submit">Login com Google</Button>
          </form>
        </CardContent>
        {/* <CardFooter className="mt-auto">
          <Button className="w-full">Selecione o destaque </Button>
        </CardFooter> */}
      </Card>
    </div>

    
  )
}
