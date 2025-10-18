import mongoose, { Schema, InferSchemaType, Model, mongo } from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = new Schema(
    {
        username: {
            type: String,
            minLength: [5, 'username needs to be longer'],
            maxLength: [20, 'username is too long'],
            unique: true,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Password must be at least 8 character long'],
        },
    },
    { timestamps: true },
);

userModel.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next(); not needed for async function
});

type UserType = InferSchemaType<typeof userModel>;

export const User: Model<UserType> =
    mongoose.models.User || mongoose.model<UserType>('user', userModel);
