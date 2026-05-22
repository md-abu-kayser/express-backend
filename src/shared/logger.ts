import winston from "winston";
import { env } from "@/config/env";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => (env.NODE_ENV === "development" ? "debug" : "info");

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports: [new winston.transports.Console()],
});
