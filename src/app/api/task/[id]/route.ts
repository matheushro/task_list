import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    const { id } = params;
    const { name, description, expectedDelivery, priority, value, payDate } = await request.json();
    await connectMongoDB();

    await Task.findByIdAndUpdate(id, { name, description, expectedDelivery, priority, value, payDate });

    return NextResponse.json(
        {
            message: 'Task atualizada com sucesso'
        },
        {
            status: 200
        }
    )

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {

    const { id } = params;
    await connectMongoDB();
    await Task.findByIdAndDelete(id);
    return NextResponse.json(
        {
            message: 'Task deletada com sucesso'
        },
        {
            status: 200
        }
    )
}