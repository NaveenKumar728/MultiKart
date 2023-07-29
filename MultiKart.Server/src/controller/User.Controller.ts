import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/User.Model";
import { IUser } from "../interfaces/Interfaces";
import { Role } from "../models/Role.Model";


export const createUser = async (req:Request, res: Response) => {
    const {email, fullname, password} = req.body;
    try {
        /* This code is checking if a user with the given email already exists in the database. */
        const user = await User.findOne({email:email});
        if(user) return res.status(409).send({OK:false, msg:'user exists'})

        /* The code `const genSalt = await bcrypt.genSalt(10)` generates a salt, which is a random
        string of characters used to add complexity to the password hashing process. The number `10`
        passed as an argument represents the number of rounds of hashing to be performed. */
        const genSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, genSalt)

        const roleId = await Role.findOne({name:'user'}, '_id')

        /* The code `const newUser = await User.create({fullname, email, password: passwordHash});` is
        creating a new user in the database with the provided `fullname`, `email`, and
        `passwordHash` (which is the hashed password). The `User.create()` method is a function
        provided by the Mongoose library that creates a new document in the specified collection (in
        this case, the "User" collection). */
        const newUser = await User.create({fullname, email, password: passwordHash, role: roleId});
        res.status(201).json({newUser, OK: true, msg:'user created'})
    } catch (error) {
        res.json(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).populate('role');
        if(!user) return res.status(404).send({success: false, msg: 'User with the id not found'});

        res.status(200).send({user, success: true})
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        /* The code `const Users: IUser[] = await User.find().select('-password').populate('role');` is
        retrieving all users from the database and populating the `role` field of each user
        document. */
        const Users: IUser[] = await User.find().select('-password').populate('role');
        res.status(200).json(Users);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const u = req.body
    try {
        const user = await User.findById(id);
        if(!user) return res.status(404).send({success: false, msg: 'User with the id not found'});

        const roleId = await Role.findOne({name: u.role},'_id')

        const update = await User.findByIdAndUpdate({_id: id}, {fullname: u.fullname, role: roleId, isBlocked: u.isBlocked}, {new: true})
        res.status(200).send({update})
    } catch (error) {
        console.log(error) 
    }
}