import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/shared/logger";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn(`Operational error: ${err.message}`);
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Unexpected error
  logger.error("Unexpected error:", err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong. Please try again later.",
  });
};
