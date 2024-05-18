'use client'


import { DataTable } from "./data-table"
import { useState } from "react"
import TaskCard from "./TaskCard";


export default function Tasks({tasks}: any){

    const [currentTask, setCurrentTask] = useState(null)
    const onEdit = (todo: any | null) => {
        setCurrentTask(todo)
        if(todo && todo?._id){
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