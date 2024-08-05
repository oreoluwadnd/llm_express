import { Response } from "express";
import { HttpCode, AppError } from "./AppError";
import Logger from "../logger/logger";
import { exitHandler } from "../server/serverExit";

class ErrorHandler {
  public handleError(error: Error, res?: Response): void {
    if (this.trustedError(error) && res) {
      this.handleTrustedError(error as AppError, res);
    } else {
      this.handleCriticalError(error, res);
    }
  }
  private trustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private sendDevError(error: AppError, res: Response): void {
    Logger.error("ERROR", error);
    res.status(error.httpCode).json({
      status: error.status,
      statusCode: error.httpCode,
      message: error.message,
      stack: error.stack,
    });
  }

  private sendProductionError(error: AppError, res: Response): void {
    Logger.error("ERROR", error);
    if (error.isOperational) {
      res.status(error.httpCode).json({
        status: error.status,
        message: error.message,
      });
    }
  }

  private handleTrustedError(error: AppError, res: Response): void {
    Logger.error("ERROR", error);
    res.status(error.httpCode).json({
      status: error.status,
      statusCode: error.httpCode,
      message: error.message,
      stack: error.stack,
    });
  }
  private handleCriticalError(error: Error, res?: Response): void {
    if (res) {
      Logger.info("💥 Application encountered an unknown error.");
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: "Error",
        message: error.message,
        stack: error.stack,
      });

      Logger.info("💥 Application encountered an unknown error.");
      Logger.error("ERROR", error);
      exitHandler.handleExit(1);
    }
  }
}

export const errorHandler = new ErrorHandler();
