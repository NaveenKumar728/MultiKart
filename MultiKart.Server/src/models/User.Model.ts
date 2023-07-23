import mongoose from "mongoose";
import { Schema } from "mongoose";
import { addressSchema } from "./Address.Model";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/, //email validation regex
        required: [true, "Email is Required"]
    },
    passwordHash: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        default: 'user',
        ref: 'Role'
    },
    address: [addressSchema]
}, { timestamps: true })

export const User = mongoose.model('Users', userSchema);