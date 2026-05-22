import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/shared/jwt';
import { StatusCodes } from 'http-status-codes';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};
