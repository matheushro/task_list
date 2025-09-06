

import { Task } from "@/types/Task"
import Tasks from "./_components/tasks"
import { GetTasks } from "./actions"


export default async function task() {
  const response = await GetTasks()
  
  if ('error' in response) {
    return <div>Error loading tasks</div>
  }

  return (
    <Tasks tasks={response} />
  )
}
