import { httpTerminator, server } from "../server/server";
import Logger from "../logger/logger";

class ExitHandler {
  public async handleExit(code: number, timeout = 5000): Promise<void> {
    try {
      Logger.error(`🚒Attempting a graceful shutdown with code ${code}`);
      setTimeout(() => {
        Logger.error(`Forcing a shutdown with code ${code}🚒`);
        process.exit(code);
      }, timeout).unref();

      if (server.listening) {
        Logger.error("🔪 Terminating HTTP connections");
        await httpTerminator.terminate();
      }
      Logger.error(`🚪Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      Logger.error("Error shutting down gracefully");
      Logger.error(error);
      Logger.error(`Forcing exit with code ${code}`);
      process.exit(code);
    }
  }
}

export const exitHandler = new ExitHandler();
