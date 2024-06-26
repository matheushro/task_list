'use server'
import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { auth } from '@/services/auth'


export async function CreateNewTask(values: any) {
    const session = await auth()
    if (!session?.user?.id) {
        return {
          error: 'Not authorized',
          data: null,
        }
      }

    const { name, description, expectedDelivery, priority, value, payDate, spentHours, project, status } = values;

    await connectMongoDB();

    const task = await Task.create({ id_user: session.user.id.toString(), status, name, description, expectedDelivery, priority, value, payDate, spentHours, project });

    return JSON.parse(JSON.stringify(task));
}

export async function GetTasks(){
    const session = await auth()
    if (!session?.user?.id) {
        return {
          error: 'Not authorized',
          data: null,
        }
    }

    await connectMongoDB();
    const tasks = await Task.find({ id_user: session?.user?.id });

    return JSON.parse(JSON.stringify(tasks))
}


export async function UpdateTask(id: string, values: any) {
    const session = await auth()
    if (!session?.user?.id) {
        return {
          error: 'Not authorized',
          data: null,
        }
    }
    
    const { name, description, expectedDelivery, priority, value, payDate, spentHours, project, status } = values;
    await connectMongoDB();

    await Task.findByIdAndUpdate(id, {status, name, description, expectedDelivery, priority, value, payDate, spentHours, project });

}

export async function DeleteTask(id: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return {
          error: 'Not authorized',
          data: null,
        }
    }
    
    
    await connectMongoDB();
    await Task.findByIdAndDelete(id);

}
