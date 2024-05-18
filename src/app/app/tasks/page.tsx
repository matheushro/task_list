

import Tasks from "./_components/tasks"
import { GetTasks } from "./actions"


export default async function task() {
  const tasks = await GetTasks()


  return (
    <Tasks tasks={tasks} />
  )
}
