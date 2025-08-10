import { NextFunction, Request, Response } from "express";
import { User } from '../models/user.models';
import { error } from "console";

async function createUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { superTokenId, email } = req.body;

        if (!email || !superTokenId) {
            const error = new Error('Email and UserId required');
            (error as any).status = 400;
            throw error;
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User with this email already exists');
            (error as any).status = 409;
            throw error;
        }

        const newUser = new User({ email, superTokenId });
        const savedUser = await newUser.save();
        res.status(201).json({ id: savedUser._id, email: savedUser.email, superTokenId: savedUser.superTokenId });
    } catch (error) {
        next(error);
        console.log("createUserHandler Error: ", error)
    }
};

export default createUserHandler;