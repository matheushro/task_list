import mongoose, { Schema } from 'mongoose';

const userScheema = new Schema(
    {
        email: {
            type: String,
            unique: [true, 'E-mail já existe'],
            required: [true, 'E-mail é obrigatório']
        },
        name: {
            type: String,
            required: [true, 'Nome é obrigatório']
        },
        image: {
            type: String,
        }
    },{
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model('User', userScheema);

export default User;
