"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ButtonSubmit } from "@/components/ui/button-submit"
import { useState, useEffect } from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import { useRouter } from "next/navigation"
import { CreateNewTask, UpdateTask } from "../actions"
import { Task } from "@/types/Task"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must have at least 2 characters",
    }).max(50, {
        message: "Name must have at most 50 characters",
    }),
    description: z.string().min(2, {
        message: "Description must have at least 2 characters.",
    }).max(255, {
        message: "Description must have at most 255 characters.",
    }),
    expectedDelivery: z.string().max(50, {
        message: "Previsão de entrega deve ter no máximo 50 caractéres.",
    }),
    priority: z.string().default("Urgent"),
    value: z.string().max(50, {
        message: "Value must have at most 50 characters.",
    }),
    payDate: z.string().max(50, {
        message: "Pay date must have at most 50 characters.",
    }),
    status: z.string().default("Backlog")
})

export default function TaskCard({ task, onEdit }: { task: Task | null, onEdit: (task: Task | null) => void }) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: task?.name || "",
            description: task?.description || "",
            expectedDelivery: task?.expectedDelivery || "",
            priority: task?.priority || "Low",
            value: task?.value || "",
            payDate: task?.payDate || "",
            status: task?.status || "Backlog",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        setIsLoading(true)

        try {
            if (task) {
                await UpdateTask(task._id, values);
                toast({
                    title: "Task updated succesfuly",
                })
            } else {
                await CreateNewTask(values);
                toast({
                    title: "Task created succesfuly",
                })
            }
            form.reset();
            router.refresh()
        } catch (error: any) {
            toast({
                title: "An error occurred",
                description: error.message,
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (task) {
            form.reset({
                name: task.name,
                description: task.description,
                expectedDelivery: task.expectedDelivery,
                priority: task.priority,
                value: task.value,
                payDate: task.payDate,
                status: task.status,
            });
        } else {
            form.reset({
                name: "",
                description: "",
                expectedDelivery: "",
                priority: "Low",
                value: "",
                payDate: "",
                status: "Backlog",
            });
        }
    }, [task, form]);

    useEffect(() => {
        if (!open) {
            onEdit(null);
            
        }
    }, [open, onEdit]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button id='cardTask'>{task ? "Edit task" : "Create new task"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task ? "Edit task" : "Create new task"}</DialogTitle>
                    <DialogDescription>
                        {task ? "Update the task information." : "Enter the task information."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col gap-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Name*</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} className="w-full" placeholder="Input task name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Description*</FormLabel>
                                            <FormControl>
                                                <Textarea disabled={isLoading} placeholder="Task description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-row gap-5">
                                    <FormField
                                        control={form.control}
                                        name="expectedDelivery"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Expected delivery</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} className="w-full" type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Priority</FormLabel>
                                                <FormControl>
                                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Priority" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Urgent">Urgent</SelectItem>
                                                            <SelectItem value="High">High</SelectItem>
                                                            <SelectItem value="Medium">Medium</SelectItem>
                                                            <SelectItem value="Low">Low</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                </div>
                                
                                <div className="flex flex-row gap-5">
                                    <FormField
                                        control={form.control}
                                        name="value"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} placeholder="R$ 1000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payDate"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Pay Date</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Backlog">Backlog</SelectItem>
                                                        <SelectItem value="In-progress">In-progress</SelectItem>
                                                        <SelectItem value="Review">Review</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                            <ButtonSubmit text={task ? "Update" : "Create"} isLoading={isLoading} />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
