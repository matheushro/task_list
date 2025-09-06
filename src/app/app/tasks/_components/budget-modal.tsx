"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Task } from "@/types/Task"
import { formatCurrencyToBR } from "@/lib/utils"
import { Copy, Download } from "lucide-react"

interface BudgetModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedTasks: Task[]
}

export default function BudgetModal({ 
    open, 
    onOpenChange, 
    selectedTasks 
}: BudgetModalProps) {

    console.log(selectedTasks)
    const [budgetText, setBudgetText] = useState<string>("")
    const { toast } = useToast()

    // Gerar texto do orçamento quando o modal abrir
    useEffect(() => {
        if (open && selectedTasks.length > 0) {
            generateBudgetText()
        }
    }, [open, selectedTasks])

    const generateBudgetText = () => {
        let budget = "Orçamento\n\n"
        let total = 0

        selectedTasks.forEach((task) => {
            const value = parseFloat(task.value || "0")
            if (value > 0) {
                budget += `- ${task.name} - ${formatCurrencyToBR(value)}\n`
                total += value
            }
        })

        budget += `\nTOTAL - ${formatCurrencyToBR(total)}`
        setBudgetText(budget)
    }

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(budgetText)
            toast({
                title: "Success",
                description: "Budget copied to clipboard!",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard",
                variant: "destructive"
            })
        }
    }

    const handleDownload = () => {
        const blob = new Blob([budgetText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `orcamento-${new Date().toISOString().split('T')[0]}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        toast({
            title: "Success",
            description: "Budget downloaded successfully!",
        })
    }

    const handleClose = () => {
        setBudgetText("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Budget Generator</DialogTitle>
                    <DialogDescription>
                        Generated budget for {selectedTasks.length} selected task(s)
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium">
                            Budget Text
                        </label>
                        <Textarea
                            id="budget"
                            value={budgetText}
                            onChange={(e) => setBudgetText(e.target.value)}
                            className="min-h-[300px] resize-none"
                            placeholder="Budget will be generated here..."
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-between">
                    <div className="flex gap-2">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleCopyToClipboard}
                            className="flex items-center gap-2"
                        >
                            <Copy className="h-4 w-4" />
                            Copy
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleDownload}
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </Button>
                    </div>
                    <Button 
                        type="button" 
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
