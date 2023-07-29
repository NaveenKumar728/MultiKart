import { InferSchemaType, Types } from "mongoose";

export interface IUser extends Document{
    id?: string;
    fullname?: string,
    email: string,
    role: Types.ObjectId,
    password: string;
    address: Types.DocumentArray<IAddress>,
    createdAt: Date,
    updatedAt: Date,
}

export interface IAddress {
    
}