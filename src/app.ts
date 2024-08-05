import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morganMiddleware from "./middleware/morgan";
import { errorHandler } from "./error/ErrorHandler";
import { AppError, HttpCode } from "./error/AppError";
// No type defintions available for package 'xss-clean'
// @ts-ignore
import xss from "xss-clean";
import cors from "cors";
import "dotenv/config";
const app: Express = express();
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morganMiddleware);
app.use(mongoSanitize());
app.use(xss());
const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Pls Too many requests from this IP,please try again in an hour!",
});
app.use("/api", apiLimiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],

      fontSrc: ["'self'", "https:", "data:"],

      scriptSrc: ["'self'", "https://*.cloudflare.com"],

      scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],

      styleSrc: ["'self'", "https:", "unsafe-inline"],

      connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
    },
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  throw new AppError({
    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    message: "Error Occured in the application",
    isOperational: false,
  });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});
export default app;
