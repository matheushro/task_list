
import { GetTasks } from "@/actions/GetTasks"
import Tasks from "./_components/tasks"


async function getData(){
  return GetTasks()
}


export default async function task() {
  const {tasks} = await getData()


  return (
    <Tasks tasks={tasks} />
  )
}
