import { Request, Response, NextFunction } from 'express';

export function InternalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}
