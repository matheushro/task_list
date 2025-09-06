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

    return {
        ...task.toObject(),
        _id: task._id.toString()
    };
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

    // Converter ObjectIds para strings mantendo a estrutura
    return tasks.map(task => ({
        ...task.toObject(),
        _id: task._id.toString()
    }))
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

export async function UpdateMultipleTasksStatus(taskIds: string[], newStatus: string) {

    const session = await auth()
    if (!session?.user?.id) {
        return {
          error: 'Not authorized',
          data: null,
        }
    }
    
    await connectMongoDB();
    
    // Verificar se todas as tarefas pertencem ao usuário usando strings diretamente
    const userTasks = await Task.find({ 
        _id: { $in: taskIds }, 
        id_user: session.user.id 
    });
    
    if (userTasks.length !== taskIds.length) {
        return {
            error: 'Some tasks do not belong to the user',
            data: null,
        }
    }
    
    // Atualizar todas as tarefas usando strings diretamente
    const result = await Task.updateMany(
        { _id: { $in: taskIds } },
        { $set: { status: newStatus } }
    );
    
    return {
        success: true,
        modifiedCount: result.modifiedCount,
        data: result
    };
}