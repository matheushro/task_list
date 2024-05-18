import { Button } from "@/components/ui/button"
import { ButtonLoading } from "./button-loading"
import { cn } from "@/lib/utils"
 
export function ButtonSubmit({isLoading, text, className, ...props}: {className?: string,isLoading: boolean, text: string, [key: string]: any}) {

    if(isLoading) return (
        <ButtonLoading
            className={className} 
        />
    )
    return (
        <Button 
            {...props} 
            className={className} 
          type="submit"
        >
            {text}
        </Button>
    )
}