import { NextFunction, Request, Response } from "express";
import { User } from '../models/user.models';
import SuperTokens from "supertokens-node";

async function getUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, superTokenId } = req.query;
        // console.log('get-user query -> email:', email, 'superTokenId:', superTokenId);
        if (!email && !superTokenId) {
            const error = new Error('Please provide either email or superTokenId as a query parameter');
            (error as any).status = 400;
            throw error;
        }

        let user;

        if (email) {
            user = await User.findOne({ email: email as string });
        } else if (superTokenId) {
            user = await User.findOne({ superTokenId: superTokenId as string });
        }

        // Auto-provision the user record if missing and superTokenId is provided
        if (!user && superTokenId) {
            const suUser = await SuperTokens.getUser(superTokenId as string);
            if (!suUser) {
                const error = new Error('User not found');
                (error as any).status = 404;
                throw error;
            }
            const coreEmail = (suUser as any).emails?.[0] ?? (suUser as any).email;
            const created = new User({ email: coreEmail, superTokenId });
            user = await created.save();
        }

        if (!user) {
            const error = new Error('User not found');
            (error as any).status = 404;
            throw error;
        }

        // Expose only safe fields
        res.json({ _id: (user as any)._id, email: (user as any).email, superTokenId: (user as any).superTokenId });
    } catch (error) {
        next(error);
        console.log("getUserHandler Error: ", error)
    }
};

export default getUserHandler;