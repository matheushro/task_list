export type Task = {
    _id: string
    value?: string
    priority: string
    description: string
    name: string
    expectedDelivery: string
    payDate: string
    deliveryDate: string
    status: "pending" | "processing" | "success" | "failed"
}