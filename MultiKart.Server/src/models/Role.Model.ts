import mongoose from "mongoose";
import { Schema } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export const Role = mongoose.model('Roles', roleSchema);