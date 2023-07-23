import { Request, Response } from "express";
import { User } from "../models/User.Model";
import { IUser } from "../interfaces/Interfaces";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Users: IUser[] = await User.find().select('-password').populate('role');

        res.json(Users);
    } catch (error) {
        console.log(error);
    }
}