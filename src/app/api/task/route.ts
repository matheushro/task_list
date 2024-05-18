
import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, description, expectedDelivery, priority, value, payDate } = await request.json();
    await connectMongoDB();

    await Task.create({ name, description, expectedDelivery, priority, value, payDate });

    return NextResponse.json(
        {
            message: 'Task adicionada com sucesso'
        },
        {
            status: 201
        }
    )

}

export async function GET(){
    await connectMongoDB();


    const tasks = await Task.find();

    return NextResponse.json({tasks})
}

