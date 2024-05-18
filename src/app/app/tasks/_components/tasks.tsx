'use client'


import { DataTable } from "./data-table"
import { useState } from "react"
import TaskCard from "./TaskCard";
import { Task } from "@/types/Task";


export default function Tasks(tasks: Task | any){

    const [currentTask, setCurrentTask] = useState<Task | null>(null)
    const onEdit = (task: Task | null) => {
        setCurrentTask(task)
        if(task && task?._id){
            document.getElementById('cardTask')?.click();
        }
    }; 

    return (
        <div className="space-y-5">
            <TaskCard task={currentTask} onEdit={onEdit} />
            <DataTable data={tasks} onEdit={onEdit} />
        </div>
      )
}