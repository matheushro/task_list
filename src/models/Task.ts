import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'O nome é obrigatório'],
            minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
            maxlength: [50, 'O nome deve ter no máximo 50 caracteres'],
        },
        description: {
            type: String,
            required: [true, 'A descrição é obrigatória'],
            minlength: [2, 'A descrição deve ter pelo menos 2 caracteres'],
            maxlength: [50, 'A descrição deve ter no máximo 50 caracteres'],
        },
        expectedDelivery: {
            type: String,
            maxlength: [50, 'A entrega esperada deve ter no máximo 50 caracteres'],
        },
        priority: {
            type: String,
            maxlength: [50, 'A prioridade deve ter no máximo 50 caracteres'],
        },
        value: {
            type: String,
            maxlength: [50, 'O valor deve ter no máximo 50 caracteres'],
        },
        payDate: {
            type: String,
            maxlength: [50, 'A data de pagamento deve ter no máximo 50 caracteres'],
        },

    },{
        timestamps: true
    }
)

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
