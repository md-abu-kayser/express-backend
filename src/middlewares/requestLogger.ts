import { Request, Response, NextFunction } from "express";
import { logger } from "@/shared/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });
  next();
};
