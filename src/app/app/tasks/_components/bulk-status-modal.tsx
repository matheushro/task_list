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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { UpdateMultipleTasksStatus } from "../actions"

interface BulkStatusModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedTasks: string[]
    onSuccess: () => void
}

export default function BulkStatusModal({ 
    open, 
    onOpenChange, 
    selectedTasks, 
    onSuccess 
}: BulkStatusModalProps
) {
    const [newStatus, setNewStatus] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleConfirm = async () => {
        if (!newStatus) {
            toast({
                title: "Error",
                description: "Please select a status",
                variant: "destructive"
            })
            return
        }

        setIsLoading(true)

        try {
            const result = await UpdateMultipleTasksStatus(selectedTasks, newStatus)
            
            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Success",
                    description: `${result.modifiedCount} tasks updated successfully`,
                })
                onSuccess()
                onOpenChange(false)
                setNewStatus("")
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "An error occurred",
                variant: "destructive"
            })
        }
        
        setIsLoading(false)
    }

    const handleCancel = () => {
        setNewStatus("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Status for Multiple Tasks</DialogTitle>
                    <DialogDescription>
                        You are about to update the status of {selectedTasks.length} selected task(s). 
                        Choose the new status below.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="status" className="text-right">
                            New Status
                        </label>
                        <Select value={newStatus} onValueChange={setNewStatus} disabled={isLoading}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Backlog">Backlog</SelectItem>
                                <SelectItem value="In-progress">In-progress</SelectItem>
                                <SelectItem value="Review">Review</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handleConfirm}
                        disabled={isLoading || !newStatus}
                    >
                        {isLoading ? "Updating..." : `Update ${selectedTasks.length} Task(s)`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
