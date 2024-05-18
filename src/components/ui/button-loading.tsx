import { Loader2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
 
export function ButtonLoading({className}: {className?: string}) {
  return (
    <Button 
      disabled 
      className={className} 
    >
      <Loader2 className="mx-2 h-4 w-4 animate-spin" />
    </Button>
  )
}