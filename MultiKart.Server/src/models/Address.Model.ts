import mongoose from "mongoose";
import { Schema } from "mongoose";

export const addressSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        maxlength: 256,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        minlength: 6,
        required: true
    }
}, { timestamps: true })

export const Address = mongoose.model('Address', addressSchema);