import mongoose, { InferSchemaType } from "mongoose";
import { Schema } from "mongoose";
import { addressSchema } from "./Address.Model";
import { IUser } from "../interfaces/Interfaces";
import { Role } from "./Role.Model";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Enter an valid email."], // email validation regex
    required: [true, "Email required"], // Removed the additional array from the required field
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
  },
  address: [addressSchema],
  emailVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


export const User = mongoose.model<IUser>('Users', userSchema);